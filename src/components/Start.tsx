import { FC } from "react";
import { Difficulty, IDifficultySetting } from "../types/Difficulty";

interface IProps {
  startQuiz: () => void;
  difficultyLevel: string | null;
  setDifficultyLevel: (arg0: Difficulty | null) => void;
  startButtonDisabled: boolean;
  difficultySetting: IDifficultySetting;
}

const Start: FC<IProps> = ({
  startQuiz,
  difficultyLevel,
  setDifficultyLevel,
  startButtonDisabled,
  difficultySetting,
}) => {
  const { mediumDisabled, hardDisabled } = difficultySetting;

  const difficultyLevels = [
    Difficulty.Easy,
    Difficulty.Mediun,
    Difficulty.Hard,
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
            let isDisabled;
            if (difficulty === Difficulty.Mediun) isDisabled = mediumDisabled;
            else if (difficulty === Difficulty.Hard) isDisabled = hardDisabled;

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
            className="next-btn"
            disabled={startButtonDisabled}>
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default Start;
