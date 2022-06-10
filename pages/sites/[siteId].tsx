import DrawerHome from "../../components/drawer";
import SettingsModal from "../../components/settingsModal";
import {
  HStack,
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Grid,
  GridItem,
  Text,
  Input,
  Link,
  FormControl,
  FormLabel,
  Divider,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";

const Site: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { siteId } = router.query;

  const [data, setData] = useState<any>({ site: { pages: [] } });
  const [isLoading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/site/${siteId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [siteId]);

  const generatePages = async () => {
    try {
      const res = await axios.post(
        "/api/records",
        {
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

  if (!siteId) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <Layout>
      <HStack align="flex-start" justify="flex-start">
        {/* <DrawerHome /> */}

        <Box p={10} w="full">
          <Box mb={4}>
            <Heading>Update site</Heading>
            <Text color="gray.400">
              Connect Airtable in Settings and generate new pages for your site
            </Text>
          </Box>
          <Flex>
            <Spacer />
            <SettingsModal
              siteId={siteId as string}
              at_apiKey={data.site?.at_apiKey}
              at_base={data.site?.at_base}
              at_table={data.site?.at_table}
            />
          </Flex>

          <VStack spacing={4} align="flex-start" w="full">
            <Box mb={4}>
              <Text fontWeight={500}>Generated pages</Text>
            </Box>

            <VStack
              maxW="sm"
              borderWidth="1px"
              borderRadius="sm"
              overflow="hidden"
              p={2}
              divider={<Divider />}
              w="full"
            >
              {data?.site?.pages.map((page: any, i: number) => {
                return (
                  <Box key={`key__${i}`} w="full">
                    <Flex w="full">
                      <Text>/{page.name}</Text>
                      <Spacer />
                      <Link
                        href={`https://${siteId}.reetail-store.cc/${page.name}`}
                        color="brand.500"
                        isExternal
                      >
                        View ➜
                      </Link>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
            <Button onClick={generatePages}>Generate pages</Button>
          </VStack>
        </Box>
      </HStack>
    </Layout>
  );
};

export default Site;
