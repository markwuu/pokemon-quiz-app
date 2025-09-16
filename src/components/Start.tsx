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
      <div className={`screen`}>
        <h1>Test your Pokemon knowledge!</h1>
        <button
          onClick={startQuiz}
          id="start-btn"
          disabled={startButtonDisabled}>
          Start Quiz
        </button>
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
      </div>
    </>
  );
};

export default Start;
