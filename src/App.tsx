import { FC, useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { Question } from "./types/Question";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Lisbon"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: 1,
  },
  {
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;

const App: FC = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<Question>();
  const [progress, setProgress] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const showQuiz = () => {
    setShowQuizScreen(true);
  };

  const showQuestion = () => {
    const q = questions[currentQuestion];
    setQuestionData(q);
    setProgress(`${currentQuestion + 1} / ${questions.length}`);
  };

  const startQuiz = () => {
    setShowWelcomeScreen(false);
    showQuiz();
    showQuestion();
  };

  let welcomeScreenActive = showWelcomeScreen ? "active" : "";
  let quizScreenActive = showQuizScreen ? "active" : "";

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Welcome
            welcomeScreenActive={welcomeScreenActive}
            startQuiz={startQuiz}
          />
          <Quiz
            setNextButtonDisabled={setNextButtonDisabled}
            nextButtonDisabled={nextButtonDisabled}
            quizScreenActive={quizScreenActive}
            questionData={questionData}
            progress={progress}
            setSelectedOption={setSelectedOption}
          />
          <Results />
        </div>
      </header>
    </div>
  );
};

export default App;
