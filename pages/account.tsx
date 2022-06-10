import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Center,
  Flex,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React, { FunctionComponent } from "react";
import Layout from "../components/layout";

interface AccountProps {}

const Account: FunctionComponent<AccountProps> = () => {
  return (
    <Layout>
      <Flex justify="center" h="100vh" w="100vw" align="center">
        <Center w="100%">
          <Box style={{ width: 350 }}>
            <VStack spacing={4} align="flex-start">
              <Heading>Log in to Reetail</Heading>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="My Awesome Site 1" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Template</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>

              <Button onClick={() => signIn()}>Sign in with Google</Button>
            </VStack>
          </Box>
        </Center>
      </Flex>
    </Layout>
  );
};

export default Account;
