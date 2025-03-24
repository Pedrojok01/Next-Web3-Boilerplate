import { type FC } from "react";

import { useBlockNumber } from "wagmi";

import { InfoText } from "@/components";

const BlockNumber: FC = () => {
  const { data, isLoading, isError } = useBlockNumber({ watch: true });

  let displayBlockNumber = data?.toString();
  if (isLoading) displayBlockNumber = "Loading...";
  else if (isError) displayBlockNumber = "Error fetching block";

  return <InfoText label="Block Number" value={displayBlockNumber} />;
};

export default BlockNumber;
