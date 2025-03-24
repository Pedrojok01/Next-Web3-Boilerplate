import type { FC } from "react";

import { useAccount, useBalance } from "wagmi";

import { InfoText } from "@/components";

const Balance: FC = () => {
  const { address } = useAccount();
  const { data, isLoading, isError } = useBalance({ address });

  let displayBalance = "0";
  if (isLoading) displayBalance = "Loading...";
  else if (isError) displayBalance = "Error fetching balance";
  else if (data?.formatted) displayBalance = `Ξ ${data?.formatted}`;

  return <InfoText label="Balance" value={displayBalance} />;
};

export default Balance;
