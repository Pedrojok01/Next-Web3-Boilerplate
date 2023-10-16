// components/Layout.tsx
import { ReactNode, type FC } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex="1" p={4}>
        {children}
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
