import { FC, useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { Question } from "./types/Question";
import { createPokemonQuestionArray } from "./helperFunctions";

const App: FC = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<Question>();
  const [progress, setProgress] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  let finalScore = `${score} out of ${questions.length}`;

  const fetchPokemonQuestions = async () => {
    try {
      const pokemonQuestions = await createPokemonQuestionArray(10);
      const result = await pokemonQuestions;
      setQuestions(result);
      setStartButtonDisabled(false);
    } catch (err) {
      console.log("error fetching pokemon questions", err);
    }
  };

  useEffect(() => {
    fetchPokemonQuestions();
  }, []);

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
    setShowWelcomeScreen(false);
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
    setShowQuizScreen(false);
    setShowResultsScreen(false);
    setShowWelcomeScreen(true);
    setNextButtonDisabled(true);
    setProgress("");
    setSelectedOption(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuestions([]);
    setStartButtonDisabled(true);
    fetchPokemonQuestions();
  };

  let welcomeScreenActive = showWelcomeScreen ? "active" : "";
  let quizScreenActive = showQuizScreen ? "active" : "";
  let resultsScreenActive = showResultsScreen ? "active" : "";

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Welcome
            welcomeScreenActive={welcomeScreenActive}
            startButtonDisabled={startButtonDisabled}
            startQuiz={startQuiz}
          />
          <Quiz
            setNextButtonDisabled={setNextButtonDisabled}
            nextButtonDisabled={nextButtonDisabled}
            quizScreenActive={quizScreenActive}
            questionData={questionData}
            progress={progress}
            setSelectedOption={setSelectedOption}
            nextQuestion={nextQuestion}
          />
          <Results
            resultsScreenActive={resultsScreenActive}
            finalScore={finalScore}
            retartQuiz={retartQuiz}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
