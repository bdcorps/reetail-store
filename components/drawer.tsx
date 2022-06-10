import {
  ArrowForwardIcon,
  ChatIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  MoonIcon,
  PlusSquareIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";

import {
  Button,
  IconButton,
  Input,
  Select,
  chakra,
  Text,
  Link,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
  Box,
  Flex,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

interface LinkItemProps {
  title: string;
  icon: React.ReactElement;
  url: string;
}

const LinkItem = ({ title, icon, url }: LinkItemProps) => {
  return (
    <Link
      width="100%"
      justifyContent="flex-start"
      size="sm"
      fontWeight="regular"
      // leftIcon={icon}
      variant="ghost"
      _hover={{ fontWeight: "medium" }}
      href={url}
    >
      {title}
    </Link>
  );
};

const LinkHeader = ({ title }: any) => {
  return (
    <Box pt={4} pb={2}>
      <Text fontSize="xs" color="gray.500" fontWeight="medium">
        {title}
      </Text>
    </Box>
  );
};

const SidebarContents = () => {
  const { data: session } = useSession();

  return (
    <VStack
      align="flex-start"
      justify="space-between"
      h="100vh"
      p={4}
      w="250px"
      bg="gray.50"
    >
      <Box w="full">
        <Box display={{ base: "none", md: "flex" }}>
          <Heading fontSize="xl">Reetail</Heading>
        </Box>

        <Flex py={4} direction="column" h="95vh">
          <Box>
            <LinkItem icon={<InfoOutlineIcon />} title="Home" url="/" />
          </Box>
          <Spacer />
          {session ? (
            <Box>
              <Text>{session?.user?.email}</Text>
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
            </Box>
          ) : (
            <Button
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </Button>
          )}
        </Flex>
      </Box>
    </VStack>
  );
};
const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Search database"
        variant="ghost"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader>Reetail</DrawerHeader>

          <DrawerBody>
            <SidebarContents />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Sidebar = ({ children }: any) => {
  return (
    <chakra.header id="header">
      <Box display={{ base: "flex", md: "none" }} p={4}>
        <MobileSidebar />
      </Box>

      <Box display={{ base: "none", md: "flex" }}>
        <SidebarContents />
      </Box>

      {/* <Flex w="full" align="flex-start" justify="flex-start">
       

        <VStack w="full">
          <HStack>
            <ConfirmButton
              headerText="Delete this message?"
              bodyText="Are you sure you want to delete this message? This cannot be undone."
              onSuccessAction={() => {
                console.log("click");
              }}
              buttonText="Delete"
              isDanger={true}
            />
            <Button variant="outline" m={4}>
              Log in
            </Button>
          </HStack>

          <Box alignSelf="flex-start">{children}</Box>
        </VStack>
      </Flex> */}
    </chakra.header>
  );
};

const DrawerHome: NextPage = ({ children }: any) => {
  return (
    <Box>
      <Sidebar />
    </Box>
  );
};

export default DrawerHome;

// https://levelup.gitconnected.com/create-a-responsive-navigation-bar-using-chakraui-6489473e933
