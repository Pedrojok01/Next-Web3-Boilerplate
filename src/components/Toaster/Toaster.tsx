import { type FC } from "react";

import {
  Portal,
  Spinner,
  Stack,
  Toast,
  Toaster as ChakraToaster,
  Box,
  Text,
} from "@chakra-ui/react";

import { type SignatureMeta, toaster } from "@/lib/toaster";

const renderSignatureDescription = (meta: SignatureMeta) => (
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
      {meta.signature}
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
      {meta.recoveredAddress}
    </Text>
  </Box>
);

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
                  {toast.meta?.signatureData
                    ? renderSignatureDescription(toast.meta.signatureData as SignatureMeta)
                    : toast.description}
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
