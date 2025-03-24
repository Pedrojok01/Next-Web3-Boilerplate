import { useCallback, useEffect, useState } from "react";

import { recoverMessageAddress, type Address } from "viem";
import { useSignMessage } from "wagmi";

export function useSignMessageHook() {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  const { data: signature, variables, error, isPending, signMessage } = useSignMessage();

  const recoverAddress = useCallback(async () => {
    if (variables?.message && signature) {
      try {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature,
        });
        setRecoveredAddress(recoveredAddress);
      } catch (err) {
        console.error("Error recovering address:", err);
      }
    }
  }, [signature, variables?.message]);

  useEffect(() => {
    if (signature && variables?.message) {
      recoverAddress();
    }
  }, [signature, variables?.message, recoverAddress]);

  return { signature, recoveredAddress, error, isPending, signMessage };
}
