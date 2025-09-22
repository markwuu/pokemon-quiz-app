import { FC } from "react";
import { Difficulty, IDifficultySetting } from "../types/Difficulty";
import Icon from "../components/SVG";

interface IProps {
  startQuiz: () => void;
  difficultyLevel: string | null;
  setDifficultyLevel: (arg0: Difficulty | null) => void;
  startButtonDisabled: boolean;
  difficultySetting: IDifficultySetting;
  gymBadge: number;
}

const Start: FC<IProps> = ({
  startQuiz,
  difficultyLevel,
  setDifficultyLevel,
  startButtonDisabled,
  difficultySetting,
  gymBadge,
}) => {
  const { mediumDisabled, hardDisabled } = difficultySetting;
  const difficultyLevels = [
    Difficulty.Easy,
    Difficulty.Medium,
    Difficulty.Hard,
  ];
  const badges: string[] = [
    "boulder-badge",
    "cascade-badge",
    "thunder-badge",
    "rainbow-badge",
    "soul-badge",
    "marsh-badge",
    "volcano-badge",
    "earth-badge",
  ];
  const size = 50;

  const handleClick = (option: Difficulty, index: number) => {
    setDifficultyLevel(option);
  };

  return (
    <>
      <div className="start-container">
        <div className="badge-container glow">
          {badges.map((badge, index) => {
            const gymBadgeNumber = index + 1;
            const styles =
              gymBadge >= gymBadgeNumber ? {} : { visibility: "hidden" };
            return <Icon name={badge} size={size} key={index} style={styles} />;
          })}
        </div>
        <div className="screen">
          <div className="hero">
            <h1>POKEMON ACADEMY</h1>
            <h2>
              Test yourself by answering questions about your favorite pokemon.
              Aim for a perfect score to unlock difficulties and earn gym
              badges!
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
