import { useCallback, useEffect, useState } from "react";

import { recoverMessageAddress } from "viem";
import { type Address, useSignMessage } from "wagmi";

export function useSignMessageHook() {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  const { data: signature, variables, error, isLoading, signMessage } = useSignMessage();

  const recoverAddress = useCallback(async () => {
    if (variables?.message && signature) {
      const recoveredAddress = await recoverMessageAddress({
        message: variables?.message,
        signature,
      });
      setRecoveredAddress(recoveredAddress);
    }
  }, [signature, variables?.message]);

  useEffect(() => {
    recoverAddress();
  }, [recoverAddress]);

  return { signature, recoveredAddress, error, isLoading, signMessage };
}
