import { FC, useState } from "react";
import "../App.css";
import { Difficulty } from "../types/Question";

interface IProps {
  setNextButtonDisabled: (arg0: boolean) => void;
  nextButtonDisabled: boolean;
  progress: string;
  questionData: any;
  setSelectedOption: (arg0: number | null) => void;
  nextQuestion: () => void;
  difficultyLevel: Difficulty | null;
}

const Quiz: FC<IProps> = ({
  setNextButtonDisabled,
  nextButtonDisabled,
  questionData,
  progress,
  setSelectedOption,
  nextQuestion,
  difficultyLevel,
}) => {
  const options = questionData?.options;
  const pokemonCry = questionData?.cry;
  const [answer, setAnswer] = useState("");
  const multipleChoiceDifficulties = [Difficulty.Easy, Difficulty.Hard];
  // const InputTextDifficulties = [Difficulty.Mediun];

  const handleClick = (option: string, index: number) => {
    setAnswer(option);
    setNextButtonDisabled(false);
    setSelectedOption(index);
  };

  if (!difficultyLevel) {
    return <p>difficulty not set...</p>;
  }

  return (
    <div id="quiz-screen" className={`screen`}>
      <div className="question-header">
        <div id="progress">{progress}</div>
        <div className="pokemon-card">
          <img
            alt={questionData?.options[answer]}
            src={questionData?.image}
            className="pokemon-card-image"
          />
          {pokemonCry ? (
            <audio src={pokemonCry} autoPlay={true} controls={true}></audio>
          ) : null}
          <div className="question-container">
            <p>Who's that pokemon?</p>
          </div>
        </div>
      </div>
      {multipleChoiceDifficulties.includes(difficultyLevel) ? (
        <div id="options" className="options">
          {options?.map((option: string, index: number) => {
            let className =
              answer === option ? "option-btn selected" : "option-btn";
            return (
              <button
                className={className}
                key={index}
                onClick={() => handleClick(option, index)}>
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
      <button
        id="next-btn"
        disabled={nextButtonDisabled}
        onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
