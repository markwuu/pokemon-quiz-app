import { FC } from "react";
import "../App.css";

interface IProps {
  resultsScreenActive: string;
  finalScore: string;
  retartQuiz: () => void;
  perfectScore: boolean;
}

const Results: FC<IProps> = ({
  resultsScreenActive,
  finalScore,
  retartQuiz,
  perfectScore,
}) => {
  return (
    // Results Screen
    <div id="result-screen" className={`screen ${resultsScreenActive}`}>
      {perfectScore ? (
        <h1>{`Congratulations! You're a Pokemon Master!`}</h1>
      ) : null}
      <h2>Your Score:</h2>
      <p id="score-text">{finalScore}</p>
      <button id="restart-btn" onClick={retartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
