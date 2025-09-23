import { FC, useState, useEffect, useCallback } from "react";
import "./App.css";
import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { Question } from "./types/Question";
import { createPokemonQuestionArray } from "./helperFunctions";
import { ToastContainer, toast } from "react-toastify";
import {
  defaultDifficultySetting,
  Difficulty,
  IDifficultySetting,
} from "./types/Difficulty";

const App: FC = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const [quizDataLoaded, setQuizDataLoaded] = useState<boolean>(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<Question>();
  const [progress, setProgress] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty | null>(
    null
  );
  const [difficultySetting, setDifficultySetting] =
    useState<IDifficultySetting>(defaultDifficultySetting);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<any>([]);
  const [gymBadge, setGymBadge] = useState<number | undefined>(undefined);

  const finalScore = `${score} out of ${questions.length}`;
  const perfectScore = score === questions.length;

  const fetchPokemonQuestions = useCallback(async (difficulty: string) => {
    try {
      toast.loading("Loading quiz data...");
      const pokemonQuestions = await createPokemonQuestionArray(3, difficulty);
      const result = await pokemonQuestions;
      const answerArray = result.map((question) => {
        return {
          answer: question.options[question.answer],
          correct: undefined,
        };
      });
      setAnswers(answerArray);
      setQuestions(result);
      setQuizDataLoaded(true);
      toast.dismiss();
      toast.success("Quiz data loaded successfully!");
    } catch (err) {
      console.log("error fetching pokemon questions", err);
    }
  }, []);

  useEffect(() => {
    const pokemonQuizDifficulty = localStorage.getItem("pokemonQuizDifficulty");
    if (pokemonQuizDifficulty) {
      setDifficultySetting(JSON.parse(pokemonQuizDifficulty));
    } else {
      const pokemonQuizDifficulty = {
        mediumDisabled: true,
        hardDisabled: true,
      };
      localStorage.setItem(
        "pokemonQuizDifficulty",
        JSON.stringify(pokemonQuizDifficulty)
      );
    }
  }, [difficultyLevel]);

  useEffect(() => {
    const pokemonGymBadge = localStorage.getItem("pokemonGymBadge");
    if (pokemonGymBadge) {
      setGymBadge(JSON.parse(pokemonGymBadge));
    } else {
      const pokemonGymBadge = 0;
      localStorage.setItem("pokemonGymBadge", JSON.stringify(pokemonGymBadge));
      setGymBadge(0);
    }
  }, []);

  useEffect(() => {
    if (difficultyLevel !== null && quizDataLoaded) {
      setStartButtonDisabled(false);
    }
  }, [difficultyLevel, quizDataLoaded]);

  useEffect(() => {
    if (difficultyLevel) fetchPokemonQuestions(difficultyLevel);
  }, [difficultyLevel, fetchPokemonQuestions]);

  useEffect(() => {
    const updateUserStorageSettings = () => {
      if (difficultyLevel === Difficulty.Easy && perfectScore) {
        localStorage.setItem(
          "pokemonQuizDifficulty",
          JSON.stringify({ ...difficultySetting, mediumDisabled: false })
        );
      } else if (difficultyLevel === Difficulty.Medium && perfectScore) {
        localStorage.setItem(
          "pokemonQuizDifficulty",
          JSON.stringify({ ...difficultySetting, hardDisabled: false })
        );
      } else if (
        difficultyLevel === Difficulty.Hard &&
        perfectScore &&
        gymBadge !== undefined
      ) {
        localStorage.setItem(
          "pokemonQuizDifficulty",
          JSON.stringify({ mediumDisabled: true, hardDisabled: true })
        );
        localStorage.setItem("pokemonGymBadge", JSON.stringify(gymBadge + 1));
      }
    };
    if (questions.length > 0 && score === questions.length)
      updateUserStorageSettings();
  }, [
    difficultyLevel,
    difficultySetting,
    gymBadge,
    perfectScore,
    questions.length,
    score,
  ]);

  //proba bly have to do a useeffect

  const showQuiz = () => {
    setShowQuizScreen(true);
  };

  const showQuestion = () => {
    const q = questions[currentQuestion];
    setQuestionData(q);
    setProgress(`${currentQuestion + 1} / ${questions.length}`);
    setCurrentQuestion(currentQuestion + 1);
  };

  const startQuiz = () => {
    toast.dismiss();
    setShowStartScreen(false);
    showQuiz();
    showQuestion();
  };

  const showResult = () => {
    setShowQuizScreen(false);
    setShowResultsScreen(true);
  };

  const nextQuestion = () => {
    if (!difficultyLevel) throw Error("Difficulty not set");

    setNextButtonDisabled(true);
    if ([Difficulty.Easy, Difficulty.Hard].includes(difficultyLevel)) {
      if (selectedOption === questionData?.answer) {
        setScore(score + 1);
        setAnswers((answers: any) => {
          return answers.map((obj: any, index: number) => {
            return {
              answer: obj.answer,
              correct: currentQuestion === index + 1 ? true : obj.correct,
            };
          });
        });
      } else {
        setAnswers((answers: any) => {
          return answers.map((obj: any, index: number) => {
            return {
              answer: obj.answer,
              correct: currentQuestion === index + 1 ? false : obj.correct,
            };
          });
        });
      }
    } else if ([Difficulty.Medium].includes(difficultyLevel)) {
      const containsCorrectAnswer =
        questionData?.alternateNames.includes(inputValue);
      if (containsCorrectAnswer) {
        setAnswers((answers: any) => {
          return answers.map((obj: any, index: number) => {
            return {
              answer: obj.answer,
              correct: currentQuestion === index + 1 ? true : obj.correct,
            };
          });
        });
        setScore(score + 1);
      }
    }

    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  const restartQuiz = () => {
    if (
      difficultyLevel === Difficulty.Hard &&
      perfectScore &&
      gymBadge !== undefined
    ) {
      // setGymBadge((prevGymBadge) =>
      //   prevGymBadge ? prevGymBadge + 1 : gymBadge
      // );
      setGymBadge(gymBadge + 1);
    }
    setStartButtonDisabled(true);
    setDifficultyLevel(null);
    setShowQuizScreen(false);
    setShowResultsScreen(false);
    setShowStartScreen(true);
    setNextButtonDisabled(true);
    setProgress("");
    setSelectedOption(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuestions([]);
    setQuizDataLoaded(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {showStartScreen && gymBadge !== undefined ? (
            <Start
              startQuiz={startQuiz}
              difficultyLevel={difficultyLevel}
              setDifficultyLevel={setDifficultyLevel}
              startButtonDisabled={startButtonDisabled}
              difficultySetting={difficultySetting}
              gymBadge={gymBadge}
            />
          ) : null}
          {showQuizScreen ? (
            <Quiz
              setNextButtonDisabled={setNextButtonDisabled}
              nextButtonDisabled={nextButtonDisabled}
              questionData={questionData}
              progress={progress}
              setSelectedOption={setSelectedOption}
              nextQuestion={nextQuestion}
              difficultyLevel={difficultyLevel}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          ) : null}
          {showResultsScreen && gymBadge !== undefined ? (
            <Results
              finalScore={finalScore}
              restartQuiz={restartQuiz}
              perfectScore={perfectScore}
              answers={answers}
              gymBadge={gymBadge}
              difficultyLevel={difficultyLevel}
            />
          ) : null}
        </div>
      </header>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
