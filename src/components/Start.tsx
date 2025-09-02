import { FC, useEffect, useState } from "react";
import "../App.css";

interface IProps {
  startQuiz: () => void;
  quizDataLoaded: boolean;
}

const Start: FC<IProps> = ({ startQuiz, quizDataLoaded }) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Impossible"];
  const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (difficultyLevel !== null && quizDataLoaded) {
      setStartButtonDisabled(false);
    }
  }, [difficultyLevel, quizDataLoaded]);

  const handleClick = (option: string, index: number) => {
    setDifficultyLevel(option);
  };

  return (
    <>
      <div className={`screen`}>
        <h1 style={{ fontSize: "30px" }}>Test your Pokemon knowledge!</h1>
        <button
          onClick={startQuiz}
          id="start-btn"
          disabled={startButtonDisabled}>
          {quizDataLoaded ? "Start Quiz" : "Loading..."}
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
