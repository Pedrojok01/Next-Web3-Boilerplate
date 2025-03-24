"use client";

import React, { useCallback, type FC, type ChangeEvent, type ReactNode, useEffect } from "react";

import { Box, Input, InputGroup, Spinner } from "@chakra-ui/react";
import Image from "next/image";

import { useAddressInput, useNotify } from "@/hooks";

import Jazzicons from "./Jazzicons";
import warningImage from "../../../public/img/warning.svg";

interface AddressInputProps {
  receiver: string;
  setReceiver: (receiver: string) => void;
}

const AddressInput: FC<AddressInputProps> = ({ receiver, setReceiver }) => {
  const { notifyError } = useNotify();

  const {
    resolvedEthAddress,
    isResolvingInProgress,
    hasError,
    errorMessage,
    isTyping,
    isValidEthAddress,
  } = useAddressInput(receiver);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
    },
    [setReceiver],
  );

  // Show error notifications when appropriate
  useEffect(() => {
    if (hasError && !isTyping && errorMessage) {
      notifyError({
        title: "Invalid Address:",
        message: errorMessage,
      });
    }
  }, [hasError, isTyping, errorMessage, notifyError]);

  const getAddonContent = (): ReactNode => {
    // Case 1: Resolving in progress
    if (isResolvingInProgress) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" pl={3}>
          <Spinner />
        </Box>
      );
    }

    // Case 2: Valid address - either direct ETH address or resolved ENS
    const isValidDirectAddress = isValidEthAddress(receiver);
    const hasValidResolvedENS = !isValidDirectAddress && resolvedEthAddress !== null;

    if ((isValidDirectAddress || hasValidResolvedENS) && receiver && receiver.trim() !== "") {
      const displayAddress = isValidDirectAddress ? receiver : (resolvedEthAddress as string);
      return <Jazzicons seed={displayAddress.toLowerCase()} size={25} />;
    }

    // Case 3: No input or empty input
    if (!receiver || receiver.trim() === "") {
      return <Jazzicons size={25} />;
    }

    // Case 4: Invalid address - has input but no valid address
    return (
      <Box display="flex" justifyContent="center" alignItems="center" pl={2}>
        <Image
          alt="warning icon"
          src={warningImage.src}
          className="icon-wrapper error-icon"
          width={25}
          height={25}
        />
      </Box>
    );
  };

  return (
    <Box w="100%">
      <InputGroup startElement={getAddonContent()} w="100%">
        <Input
          value={receiver}
          onChange={handleInput}
          paddingLeft="40px"
          placeholder="Enter Ethereum name or address"
          name="ethereum"
          spellCheck={false}
          className="custom-input"
        />
      </InputGroup>
    </Box>
  );
};

export default AddressInput;
