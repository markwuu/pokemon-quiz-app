import { FC } from "react";
import { Difficulty } from "../types/Difficulty";

interface IProps {
  finalScore: string;
  restartQuiz: () => void;
  perfectScore: boolean;
  answers: Answer[];
  gymBadge: number;
  difficultyLevel: string | null;
}

interface Answer {
  answer: string;
  correct: boolean | undefined;
}

const Results: FC<IProps> = ({
  finalScore,
  restartQuiz,
  perfectScore,
  answers,
  gymBadge,
  difficultyLevel,
}) => {
  console.log("🚀 ~ Results ~ gymBadge:", gymBadge);
  return (
    <div id="result-screen" className={`screen`}>
      {perfectScore && difficultyLevel === Difficulty.Hard ? (
        <h1>{`Congratulations! You earned a gym badge!`}</h1>
      ) : null}
      {perfectScore && difficultyLevel !== Difficulty.Hard ? (
        <h1>{`Good job! You got all of them right.`}</h1>
      ) : null}
      <h2>Your Score: [{finalScore}]</h2>
      <div>
        {answers?.map(({ answer, correct }: Answer, index: number) => {
          return (
            <p key={index}>
              {index + 1}.{` ${answer} `} {correct ? "✅" : "❌"}
            </p>
          );
        })}
      </div>
      <button className="next-btn" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
