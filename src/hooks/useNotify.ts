import { type ReactNode, useCallback } from "react";

import { toaster } from "@/components/Toaster/Toaster";

interface NotifyProps {
  title: string;
  message: ReactNode;
}

export const useNotify = () => {
  const notifySuccess = useCallback(({ title, message }: NotifyProps) => {
    toaster.success({ title, description: message, duration: 10000, meta: { closable: true } });
  }, []);

  const notifyError = useCallback(({ title, message }: NotifyProps) => {
    toaster.error({ title, description: message, duration: 10000, meta: { closable: true } });
  }, []);

  return { notifySuccess, notifyError };
};
