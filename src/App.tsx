import { FC, useState, useEffect, useCallback } from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { Question } from "./types/Question";
import { createPokemonQuestionArray } from "./helperFunctions";
import { ToastContainer, toast } from "react-toastify";

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
  const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (difficultyLevel !== null && quizDataLoaded) {
      setStartButtonDisabled(false);
    }
  }, [difficultyLevel, quizDataLoaded]);

  let finalScore = `${score} out of ${questions.length}`;
  const perfectScore = score === questions.length;

  // const displayToast = (message: string) => toast(message);

  const fetchPokemonQuestions = useCallback(async () => {
    try {
      toast.loading("Loading quiz data...");
      const pokemonQuestions = await createPokemonQuestionArray(5);
      const result = await pokemonQuestions;
      setQuestions(result);
      setQuizDataLoaded(true);
      toast.dismiss();
      toast.success("Quiz data loaded successfully!");
    } catch (err) {
      console.log("error fetching pokemon questions", err);
    }
  }, []);

  useEffect(() => {
    if (difficultyLevel) {
      fetchPokemonQuestions();
    }
  }, [difficultyLevel, fetchPokemonQuestions]);

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
    if (selectedOption === questionData?.answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  const retartQuiz = () => {
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
          {showStartScreen ? (
            <Start
              quizDataLoaded={quizDataLoaded}
              startQuiz={startQuiz}
              difficultyLevel={difficultyLevel}
              setDifficultyLevel={setDifficultyLevel}
              startButtonDisabled={startButtonDisabled}
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
            />
          ) : null}
          {showResultsScreen ? (
            <Results
              finalScore={finalScore}
              retartQuiz={retartQuiz}
              perfectScore={perfectScore}
            />
          ) : null}
        </div>
      </header>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
