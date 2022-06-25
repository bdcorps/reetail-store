import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Wrap,
  Image,
  WrapItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import image from "next/image";
import React, { FunctionComponent } from "react";
import { getStore } from "../../api/store/[storeId]";

interface SiteIndexProps {}

const SiteIndex: FunctionComponent<SiteIndexProps> = ({
  store: {
    id,
    name,
    description = "This is my cool store",
    subdomain,
    products,
  },
}: any) => {
  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={10}>
        <Center>
          <Box textAlign="center">
            <Text>{description}</Text>
            <Text fontSize="3xl" fontWeight={600}>
              {name}
            </Text>
          </Box>
        </Center>

        <HStack spacing={10} align="flex-start" w="full">
          {/* <Box flex="1" w="full">
            <CategoryBrowser />
          </Box> */}
          <SimpleGrid minChildWidth={200} spacing={10} flex="2">
            {products.map((product: any) => {
              return (
                <VStack spacing={2} align="flex-start">
                  <Box bg="gray.50" height="300px" w="full"></Box>
                  <Box>
                    <Text>{product.name}</Text>
                    <Text>${product.price / 100}</Text>
                  </Box>
                </VStack>
              );
            })}
          </SimpleGrid>
        </HStack>
      </VStack>
    </Container>
  );
};

export async function getServerSideProps({ params }: any) {
  const { store } = params;

  const storeData = await getStore(store);

  const props = { store: storeData };

  return {
    props,
  };
}

export default SiteIndex;
