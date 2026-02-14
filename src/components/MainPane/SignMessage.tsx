import { type FC, type ChangeEvent, useState } from "react";

import { Button, Textarea, VStack } from "@chakra-ui/react";
import { recoverMessageAddress } from "viem";

import { useSignMessageHook, useNotify } from "@/hooks";

const SignMessage: FC = () => {
  const { signMessageAsync, isPending, reset } = useSignMessageHook();
  const [messageAuth, setMessageAuth] = useState<string>("");
  const { notifyError, notifySuccess } = useNotify();

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessageAuth(e.target.value);
  };

  const handleSignMessage = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const signature = await signMessageAsync({ message: messageAuth });
      const recoveredAddress = await recoverMessageAddress({
        message: messageAuth,
        signature,
      });
      notifySuccess({
        title: "Message successfully signed!",
        message: "Signature verified",
        meta: { signatureData: { signature, recoveredAddress } },
      });
      setMessageAuth("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      notifyError({
        title: "An error occurred",
        message: errorMessage,
      });
    } finally {
      reset();
    }
  };

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <Textarea
        value={messageAuth}
        onChange={handleMessageChange}
        placeholder="Enter message to sign"
        padding="8px 16px"
        className="custom-input"
        resize="none"
        rows={1}
      />
      <Button
        variant="ghost"
        onClick={handleSignMessage}
        loading={isPending}
        className="custom-button"
        h="40px"
        w="40%"
      >
        Sign Message
      </Button>
    </VStack>
  );
};

export default SignMessage;
