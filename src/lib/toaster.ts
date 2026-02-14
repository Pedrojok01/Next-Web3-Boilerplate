import { createToaster } from "@chakra-ui/react";

import { TOAST_DURATION, TOAST_MAX } from "@/constants";

export interface SignatureMeta {
  signature: string;
  recoveredAddress: string;
}

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  duration: TOAST_DURATION,
  max: TOAST_MAX,
});
