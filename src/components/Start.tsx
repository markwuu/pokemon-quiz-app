import { FC } from "react";
import "../App.css";

interface IProps {
  startQuiz: () => void;
  quizDataLoaded: boolean;
  difficultyLevel: string | null;
  setDifficultyLevel: (arg0: string | null) => void;
  startButtonDisabled: boolean;
}

const Start: FC<IProps> = ({
  startQuiz,
  quizDataLoaded,
  difficultyLevel,
  setDifficultyLevel,
  startButtonDisabled,
}) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Impossible"];

  const handleClick = (option: string, index: number) => {
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
          {/* {quizDataLoaded ? "Start Quiz" : "Loading..."} */}
          Start Quiz
        </button>
      </div>
      <div id="difficulty-container" className={`screen`}>
        {difficultyLevels.map((difficulty, index) => {
          let className =
            difficultyLevel === difficulty
              ? "difficulty-btn selected"
              : "difficulty-btn";
          return (
            <button
              onClick={() => handleClick(difficulty, index)}
              key={index}
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
