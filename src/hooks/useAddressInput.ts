import { useMemo } from "react";

import { zeroAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress } from "wagmi";

import { DEBOUNCE_MS } from "@/constants";

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

function isValidEthAddress(value: string): boolean {
  return value.startsWith("0x") && value.length === 42;
}

export function useAddressInput(address: string): UseAddressInputResult {
  const debouncedAddress = useDebounce(address, DEBOUNCE_MS.ens);
  const isTyping = address !== debouncedAddress;

  const validation = useMemo(() => {
    if (!address.trim()) {
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

  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsAddress({
    name: normalizedName || undefined,
  });

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
        resolvedEthAddress: resolvedAddress,
        isValidInput: true,
        hasError: false,
        errorMessage: null,
      };
    }

    if (isError || resolvedAddress === zeroAddress) {
      const showError = Boolean(debouncedAddress) && !isTyping;
      return {
        resolvedEthAddress: null,
        isValidInput: false,
        hasError: showError,
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
