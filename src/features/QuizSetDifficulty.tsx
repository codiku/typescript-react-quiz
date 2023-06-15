import { QuizDifficulty } from "../types/quiz.type";
import {
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  onNext: (selectedDifficulty: QuizDifficulty) => void;
}
export function QuizSetDifficulty(p: Props) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  const radioList = Object.values(QuizDifficulty).map((diff) => {
    return (
      <Radio key={diff} value={diff}>
        <span style={{ textTransform: "capitalize" }}> {diff}</span>
      </Radio>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mb={20}>
          Which difficulty?
        </Heading>
        <RadioGroup
          onChange={(difficulty: QuizDifficulty) => {
            setSelectedDifficulty(difficulty);
          }}
          value={selectedDifficulty}
        >
          <VStack>{radioList}</VStack>
        </RadioGroup>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={150} top={"60%"}>
        <Button
          onClick={() => p.onNext(selectedDifficulty)}
          rightIcon={<ArrowForwardIcon />}
        >
          Play
        </Button>
      </Flex>
    </>
  );
}
