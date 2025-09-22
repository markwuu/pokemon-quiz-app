import { FC } from "react";

interface IProps {
  finalScore: string;
  retartQuiz: () => void;
  perfectScore: boolean;
  answers: Answer[];
}

interface Answer {
  answer: string;
  correct: boolean | undefined;
}

const Results: FC<IProps> = ({
  finalScore,
  retartQuiz,
  perfectScore,
  answers,
}) => {
  return (
    <div id="result-screen" className={`screen`}>
      {perfectScore ? (
        <h1>
          {`Congratulations!`}
          <br />
          {`You're a Pokemon Master!`}
        </h1>
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
      <button className="next-btn" onClick={retartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
