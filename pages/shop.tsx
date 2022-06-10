import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  Center,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
};

interface CategoryBrowserProps {}

const CategoryBrowser: FunctionComponent<CategoryBrowserProps> = () => {
  return (
    <Accordion w="full" defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <CheckboxGroup
            colorScheme="green"
            defaultValue={["naruto", "kakashi"]}
          >
            <VStack spacing={2} align="flex-start" ml={4}>
              <Checkbox value="naruto">Naruto</Checkbox>
              <Checkbox value="sasuke">Sasuke</Checkbox>
              <Checkbox value="kakashi">Kakashi</Checkbox>
            </VStack>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

interface ShopProps {
  name: string;
  description: string;
  products: Product[];
}

const Shop: FunctionComponent<ShopProps> = ({
  name,
  description,
  products,
}: ShopProps) => {
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
          <Box flex="1" w="full">
            <CategoryBrowser />
          </Box>
          <SimpleGrid minChildWidth={200} spacing={10} flex="2">
            {products.map((product: any) => {
              return (
                <VStack spacing={2} align="flex-start">
                  <Box bg="gray.50" height="300px" w="full"></Box>
                  <Box>
                    <Text>{product.name}</Text>
                    <Text>${product.price}</Text>
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

export async function getStaticProps() {
  const products = {
    name: "Sukh's Clothing Brand",
    description: "Summer Sale",
    products: [
      {
        name: "Minmax Men's Shirt",
        price: 30,
        category: "Men",
        type: "Jacket",
      },
      {
        name: "Supermax Women's Shirt",
        price: 30,
        category: "Women",
        type: "Coats",
      },
      {
        name: "Another Women's Shirt",
        price: 30,
        category: "Men",
        type: "Coats",
      },
      { name: "Airy Tunic", price: 30, category: "Men", type: "T-Shirts" },
    ],
  };

  return {
    props: products,
  };
}

export default Shop;
