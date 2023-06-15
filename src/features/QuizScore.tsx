import { Button, Flex, Heading, Text } from "@chakra-ui/react";

interface Props {
  history: boolean[];
  onNext: () => void;
}
export function QuizScore(p: Props) {
  const rightAnswersCount = p.history.filter((h) => h === true).length;
  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswersCount * 100) / p.history.length;
    if (rightAnswerPercentage < 30) {
      return "You need more practice !";
    } else if (rightAnswerPercentage < 50) {
      return "Not bad ! Keep training you'r getting better!";
    } else if (rightAnswerPercentage < 75) {
      return "Good job!";
    } else {
      return "Woah! You did amazing !";
    }
  };
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"}>
          Score
        </Heading>
        <Heading fontSize={"xl"} mt={5}>
          {rightAnswersCount}/{p.history.length}
        </Heading>
        <Text fontWeight={"bold"} mt={20}>
          {renderMessage()}
        </Text>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={150} top={"60%"}>
        <Button onClick={p.onNext}>New game</Button>
      </Flex>
    </>
  );
}
