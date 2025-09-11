import { FC } from "react";

interface IProps {
  finalScore: string;
  retartQuiz: () => void;
  perfectScore: boolean;
}

const Results: FC<IProps> = ({ finalScore, retartQuiz, perfectScore }) => {
  return (
    // Results Screen
    <div id="result-screen" className={`screen`}>
      {perfectScore ? (
        <h1>{`Congratulations! You're a Pokemon Master!`}</h1>
      ) : null}
      <h2>Your Score:</h2>
      <p>{finalScore}</p>
      <button id="restart-btn" onClick={retartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
