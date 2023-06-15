import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import ChakraSlider from "../components/Slider";
import { useState } from "react";

const DEFAULT_QTY = 10;

interface Props {
  onNext: (questionQty: number) => void;
}

export function QuizSetQuestionsQty(p: Props) {
  const [questionQty, setQuestionQty] = useState<number>(DEFAULT_QTY);
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mb={20}>
          How many questions?
        </Heading>
        <Box>
          <ChakraSlider
            onChange={setQuestionQty}
            defaultValue={DEFAULT_QTY}
            min={5}
            max={30}
            step={5}
          />
        </Box>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={150} top={"60%"}>
        <Button
          onClick={() => p.onNext(questionQty)}
          rightIcon={<ArrowForwardIcon />}
        >
          Set category
        </Button>
      </Flex>
    </>
  );
}
