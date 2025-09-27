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
        <>
          {badges.map((badge, index) =>
            gymBadge === index ? (
              <div className="congrats" key={index}>
                <h1>{`Congratulations! You earned the ${badge.charAt(0).toUpperCase()}${badge.replace("-", " ").slice(1)}.`}</h1>
                <Icon name={badge} size={95} style={{}} />
              </div>
            ) : null
          )}
        </>
      ) : null}
      {perfectScore && difficultyLevel !== Difficulty.Hard ? (
        <h1>{`Wow! Perfect score!`}</h1>
      ) : null}
      {!perfectScore ? <h1>{`Oh! You almost had it ;)`}</h1> : null}
      <h2>Your Score: [{finalScore}]</h2>
      {answers?.map(({ answer, correct }: Answer, index: number) => {
        return (
          <p key={index}>
            {index + 1}.{` ${answer} `} {correct ? "✅" : "❌"}
          </p>
        );
      })}
      <button className="next-btn" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
