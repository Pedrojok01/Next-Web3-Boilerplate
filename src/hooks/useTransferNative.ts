// hooks/useTransferNative.ts
import { parseEther } from "viem";
import { useSendTransaction, useWaitForTransaction } from "wagmi";

export const useTransferNative = () => {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const transferNative = async (address: string, amount: number) => {
    sendTransaction({
      to: address,
      value: parseEther(amount.toString()),
    });
  };

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
