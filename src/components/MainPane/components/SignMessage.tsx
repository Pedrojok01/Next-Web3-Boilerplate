import { type FC, type ChangeEvent, type MouseEvent, useEffect, useState } from "react";

import { Button, Input, VStack } from "@chakra-ui/react";

import { useSignMessageHook, useNotify } from "@/hooks";

const SignMessage: FC = () => {
  const { signature, recoveredAddress, error, isPending, signMessage } = useSignMessageHook();
  const [messageAuth, setMessageAuth] = useState<string>("");
  const { notifyError, notifySuccess } = useNotify();

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessageAuth(e.target.value);
  };

  const handleSignMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    signMessage({ message: messageAuth });
  };

  useEffect(() => {
    if (signature && recoveredAddress) {
      notifySuccess({
        title: "Message successfully signed!",
        message: `Signature: ${signature}\n\nRecovered Address: ${recoveredAddress}`,
      });
    }

    if (error) {
      notifyError({
        title: "An error occurred",
        message: error.message || "Unknown error",
      });
    }
  }, [signature, recoveredAddress, error, notifyError, notifySuccess]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <Input
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Enter message to sign"
        css={{
          border: "1px solid rgba(152, 161, 192, 0.24)",
          borderRadius: "12px",
          boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.4)",
          height: "40px",
          padding: "0 16px",
        }}
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
