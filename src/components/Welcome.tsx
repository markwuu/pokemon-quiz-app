import { FC } from "react";
import "../App.css";

interface IProps {
  startQuiz: () => void;
  startButtonDisabled: boolean;
}

const Welcome: FC<IProps> = ({ startQuiz, startButtonDisabled }) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Impossible"];

  return (
    // Welcome Screen
    <>
      <div className={`screen`}>
        <h1 style={{ fontSize: "30px" }}>Test your Pokemon knowledge!</h1>
        <button
          onClick={startQuiz}
          id="start-btn"
          disabled={startButtonDisabled}>
          Start Quiz
        </button>
      </div>
      <div id="difficulty-container" className={`screen`}>
        {difficultyLevels.map((difficulty, index) => {
          return (
            <button
              onClick={() => {
                console.log("selecting difficulty");
              }}
              key={index}
              id="difficulty-btn"
              disabled={startButtonDisabled}>
              {difficulty}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Welcome;
