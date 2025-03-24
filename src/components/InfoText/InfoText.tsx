import { type FC } from "react";

import { Text, type BoxProps } from "@chakra-ui/react";

interface InfoTextProps extends BoxProps {
  label: string;
  value?: string;
}

const InfoText: FC<InfoTextProps> = ({ label, value, ...props }) => (
  <Text {...props}>
    {label}:{" "}
    <Text as="span" fontWeight="800">
      {value || "N/A"}
    </Text>
  </Text>
);

export default InfoText;
