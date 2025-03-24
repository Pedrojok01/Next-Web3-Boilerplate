import { type FC } from "react";

import { useBlockNumber } from "wagmi";

import { InfoText } from "@/components";

const BlockNumber: FC = () => {
  const { data } = useBlockNumber({ watch: true });

  return <InfoText label="Block Number" value={data?.toString()} />;
};

export default BlockNumber;
