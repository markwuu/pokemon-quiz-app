import { FC } from "react";
import { Difficulty } from "../types/Question";

interface IProps {
  startQuiz: () => void;
  quizDataLoaded: boolean;
  difficultyLevel: string | null;
  setDifficultyLevel: (arg0: Difficulty | null) => void;
  startButtonDisabled: boolean;
}

const Start: FC<IProps> = ({
  startQuiz,
  quizDataLoaded,
  difficultyLevel,
  setDifficultyLevel,
  startButtonDisabled,
}) => {
  const difficultyLevels = [
    Difficulty.Easy,
    Difficulty.Mediun,
    Difficulty.Hard,
    // Difficulty.Impossible,
  ];

  const handleClick = (option: Difficulty, index: number) => {
    setDifficultyLevel(option);
  };

  return (
    <>
      <div className="screen">
        <div className="hero">
          <h1>THE POKEMON ACADEMY</h1>
          <h2>
            Test Your Knowledge by answering questions about your favorite
            pokemon. Unlock the next difficulty by achieving a perfect score.
          </h2>
        </div>

        <div id="difficulty-container" className={`screen`}>
          {difficultyLevels.map((difficulty, index) => {
            let isDisabled = difficulty === Difficulty.Impossible;
            let className =
              difficultyLevel === difficulty
                ? "difficulty-btn selected"
                : "difficulty-btn";
            return (
              <button
                onClick={() => handleClick(difficulty, index)}
                key={index}
                disabled={isDisabled}
                className={className}>
                {difficulty}
              </button>
            );
          })}
          <button
            onClick={startQuiz}
            id="start-btn"
            disabled={startButtonDisabled}>
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default Start;
