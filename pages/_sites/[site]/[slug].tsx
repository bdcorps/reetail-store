import {
  Center,
  VStack,
  Box,
  Heading,
  Button,
  Text,
  Image,
  Flex,
  Container,
  HStack,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect, FunctionComponent } from "react";
import { getAllPages } from "../../api";
import { getSite } from "../../api/site/[siteId]";

// const data: any = {
//   123: {
//     page1: {
//       headline: "Remove sound from your video online",
//       description: "1",
//       image: "https://cdn.kapwing.com/static/muteVideoControl.jpeg",
//       ctaText: "Try for free",
//     },
//   },
// };

// {"headline": "Remove sound from your video online",
// "description": "1",
// "image": "https://cdn.kapwing.com/static/muteVideoControl.jpeg",
// "ctaText": "Try for free"}

interface TestimonialProps {}

export const Testimonial: FunctionComponent<TestimonialProps> = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Text>
        Example Video Editor is the best in the game. It has saved me 10 hours
        of work every week. Highly recommended for day to day marketers!
      </Text>
      <Text align="right" mt={4}>
        - Sukh (Social Media Ad creator)
      </Text>
    </Box>
  );
};

const Site: NextPage = ({
  site,
  headline,
  description,
  image,
  ctaText,
}: any) => {
  return (
    <Container maxW="container.xl">
      <Head>
        <title>
          {headline} | {site.name}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box padding="4" color="black" w="full">
        <Center p={4} minHeight="65vh">
          <VStack>
            <Text fontWeight={500} fontSize="lg" color="#5000FF">
              {site.name}
            </Text>

            <Container textAlign="center" flex="1" maxW="container.sm">
              <Heading size="2xl" mb={4}>
                {headline}
              </Heading>
              <Text fontSize="xl">{description}</Text>
              <Button mt={10} colorScheme="brand">
                {ctaText} ➜
              </Button>
            </Container>
          </VStack>
        </Center>
        <Center pt="20vh" py={8} w="full">
          <VStack spacing={30} w="full">
            <Box flex="2">
              <Image src={image} alt="image"></Image>
            </Box>

            <Center minHeight="60vh">
              <VStack spacing={10}>
                <Text fontSize="2xl" fontWeight={500}>
                  Trusted by teams worldwide
                </Text>

                <Wrap spacing={20} justify="center">
                  <WrapItem>
                    <Testimonial />
                  </WrapItem>
                  <WrapItem>
                    <Testimonial />
                  </WrapItem>
                  <WrapItem>
                    <Testimonial />
                  </WrapItem>{" "}
                  <WrapItem>
                    <Testimonial />
                  </WrapItem>
                </Wrap>
              </VStack>
            </Center>
          </VStack>
        </Center>
      </Box>
      <Center p={10}>
        <VStack spacing={10}>
          <Text fontWeight={500} fontSize="2xl" align="center">
            Ready? Lets get started.
          </Text>
          <Button size="lg" colorScheme="brand">
            {ctaText}
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export async function getServerSideProps({ params }: any) {
  const { site, slug } = params;

  const site1 = await getSite(site);
  const page: any = await getAllPages(site, slug);
  console.log(page);

  // console.log(site1);
  const props = { ...page.data, site: site1 };

  return {
    props,
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { site: "123", slug: "page1" } }],
//     fallback: true,
//   };
// }

export default Site;
