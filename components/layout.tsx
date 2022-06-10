import Header from "./header";
import type { FunctionComponent, ReactChildren } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  let { data: session, status } = useSession();

  // console.log(process.env.NODE_ENV);
  // const session = {
  //   user: { email: "d", name: "brighter" },
  // };

  // const status = "authenticated";

  const loading = status === "loading";

  return (
    <header>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {!session && (
              <Center h="100vh" w="100vw">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </Button>
              </Center>
            )}
            {session?.user && (
              <>
                <HStack align="flex-start" h="100vh" w="100vw">
                  <Flex
                    direction="column"
                    h="100vh"
                    p={6}
                    w={250}
                    backgroundColor="gray.50"
                  >
                    <Link href="/" fontWeight={500}>
                      Reetail
                    </Link>
                    <Spacer />
                    <Text p={4}>
                      Logged in as {session.user.email ?? session.user.name}
                    </Text>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign out
                    </Button>
                  </Flex>

                  <Box w="full">{children}</Box>
                </HStack>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Layout;
