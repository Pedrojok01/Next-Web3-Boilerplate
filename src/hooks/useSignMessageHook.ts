import { useSignMessage, type UseSignMessageReturnType } from "wagmi";

interface UseSignMessageResult {
  signMessageAsync: UseSignMessageReturnType["signMessageAsync"];
  isPending: boolean;
  error: Error | null;
  reset: () => void;
}

export function useSignMessageHook(): UseSignMessageResult {
  const { error, isPending, signMessageAsync, reset } = useSignMessage();

  return {
    signMessageAsync,
    isPending,
    error,
    reset,
  };
}
