import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Cart from "../../../components/Cart";
import { getStoreBySubdomain } from "../../api/store/s/[subdomain]";

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

interface StoreIndexProps {}

const StoreIndex: FunctionComponent<StoreIndexProps> = ({
  store: {
    id,
    name,
    announcement,
    description = "This is my cool store",
    subdomain,
    products,
  },
}: any) => {
  const { addItem } = useShoppingCart();
  const toast = useToast();

  return (
    <Container maxW="container.lg" p={4}>
      <HStack py={2} spacing={6} align="center">
        <HStack spacing={2}>
          <Text fontWeight={600} fontSize="md" color="brand.500">
            {name}
          </Text>
        </HStack>
        <Spacer />
        <Cart />
      </HStack>

      <VStack spacing={10}>
        <Center>
          <Box textAlign="center">
            <Text fontSize="xl" fontWeight={600}>
              {announcement}
            </Text>
          </Box>
          {/* <Box textAlign="center">
            <Text>{description}</Text>
          </Box> */}
        </Center>

        <HStack spacing={10} align="flex-start" w="full">
          {/* <Box flex="1" w="full">
            <CategoryBrowser />
          </Box> */}
          <SimpleGrid minChildWidth={200} spacing={10} flex="2">
            {products.map((product: any, i: number) => {
              return (
                <VStack spacing={2} align="flex-start" key={`product_${i}`}>
                  <Image
                    bg="gray.50"
                    height="300px"
                    src={product.image}
                  ></Image>
                  <Box>
                    <Text>{product.name}</Text>
                    <Text>${product.price / 100}</Text>

                    <Button
                      onClick={() => {
                        addItem(product);
                        toast({
                          title: "Item added.",
                          description:
                            "We've added an item to the cart for you.",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                      variant="link"
                      size="sm"
                    >
                      + Add to cart
                    </Button>
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
  const { subdomain } = params;

  const storeData = await getStoreBySubdomain(subdomain);

  const props = { store: storeData };

  return {
    props,
  };
}

export default StoreIndex;
