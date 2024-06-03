import { useEffect, type FC } from "react";

import { InfoText } from "@/components";
// import MTT3 from "../../../contracts/ERC1919.json";
import { useGetBalance } from "@/hooks";

const ERC1919Balance: FC = (): JSX.Element => {
  const { balance } = useGetBalance();
  const displayBalance = balance ? Number(balance) / 1e18 : 0;

  useEffect(() => {
    //
  }, [displayBalance]); // Ensure correct dependencies

  return <InfoText label="Your MTT3 Balance" value={displayBalance.toString()} />;
};

export default ERC1919Balance;
