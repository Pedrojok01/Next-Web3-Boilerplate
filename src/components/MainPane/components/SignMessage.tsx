import { type FC, type ChangeEvent, type MouseEvent, useEffect, useState } from "react";

import { Button, Input, VStack } from "@chakra-ui/react";

import { useSignMessageHook, useNotify } from "@/hooks";

const SignMessage: FC = () => {
  const { signature, recoveredAddress, error, isLoading, signMessage } = useSignMessageHook();
  const [messageAuth, setMessageAuth] = useState<string>("");
  const notify = useNotify();

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessageAuth(e.target.value);
  };

  const handleSignMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    signMessage({ message: messageAuth });
  };

  useEffect(() => {
    if (signature && recoveredAddress) {
      const notification = (
        <>
          <b>Signature:</b> {signature}
          <br></br>
          <br></br>
          <b>Recovered Address:</b> {recoveredAddress}
        </>
      );

      notify({
        title: "Message successfully signed!",
        message: notification,
        status: "success",
      });
    }

    if (error) {
      notify({
        title: "An error occured:",
        message: error.message,
        status: "error",
      });
    }
  }, [signature, recoveredAddress, error, notify]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <Input
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Input message to sign"
      />
      <Button
        variant="ghost"
        onClick={handleSignMessage}
        isLoading={isLoading}
        className="custom-button"
      >
        Sign Message
      </Button>
    </VStack>
  );
};

export default SignMessage;
