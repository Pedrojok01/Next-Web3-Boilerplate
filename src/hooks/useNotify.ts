import { type ReactNode, useCallback } from "react";

import { useToast } from "@chakra-ui/react";

interface NotifyProps {
  title: string;
  message: ReactNode;
}

export const useNotify = () => {
  const toast = useToast();

  const notifySuccess = useCallback(
    ({ title, message }: NotifyProps) => {
      toast({
        title,
        description: message,
        position: "top-right",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    },
    [toast],
  );

  const notifyError = useCallback(
    ({ title, message }: NotifyProps) => {
      toast({
        title,
        description: message,
        position: "top-right",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    },
    [toast],
  );

  return {
    notifySuccess,
    notifyError,
  };
};
