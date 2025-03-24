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
  const [isTyping, setIsTyping] = useState(false);
  const [normalizedName, setNormalizedName] = useState<string | null>(null);
  const [resolvedEthAddress, setResolvedEthAddress] = useState<string | null>(null);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debouncedAddress = useDebounce(address, 3000);

  const isValidEthAddress = (value: string) => value.startsWith("0x") && value.length === 42;

  // Reset typing state when debounced value changes
  useEffect(() => {
    setIsTyping(false);
  }, [debouncedAddress]);

  // Safely normalize the ENS name
  useEffect(() => {
    try {
      // Reset error state when input changes
      setHasError(false);
      setErrorMessage(null);

      if (address && !isValidEthAddress(address)) {
        const normalized = normalize(address);
        setNormalizedName(normalized);
      } else {
        setNormalizedName(null);
        // If it's a valid ETH address, store it directly
        if (isValidEthAddress(address)) {
          setResolvedEthAddress(address);
          setIsValidInput(true);
        } else if (!address || address.trim() === "") {
          // Clear the resolved address when input is empty
          setResolvedEthAddress(null);
          setIsValidInput(false);
        }
      }
    } catch (error) {
      // If normalization fails, set to null
      setNormalizedName(null);
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
    if (resolvedAddress && resolvedAddress !== zeroAddress) {
      setResolvedEthAddress(resolvedAddress);
      setIsValidInput(true);
      setHasError(false);
    } else if (normalizedName && (isError || resolvedAddress === zeroAddress)) {
      setResolvedEthAddress(null);
      setIsValidInput(false);
      if (debouncedAddress && debouncedAddress.trim() !== "" && !isTyping) {
        setHasError(true);
        setErrorMessage(error?.message ?? "This ENS name could not be resolved.");
      }
    }
  }, [resolvedAddress, isError, normalizedName, error?.message, debouncedAddress, isTyping]);

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
