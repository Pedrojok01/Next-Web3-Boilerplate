import { type ReactNode } from "react";

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
}

interface UseNotifyResult {
  notifySuccess: (props: NotifyProps) => void;
  notifyError: (props: NotifyProps) => void;
}

export const useNotify = (): UseNotifyResult => {
  const notifySuccess = ({ title, message, duration = 8000, action }: NotifyProps) => {
    toaster.success({
      title,
      description: message,
      duration,
      action,
    });
  };

  const notifyError = ({ title, message, duration = 8000, action }: NotifyProps) => {
    toaster.error({
      title,
      description: message,
      duration,
      action,
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
};
