import { type FC, type ChangeEvent, type MouseEvent, useEffect, useState } from "react";

import { Button, Input, VStack } from "@chakra-ui/react";

import { useSignMessageHook, useNotify } from "@/hooks";

const SignMessage: FC = () => {
  const {
    signature,
    recoveredAddress,
    error,
    isPending,
    setRecoveredAddress,
    signMessage,
    resetError,
  } = useSignMessageHook();
  const [messageAuth, setMessageAuth] = useState<string>("");
  const [hasShownError, setHasShownError] = useState<boolean>(false);
  const { notifyError, notifySuccess } = useNotify();

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessageAuth(e.target.value);
    setHasShownError(false);
    if (error) {
      resetError();
    }
  };

  const handleSignMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setHasShownError(false);
    signMessage({ message: messageAuth });
  };

  useEffect(() => {
    if (signature && recoveredAddress) {
      notifySuccess({
        title: "Message successfully signed!",
        message: `Signature: ${signature}\n\nRecovered Address: ${recoveredAddress}`,
      });
      setRecoveredAddress(undefined);
      setMessageAuth("");
    }

    if (error && !hasShownError) {
      notifyError({
        title: "An error occurred",
        message: error.message || "Unknown error",
      });
      setHasShownError(true);
    }
  }, [
    signature,
    recoveredAddress,
    error,
    hasShownError,
    notifyError,
    notifySuccess,
    setRecoveredAddress,
    setMessageAuth,
  ]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <Input
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Enter message to sign"
        padding="0 16px"
        className="custom-input"
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
