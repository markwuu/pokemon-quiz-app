import { FC } from "react";
import { Difficulty } from "../types/Difficulty";
import Icon from "../components/SVG";
import { badges } from "../types/Pokemon";

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
  return (
    <div id="result-screen" className={`screen`}>
      {perfectScore && difficultyLevel === Difficulty.Hard ? (
        <div className="congrats">
          {badges.map((badge, index) =>
            gymBadge === index ? (
              <>
                <h1>{`Congratulations! You earned the ${badge.charAt(0).toUpperCase()}${badge.replace("-", " ").slice(1)}.`}</h1>
                <Icon name={badge} size={50} key={index} style={{}} />
              </>
            ) : null
          )}
        </div>
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
