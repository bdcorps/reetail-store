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
} from "@chakra-ui/react";
import axios from "axios";
import { FunctionComponent, useState } from "react";

interface SettingsModalProps {
  siteId: string;
  at_apiKey: string;
  at_base: string;
  at_table: string;
}

const SettingsModal: FunctionComponent<SettingsModalProps> = ({
  siteId,
  at_apiKey,
  at_base,
  at_table,
}: SettingsModalProps) => {
  const [api, setApi] = useState(at_apiKey);
  const [base, setBase] = useState(at_base);
  const [table, setTable] = useState(at_table);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveSettings = async () => {
    try {
      const res = await axios.post(
        "/api/site/settings",
        {
          at_apiKey: api,
          at_base: base,
          at_table: table,
          siteId,
        },
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
      <HStack spacing={4} align="center">
        <Link href={`https://airtable.com/${at_base}/${at_table}`} isExternal>
          View Airtable <ExternalLinkIcon mx="2px" />
        </Link>
        <Button onClick={onOpen}>Settings</Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Airtable Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl as="fieldset">
                <FormLabel as="legend">API Key</FormLabel>
                <Input
                  placeholder="keyxxxxxxxxx"
                  defaultValue={at_apiKey}
                  onChange={(e: any) => {
                    setApi(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Base ID</FormLabel>
                <Input
                  placeholder="appxxxxxxxxx"
                  defaultValue={at_base}
                  onChange={(e: any) => {
                    setBase(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Table Name</FormLabel>
                <Input
                  placeholder="tblxxxxxxxxx"
                  defaultValue={at_table}
                  onChange={(e: any) => {
                    setTable(e.target.value);
                  }}
                />
              </FormControl>
            </VStack>
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

export default SettingsModal;
