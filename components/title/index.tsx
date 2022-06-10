import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Spacer, Button, HStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface TitleProps {
  title: string;
  addNew?: () => void;
}

const Title: FunctionComponent<TitleProps> = ({
  title,
  addNew,
}: TitleProps) => {
  return (
    <Box mb={4}>
      <Flex>
        <Box>
          <Heading size="lg">{title}</Heading>
        </Box>
        <Spacer />
        {addNew && (
          <Box>
            <HStack spacing={12}>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                variant="solid"
                onClick={addNew}
              >
                Add New
              </Button>
            </HStack>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Title;
