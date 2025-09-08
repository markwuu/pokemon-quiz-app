import { FC, useState } from "react";
import "../App.css";

interface IProps {
  setNextButtonDisabled: (arg0: boolean) => void;
  nextButtonDisabled: boolean;
  progress: string;
  questionData: any;
  setSelectedOption: (arg0: number | null) => void;
  nextQuestion: () => void;
}

const Quiz: FC<IProps> = ({
  setNextButtonDisabled,
  nextButtonDisabled,
  questionData,
  progress,
  setSelectedOption,
  nextQuestion,
}) => {
  const options = questionData?.options;
  const pokemonCry = questionData?.cry;
  const [answer, setAnswer] = useState("");

  const handleClick = (option: string, index: number) => {
    setAnswer(option);
    setNextButtonDisabled(false);
    setSelectedOption(index);
  };

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
