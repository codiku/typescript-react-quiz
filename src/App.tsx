import { useEffect, useState } from "react";
import "../global.css";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
  Steps,
} from "./types/quiz.type";
import { Box, Flex, Image } from "@chakra-ui/react";
import { QuizSetQuestionsQty } from "./features/QuizSetQuestionsQty";
import { QuizSetCategory } from "./features/QuizSetCategory";
import { QuizPlay } from "./features/QuizPlay";
import BubbleImg from "./assets/bubble.png";
import { QuizAPI } from "./api/quiz-api";
import { QuizSetDifficulty } from "./features/QuizSetDifficulty";
import { QuizScore } from "./features/QuizScore";
import logoImg from "./assets/logo.png";
export default function App() {
  const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Mutiple,
  });

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [step, setStep] = useState<Steps>(Steps.SetQtyQuestions);
  const [history, setHistory] = useState<boolean[]>([]);

  useEffect(() => {
    (async () => {
      setQuizCategories([
        { id: "", name: "A bit of everything" },
        ...(await QuizAPI.fetchQuizCategories()),
      ]);
    })();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h={"24"} src={logoImg} />
    </Flex>
  );

  const renderStep = () => {
    switch (step) {
      case Steps.SetQtyQuestions:
        return (
          <QuizSetQuestionsQty
            onNext={(qty: number) => {
              setQuizParams({ ...quizParams, amount: qty });
              setStep(Steps.SetCategory);
            }}
          />
        );
      case Steps.SetCategory:
        return (
          <QuizSetCategory
            onNext={async (categoryId: string) => {
              setQuizParams({ ...quizParams, category: categoryId });
              setStep(Steps.SetDifficulty);
            }}
            categories={quizCategories}
          />
        );
      case Steps.SetDifficulty:
        return (
          <QuizSetDifficulty
            onNext={async (difficulty: QuizDifficulty) => {
              const params: FetchQuizParams = {
                ...quizParams,
                difficulty:
                  difficulty === QuizDifficulty.Mixed ? "" : difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length === 0) {
                alert("No quiz found with these parameters, restarting game");
                setStep(Steps.SetQtyQuestions);
              } else {
                setQuizItems(quizResp);
                setStep(Steps.Play);
              }
            }}
          />
        );
      case Steps.Play:
        return (
          <QuizPlay
            onFinished={(history: boolean[]) => {
              setHistory(history);
              setStep(Steps.Score);
            }}
            questions={quizItems}
          />
        );
      case Steps.Score:
        return (
          <QuizScore
            history={history}
            onNext={() => {
              setStep(Steps.SetQtyQuestions);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box py={"10"} h="100%">
      {header}
      <Image
        src={BubbleImg}
        zIndex={-1}
        position="absolute"
        right={-120}
        top={100}
      />
      <Box mt={100}>{renderStep()}</Box>
    </Box>
  );
}
