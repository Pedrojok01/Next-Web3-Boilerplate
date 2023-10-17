// hooks/useTransferNative.ts
import { useEffect } from "react";

import { parseEther } from "viem";
import { useSendTransaction, useWaitForTransaction } from "wagmi";

import { useNotify } from ".";

export const useTransferNative = () => {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });
  const notify = useNotify();

  const transferNative = async (address: string, amount: number) => {
    sendTransaction({
      to: address,
      value: parseEther(amount.toString()),
    });
  };

  useEffect(() => {
    if (receipt) {
      notify({
        title: "Transfer successfully sent!",
        message: `Hash: ${receipt.transactionHash}`,
        status: "success",
      });
    }

    if (isError && error) {
      notify({
        title: "An error occured:",
        message: error.message,
        status: "error",
      });
    }
  }, [receipt, isError, error, notify]);

  return {
    transferNative,
    transactionData: data,
    transactionReceipt: receipt,
    isLoading,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
