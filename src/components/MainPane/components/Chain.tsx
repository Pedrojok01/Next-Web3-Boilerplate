import { type FC } from "react";

import { useNetwork } from "wagmi";

import { InfoText } from "@/components";

const Chain: FC = (): JSX.Element => {
  const { chain } = useNetwork();

  const chainInfo = `${chain?.name} (${chain?.id})`;

  return <InfoText label="Chain" value={chainInfo} />;
};

export default Chain;
