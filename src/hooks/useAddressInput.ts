import { useMemo } from "react";

import { zeroAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress } from "wagmi";

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

const isValidEthAddress = (value: string): boolean => value.startsWith("0x") && value.length === 42;

export function useAddressInput(address: string): UseAddressInputResult {
  const debouncedAddress = useDebounce(address, 3000);
  const isTyping = address !== debouncedAddress;

  // Validate and normalize the address
  const validation = useMemo(() => {
    if (!address || address.trim() === "") {
      return { normalizedName: null, directAddress: null, validationError: null };
    }

    if (isValidEthAddress(address)) {
      return { normalizedName: null, directAddress: address, validationError: null };
    }

    try {
      const normalized = normalize(address);
      return { normalizedName: normalized, directAddress: null, validationError: null };
    } catch (err) {
      console.error("Error normalizing ENS name:", err);
      return {
        normalizedName: null,
        directAddress: null,
        validationError: "The ENS name contains unsupported characters.",
      };
    }
  }, [address]);

  const { normalizedName, directAddress, validationError } = validation;

  // ENS resolution
  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsAddress({
    name: normalizedName || undefined,
  });

  // Derive final results from ENS resolution + validation
  const result = useMemo(() => {
    if (directAddress) {
      return {
        resolvedEthAddress: directAddress,
        isValidInput: true,
        hasError: false,
        errorMessage: null,
      };
    }

    if (validationError) {
      return {
        resolvedEthAddress: null,
        isValidInput: false,
        hasError: true,
        errorMessage: validationError,
      };
    }

    if (!normalizedName) {
      return {
        resolvedEthAddress: null,
        isValidInput: false,
        hasError: false,
        errorMessage: null,
      };
    }

    if (resolvedAddress && resolvedAddress !== zeroAddress) {
      return {
        resolvedEthAddress: resolvedAddress as string,
        isValidInput: true,
        hasError: false,
        errorMessage: null,
      };
    }

    if (isError || resolvedAddress === zeroAddress) {
      const showError = debouncedAddress && !isTyping;
      return {
        resolvedEthAddress: null,
        isValidInput: false,
        hasError: !!showError,
        errorMessage: showError ? (error?.message ?? "This ENS name could not be resolved.") : null,
      };
    }

    return {
      resolvedEthAddress: null,
      isValidInput: false,
      hasError: false,
      errorMessage: null,
    };
  }, [
    directAddress,
    validationError,
    normalizedName,
    resolvedAddress,
    isError,
    error,
    debouncedAddress,
    isTyping,
  ]);

  return {
    normalizedName,
    ...result,
    isResolvingInProgress,
    isTyping,
    isValidEthAddress,
  };
}
