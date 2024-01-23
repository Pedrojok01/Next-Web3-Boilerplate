import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

import { type LotteryPoolProps } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

function CreateTicket(props: { poolList: Array<LotteryPoolProps>; [propNames: string]: unknown }) {
  const searchParams = useSearchParams();
  const { isConnected, address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buyParam, setBuyParam] = useState({
    poolCode: "System-PowerBlast-0001",
    ticketNum: 1,
  });

  const saveOrUpdate = api.user.saveTickets.useMutation({
    onSuccess: (data) => {
      if (data.code == 200) onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const submitted = () => {
    if (!address || !buyParam.poolCode) {
      return;
    }
    saveOrUpdate.mutate({
      ...buyParam,
      address,
      txHash: nanoid(5),
      txTime: new Date().getTime(),
      referral: searchParams.get("referral") ?? undefined,
      tickets: [Number(Math.floor(Math.random() * 10000000) + 1).toString(16)],
    });
  };

  return (
    <>
      {isConnected ? (
        <Button onClick={onOpen}>Buy Ticket</Button>
      ) : (
        <Button variant="solid" colorScheme="teal">
          Connect Wallet
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Lottery Pool</FormLabel>
              <Select
                value={buyParam.poolCode}
                onChange={(_) => {
                  setBuyParam({ ...buyParam, poolCode: _.target.value });
                }}
              >
                {props?.poolList?.map((p) => {
                  return (
                    <option key={p.poolCode} value={p.poolCode}>
                      {p.name}
                    </option>
                  );
                })}
              </Select>
              <FormControl>
                <FormLabel>Number</FormLabel>
                <NumberInput
                  max={10}
                  min={1}
                  defaultValue={buyParam.ticketNum}
                  onChange={(_) => {
                    setBuyParam({ ...buyParam, ticketNum: Number(_.valueOf()) });
                  }}
                >
                  <NumberInputField value={buyParam.ticketNum} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={saveOrUpdate.isLoading} onClick={() => submitted()} variant="ghost">
              Submitted
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTicket;
