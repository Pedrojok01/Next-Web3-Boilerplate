import React, { useState, useCallback, type FC, type ChangeEvent } from "react";

import { Box, Input, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { isAddress } from "viem";
import { useEnsResolver } from "wagmi";

import { useDebounce, useNotify } from "@/hooks";

import Jazzicons from "./Jazzicons";
import warningImage from "../../../public/img/warning.svg";

type AddressInputProps = {
  setReceiver: (receiver: string) => void;
};

const AddressInput: FC<AddressInputProps> = ({ setReceiver }) => {
  const [inputValue, setInputValue] = useState("");
  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsResolver({
    name: inputValue,
  });
  const debouncedReceiver = useDebounce(inputValue, 2000);
  const notify = useNotify();

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setInputValue(value);

      if (value.startsWith("0x") && value.length === 42) {
        setReceiver(value);
      } else if (resolvedAddress) {
        setReceiver(resolvedAddress);
      } else if (debouncedReceiver && debouncedReceiver.length > 0 && isError) {
        notify({
          title: "Error:",
          message: error?.message ?? "Invalid address or ENS name.",
          status: "error",
        });
      } else if (value.length === 0) {
        setInputValue("");
        setReceiver("");
      }
    },
    [resolvedAddress, debouncedReceiver, isError, error?.message, notify, setReceiver],
  );

  const jazziconsIcon = () => {
    const address = isAddress(inputValue)
      ? inputValue
      : isAddress(resolvedAddress || "")
      ? resolvedAddress
      : undefined;

    if (address) {
      return <Jazzicons seed={address.toLowerCase()} size={30} />;
    }
  };

  return (
    <Box w={"100%"}>
      {isResolvingInProgress && <Spinner />}
      {jazziconsIcon()}
      {isError && (
        <Image
          alt="warning icon"
          src={warningImage.src}
          className="icon-wrapper error-icon"
          width={30}
          height={30}
        />
      )}

      <Input
        value={inputValue}
        onChange={handleInput}
        placeholder="Enter Ethereum name or address"
        name="ethereum"
        spellCheck={false}
      />

      {/* {resolvedAddress && <div className="resolved">{resolvedAddress}</div>} */}
    </Box>
  );
};

export default AddressInput;
