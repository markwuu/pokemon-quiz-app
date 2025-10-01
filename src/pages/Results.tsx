import { FC } from "react";
import { Difficulty } from "../types/Difficulty";
import Icon from "../components/SVG";
import { badges } from "../types/Pokemon";

interface IProps {
  restartQuiz: () => void;
  answers: Answer[];
  gymBadge: number;
  difficultyLevel: string | null;
}

export interface Answer {
  answer: string;
  correct: boolean | undefined;
}

const Results: FC<IProps> = ({
  restartQuiz,
  answers,
  gymBadge,
  difficultyLevel,
}) => {
  const imperfectScore = answers.some((answer) => answer.correct === false);
  const finalScore = () => {
    let numberOfCorrectAnswers = 0;
    answers.forEach((answer) => {
      if (answer.correct === true) {
        numberOfCorrectAnswers++;
      }
    });
    return `${numberOfCorrectAnswers} out of ${answers.length}`;
  };

  return (
    <div id="result-screen" className={`screen`}>
      {!imperfectScore && difficultyLevel === Difficulty.Hard ? (
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
      {!imperfectScore && difficultyLevel !== Difficulty.Hard ? (
        <h1>{`Wow! Perfect score!`}</h1>
      ) : null}
      {imperfectScore ? <h1>{`Oh! You almost had it ;)`}</h1> : null}
      <h2>Your Score: [{finalScore()}]</h2>
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
