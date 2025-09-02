import { FC, useState } from "react";
import "../App.css";

interface IProps {
  startQuiz: () => void;
  quizDataLoaded: boolean;
}

const Start: FC<IProps> = ({ startQuiz, quizDataLoaded }) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Impossible"];
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const handleClick = (option: string, index: number) => {
    setDifficultyLevel(option);
    // setNextButtonDisabled(false);
    // setSelectedOption(index);
  };

  //add logic to only enable start button once difficulty is selected
  const startButtonDisabled = !quizDataLoaded;

  return (
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
          let className =
            difficultyLevel === difficulty
              ? "difficulty-btn selected"
              : "difficulty-btn";
          return (
            <button
              onClick={() => handleClick(difficulty, index)}
              key={index}
              className={className}
              // disabled={startButtonDisabled}
            >
              {difficulty}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Start;
