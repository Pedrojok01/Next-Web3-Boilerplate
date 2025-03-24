import { type ReactNode } from "react";

import { toaster } from "@/components/Toaster/Toaster";

interface NotifyProps {
  title?: string;
  message: ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotify = () => {
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
