import { type FC } from "react";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  Box,
  Text,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  duration: 8000,
  max: 3,
});

const renderSignatureDescription = (description: string) => {
  const signaturePart =
    description.split("Signature:")[1]?.split("Recovered Address:")[0]?.trim() || "";
  const recoveredAddressPart = description.split("Recovered Address:")[1]?.trim() || "";

  return (
    <Box>
      <Text fontWeight="medium">Signature:</Text>
      <Text
        fontSize="xs"
        fontFamily="monospace"
        p={1.5}
        bg="blackAlpha.50"
        borderRadius="sm"
        overflow="auto"
        my={1}
      >
        {signaturePart}
      </Text>
      <Text fontWeight="medium" mt={2}>
        Recovered Address:
      </Text>
      <Text
        fontSize="xs"
        fontFamily="monospace"
        p={1.5}
        bg="blackAlpha.50"
        borderRadius="sm"
        overflow="auto"
      >
        {recoveredAddressPart}
      </Text>
    </Box>
  );
};

const renderDescription = (description: React.ReactNode) => {
  if (
    typeof description === "string" &&
    description.includes("Signature:") &&
    description.includes("Recovered Address:")
  ) {
    return renderSignatureDescription(description);
  }

  return description;
};

const Toaster: FC = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ base: "90%", md: "lg" }} p={3} borderRadius="md" boxShadow="md">
            {toast.type === "loading" ? <Spinner size="sm" mr={2} /> : <Toast.Indicator />}
            <Stack gap="2" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title fontWeight="bold">{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description whiteSpace="pre-line" wordBreak="break-word">
                  {renderDescription(toast.description)}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger onClick={toast.action.onClick}>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.meta?.closable !== false && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};

export default Toaster;
