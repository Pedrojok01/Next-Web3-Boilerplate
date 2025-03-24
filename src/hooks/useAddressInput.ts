import { useState, useEffect } from "react";

import { zeroAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsResolver } from "wagmi";

import { useDebounce } from "./useDebounce";

interface UseAddressInputResult {
  normalizedName: string | null;
  resolvedEthAddress: string | null;
  isResolvingInProgress: boolean;
  isValidInput: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isTyping: boolean;
  isValidEthAddress: (value: string) => boolean;
}

export function useAddressInput(address: string): UseAddressInputResult {
  const [isTyping, setIsTyping] = useState(true);
  const [normalizedName, setNormalizedName] = useState<string | null>(null);
  const [resolvedEthAddress, setResolvedEthAddress] = useState<string | null>(null);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debouncedAddress = useDebounce(address, 3000);

  const isValidEthAddress = (value: string): boolean =>
    value.startsWith("0x") && value.length === 42;

  // Reset typing state when address changes
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, [address]);

  // Handle address validation and normalization
  useEffect(() => {
    // Reset error state
    setHasError(false);
    setErrorMessage(null);

    if (!address || address.trim() === "") {
      // Clear states when input is empty
      setNormalizedName(null);
      setResolvedEthAddress(null);
      setIsValidInput(false);
      return;
    }

    if (isValidEthAddress(address)) {
      // Valid ETH address, store directly
      setNormalizedName(null);
      setResolvedEthAddress(address);
      setIsValidInput(true);
      return;
    }

    // Try to normalize as ENS name
    try {
      const normalized = normalize(address);
      setNormalizedName(normalized);
    } catch (error) {
      setNormalizedName(null);
      setResolvedEthAddress(null);
      setIsValidInput(false);
      setHasError(true);
      setErrorMessage("The ENS name contains unsupported characters.");
      console.error("Error normalizing ENS name:", error);
    }
  }, [address]);

  // ENS resolution
  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsResolver({
    name: normalizedName || undefined,
  });

  // Update the resolved address when ENS resolution completes
  useEffect(() => {
    if (!normalizedName) return;

    if (resolvedAddress && resolvedAddress !== zeroAddress) {
      setResolvedEthAddress(resolvedAddress);
      setIsValidInput(true);
      setHasError(false);
    } else if (isError || resolvedAddress === zeroAddress) {
      setResolvedEthAddress(null);
      setIsValidInput(false);

      // Only show error if user has stopped typing and there's a value
      if (debouncedAddress && !isTyping) {
        setHasError(true);
        setErrorMessage(error?.message ?? "This ENS name could not be resolved.");
      }
    }
  }, [resolvedAddress, isError, normalizedName, error, debouncedAddress, isTyping]);

  return {
    normalizedName,
    resolvedEthAddress,
    isResolvingInProgress,
    isValidInput,
    hasError,
    errorMessage,
    isTyping,
    isValidEthAddress,
  };
}
