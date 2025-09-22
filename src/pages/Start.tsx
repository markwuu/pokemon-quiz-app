import { FC } from "react";
import { Difficulty, IDifficultySetting } from "../types/Difficulty";
import Icon from "../components/SVG";

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
    Difficulty.Medium,
    Difficulty.Hard,
  ];
  const size = 50;

  const handleClick = (option: Difficulty, index: number) => {
    setDifficultyLevel(option);
  };

  return (
    <>
      <div className="start-container">
        <div className="badge-container">
          <Icon name="boulder-badge" size={size} />
          <Icon name="cascade-badge" size={size} />
          <Icon name="thunder-badge" size={size} />
          <Icon name="rainbow-badge" size={size} />
          <Icon name="soul-badge" size={size} />
          <Icon name="marsh-badge" size={size} />
          <Icon name="volcano-badge" size={size} />
          <Icon name="earth-badge" size={size} />
        </div>
        <div className="screen">
          <div className="hero">
            <h1>POKEMON ACADEMY</h1>
            <h2>
              Test Your Knowledge by answering questions about your favorite
              pokemon. Unlock the next difficulty by achieving a perfect score.
            </h2>
          </div>
          <div id="difficulty-container" className={`screen`}>
            {difficultyLevels.map((difficulty, index) => {
              let isDisabled;
              if (difficulty === Difficulty.Medium) isDisabled = mediumDisabled;
              else if (difficulty === Difficulty.Hard)
                isDisabled = hardDisabled;

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
      </div>
    </>
  );
};

export default Start;
