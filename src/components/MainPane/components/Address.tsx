import { type FC } from "react";

import { useAccount, useEnsName } from "wagmi";

import { InfoText } from "@/components";
import { useWindowSize } from "@/hooks";
import { getEllipsisTxt } from "@/utils/formatters";

const Address: FC = (): JSX.Element => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { isTablet } = useWindowSize();

  const displayedAddress = isTablet && address ? getEllipsisTxt(address, 4) : address;

  return <InfoText label="Address" value={ensName ?? displayedAddress} />;
};

export default Address;
