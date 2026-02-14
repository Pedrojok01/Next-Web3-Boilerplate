import { type ReactNode, useCallback } from "react";

import { toaster } from "@/components/Toaster/Toaster";

interface NotifyAction {
  label: string;
  onClick: () => void;
}

interface NotifyProps {
  title?: string;
  message: ReactNode;
  duration?: number;
  action?: NotifyAction;
  meta?: Record<string, unknown>;
}

interface UseNotifyResult {
  notifySuccess: (props: NotifyProps) => void;
  notifyError: (props: NotifyProps) => void;
}

export const useNotify = (): UseNotifyResult => {
  const notifySuccess = useCallback(
    ({ title, message, duration = 8000, action, meta }: NotifyProps) => {
      toaster.success({
        title,
        description: message,
        duration,
        action,
        meta,
      });
    },
    [],
  );

  const notifyError = useCallback(
    ({ title, message, duration = 8000, action, meta }: NotifyProps) => {
      toaster.error({
        title,
        description: message,
        duration,
        action,
        meta,
      });
    },
    [],
  );

  return {
    notifySuccess,
    notifyError,
  };
};
