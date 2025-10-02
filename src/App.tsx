import { FC, useState, useEffect, useCallback } from "react";
import "./App.css";
import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { Question } from "./types/Question";
import { createPokemonQuestionArray, encodeHTML } from "./helperFunctions";
import { ToastContainer, toast } from "react-toastify";
import {
  defaultDifficultySetting,
  Difficulty,
  IDifficultySetting,
} from "./types/Difficulty";
import Icon from "./components/SVG";
import { badges } from "./types/Pokemon";

const App: FC = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const [quizDataLoaded, setQuizDataLoaded] = useState<boolean>(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [prevButtonDisabled] = useState<boolean>(false);
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

  const perfectScore = score === questions.length;
  const size = 50;

  // useEffect(() => {
  //   console.log("start with 3 badges");
  //   localStorage.setItem("pokemonGymBadge", JSON.stringify(3));
  //   localStorage.setItem(
  //     "pokemonQuizDifficulty",
  //     JSON.stringify({ mediumDisabled: false, hardDisabled: true })
  //   );
  // }, []);
  // console.log(questionData?.name);

  const fetchPokemonQuestions = useCallback(
    async (difficulty: string, gymBadge: number) => {
      try {
        toast.loading("Loading quiz data...");
        const pokemonQuestions = await createPokemonQuestionArray(
          gymBadge + 1,
          difficulty
        );
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
        toast.success("Quiz data loaded successfully!", {
          autoClose: 500,
        });
      } catch (err) {
        console.log("error fetching pokemon questions", err);
      }
    },
    []
  );

  useEffect(() => {
    //checks localstorage to set or retrieve user settings
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

    const pokemonGymBadge = localStorage.getItem("pokemonGymBadge");
    if (pokemonGymBadge) {
      setGymBadge(JSON.parse(pokemonGymBadge));
    } else {
      const pokemonGymBadge = 0;
      localStorage.setItem("pokemonGymBadge", JSON.stringify(pokemonGymBadge));
      setGymBadge(0);
    }
  }, [difficultyLevel, gymBadge]);

  useEffect(() => {
    //keeps start button disabled before necessary values are loaded
    if (difficultyLevel !== null && quizDataLoaded) {
      setStartButtonDisabled(false);
    }
  }, [difficultyLevel, quizDataLoaded]);

  useEffect(() => {
    //fetches questions
    if (difficultyLevel && gymBadge !== undefined && gymBadge >= 0) {
      fetchPokemonQuestions(difficultyLevel, gymBadge);
    }
    const pokemonGymBadge = localStorage.getItem("pokemonGymBadge");
    if (pokemonGymBadge) {
      setGymBadge(JSON.parse(pokemonGymBadge));
    } else {
      const pokemonGymBadge = 0;
      localStorage.setItem("pokemonGymBadge", JSON.stringify(pokemonGymBadge));
      setGymBadge(0);
    }
  }, [difficultyLevel, fetchPokemonQuestions, gymBadge]);

  useEffect(() => {
    //updates user settings after quiz results
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

    let questionsCopy = [...questions];
    questionsCopy[currentQuestion - 1] = {
      ...questionsCopy[currentQuestion - 1],
      selectedAnswer: selectedOption,
      inputAnswer: inputValue,
    };
    setQuestions(questionsCopy);
    setNextButtonDisabled(true);

    const isCorrectMedium = questionData?.alternateNames.includes(
      encodeHTML(inputValue.toLowerCase().trim())
    );
    const isCorrectEasyHard = selectedOption === questionData?.answer;
    if ([Difficulty.Easy, Difficulty.Hard].includes(difficultyLevel)) {
      setAnswers((answers: any) => {
        return answers.map((obj: any, index: number) => {
          return {
            answer: obj.answer,
            correct:
              currentQuestion === index + 1 ? isCorrectEasyHard : obj.correct,
          };
        });
      });
    } else if ([Difficulty.Medium].includes(difficultyLevel)) {
      setAnswers((answers: any) => {
        return answers.map((obj: any, index: number) => {
          return {
            answer: obj.answer,
            correct:
              currentQuestion === index + 1 ? isCorrectMedium : obj.correct,
          };
        });
      });
    }

    //sets score
    if (currentQuestion === questions.length) {
      let currentNumberOfCorrectAnswers = 0;
      answers.forEach(
        (answer: { answer: string; correct: boolean | undefined }) => {
          if (answer.correct === true) {
            currentNumberOfCorrectAnswers += 1;
          }
        }
      );
      if ([Difficulty.Easy, Difficulty.Hard].includes(difficultyLevel)) {
        const finalScore = isCorrectEasyHard
          ? currentNumberOfCorrectAnswers + 1
          : currentNumberOfCorrectAnswers;
        setScore(finalScore);
      } else if ([Difficulty.Medium].includes(difficultyLevel)) {
        const finalScore = isCorrectMedium
          ? currentNumberOfCorrectAnswers + 1
          : currentNumberOfCorrectAnswers;
        console.log("answers", answers);
        setScore(finalScore);
      }
    }

    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion === 1) {
      restartQuiz();
    } else {
      setNextButtonDisabled(false);
      setCurrentQuestion(currentQuestion - 1);
      const prevQuestion = questions[currentQuestion - 2];
      setQuestionData(prevQuestion);
      setProgress(`${currentQuestion - 1} / ${questions.length}`);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    if (
      difficultyLevel === Difficulty.Hard &&
      perfectScore &&
      gymBadge !== undefined
    ) {
      setGymBadge(gymBadge + 1);
    }
    setInputValue("");
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

  if (gymBadge === undefined) return null;

  return (
    <div className="App">
      <div className="container">
        <div className="badge-container glow">
          {badges.map((badge, index) => {
            const gymBadgeNumber = index + 1;
            const styles =
              gymBadge >= gymBadgeNumber ? {} : { visibility: "hidden" };
            return <Icon name={badge} size={size} key={index} style={styles} />;
          })}
        </div>
        {showStartScreen && gymBadge !== undefined ? (
          <Start
            startQuiz={startQuiz}
            difficultyLevel={difficultyLevel}
            setDifficultyLevel={setDifficultyLevel}
            startButtonDisabled={startButtonDisabled}
            difficultySetting={difficultySetting}
          />
        ) : null}
        {showQuizScreen ? (
          <Quiz
            setNextButtonDisabled={setNextButtonDisabled}
            nextButtonDisabled={nextButtonDisabled}
            prevButtonDisabled={prevButtonDisabled}
            questionData={questionData}
            progress={progress}
            setSelectedOption={setSelectedOption}
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            difficultyLevel={difficultyLevel}
            inputValue={inputValue}
            setInputValue={setInputValue}
            questions={questions}
            currentQuestion={currentQuestion}
          />
        ) : null}
        {showResultsScreen && gymBadge !== undefined ? (
          <Results
            restartQuiz={restartQuiz}
            answers={answers}
            gymBadge={gymBadge}
            difficultyLevel={difficultyLevel}
          />
        ) : null}
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
