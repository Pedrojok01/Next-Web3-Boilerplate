import { type FC } from "react";

import { useAccount } from "wagmi";

import { InfoText } from "@/components";

const Status: FC = (): JSX.Element => {
  const { isConnecting, isConnected } = useAccount();

  const statusMapping = {
    isConnecting: "🟡 Connecting Wallet",
    isConnected: "🟢 Wallet Connected",
    default: "⚪️ Wallet Disconnected",
  };

  let status = statusMapping.default;
  if (isConnecting) {
    status = statusMapping.isConnecting;
  } else if (isConnected) {
    status = statusMapping.isConnected;
  }

  return <InfoText label="Account status" value={status} />;
};

export default Status;
