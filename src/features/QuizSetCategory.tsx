/* @todo Add a description */

import { QuizCategory } from "../types/quiz.type";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  categories: QuizCategory[];
  onNext: (categoryId: string) => void;
}
export function QuizSetCategory(p: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioCardList = p.categories.map((category) => {
    return (
      <GridItem key={category.id}>
        <Radio value={category.id.toString()}>{category.name}</Radio>
      </GridItem>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mb={10}>
          Which topic?
        </Heading>
        <RadioGroup
          onChange={(categoryId: string) => {
            setSelectedCategoryId(categoryId);
          }}
          value={selectedCategoryId}
        >
          <SimpleGrid columns={[1, 3, 4]} mt={"30"} gap={4}>
            {radioCardList}
          </SimpleGrid>
        </RadioGroup>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={150} top={"60%"}>
        <Button
          onClick={() => p.onNext(selectedCategoryId)}
          rightIcon={<ArrowForwardIcon />}
        >
          Set difficulty
        </Button>
      </Flex>
    </>
  );
}
