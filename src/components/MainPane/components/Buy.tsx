import { useState, type ChangeEvent, type FC, type MouseEvent } from "react";

import { Button, Input, VStack, FormLabel } from "@chakra-ui/react";
import { simulateContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";

import { useNotify } from "@/hooks";
import { SMART_CONTRACT_ADDRESS } from "@/utils/constants";

import { abi } from "../../../contracts/abi";
import { wagmiConfig } from "../../../wagmi";

interface BuyProps {
  refreshData: () => void;
}

const Buy: FC<BuyProps> = ({ refreshData }): JSX.Element => {
  const [value, setValue] = useState<number>(0.0001);
  const { notifyError, notifySuccess } = useNotify();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(e.target.value));
  };

  const handleBuy = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    buyToken();
  };

  const buyToken = async () => {
    const finalValue = BigInt(value * 1e18);

    const { request } = await simulateContract(wagmiConfig, {
      abi,
      address: SMART_CONTRACT_ADDRESS,
      functionName: "mintTokens",
      args: [],
      value: finalValue,
    });

    const hash = await writeContract(wagmiConfig, request);
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: hash });

    if (receipt.status === "success") {
      notifySuccess({
        title: "Successfully bought tokens!",
        message: (
          <>
            <b>ETH amount:</b> {value}
            <br />
          </>
        ),
      });
      // Call the parent's refreshData function
      refreshData();
    } else {
      console.log("Transaction failed: ", hash);
      notifyError({
        title: "An error occurred:",
        message: hash,
      });
    }
  };

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <FormLabel htmlFor="buy">Buy MTT3 with ETH</FormLabel>
      <Input
        value={value.toString()}
        onChange={handleInputChange}
        type="number"
        step={0.00001}
        min={0.00001}
        placeholder="Enter a value in ETH"
      />
      <Button variant="ghost" className="custom-button1" onClick={handleBuy}>
        Buy
      </Button>
    </VStack>
  );
};

export default Buy;
