import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Link,
  HStack,
  Center,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { FunctionComponent, useState } from "react";

interface NewSiteModalProps {}

const NewSiteModal: FunctionComponent<
  NewSiteModalProps
> = ({}: NewSiteModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveSettings = async () => {
    try {
      const res = await axios.post(
        "/api/site/settings",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res); //check now
    } catch (e) {}
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple">
        New Site
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new site</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder="My Awesome Site 1" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    placeholder="Learn to jam on awesome things and more"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Favicon</FormLabel>
                  <Input
                    type="text"
                    placeholder="https://xyz.com/favicon.png"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Template</FormLabel>
                  <Select placeholder="Select option">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="brand" onClick={saveSettings}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewSiteModal;
