import { type FC } from "react";

import { useAccount } from "wagmi";

import { InfoText } from "@/components";

const Chain: FC = () => {
  const { chain } = useAccount();

  const chainInfo = `${chain?.name} (${chain?.id})`;

  return <InfoText label="Chain" value={chainInfo} />;
};

export default Chain;
