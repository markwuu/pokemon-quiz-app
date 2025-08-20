import { FC } from "react";
import "../App.css";

interface IProps {
  resultsScreenActive: string;
  finalScore: string;
  retartQuiz: () => void;
}

const Results: FC<IProps> = ({
  resultsScreenActive,
  finalScore,
  retartQuiz,
}) => {
  return (
    // Results Screen
    <div id="result-screen" className={`screen ${resultsScreenActive}`}>
      <h2>Your Score:</h2>
      <p id="score-text">{finalScore}</p>
      <button id="restart-btn" onClick={retartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
