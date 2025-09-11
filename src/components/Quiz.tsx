import { ChangeEvent, FC, useEffect, useState } from "react";
import { Difficulty } from "../types/Question";

interface IProps {
  setNextButtonDisabled: (arg0: boolean) => void;
  nextButtonDisabled: boolean;
  progress: string;
  questionData: any;
  setSelectedOption: (arg0: number | null) => void;
  nextQuestion: () => void;
  difficultyLevel: Difficulty | null;
  inputValue: string;
  setInputValue: (arg0: string) => void;
}

const Quiz: FC<IProps> = ({
  setNextButtonDisabled,
  nextButtonDisabled,
  questionData,
  progress,
  setSelectedOption,
  nextQuestion,
  difficultyLevel,
  inputValue,
  setInputValue,
}) => {
  const options = questionData?.options;
  const pokemonCry = questionData?.cry;
  const [answer, setAnswer] = useState("");
  const multipleChoiceDifficulties = [Difficulty.Easy, Difficulty.Hard];
  const InputTextDifficulties = [Difficulty.Mediun];

  useEffect(() => {
    if (inputValue) {
      setNextButtonDisabled(false);
    }
  }, [inputValue, setNextButtonDisabled]);

  const handleClick = (option: string, index: number) => {
    setAnswer(option);
    setNextButtonDisabled(false);
    setSelectedOption(index);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNextClick = () => {
    nextQuestion();
    setInputValue("");
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
      {InputTextDifficulties.includes(difficultyLevel) ? (
        <input
          type="text"
          name="pokemonInput"
          value={inputValue}
          onChange={handleChange}
        />
      ) : null}
      <button
        type="submit"
        id="next-btn"
        disabled={nextButtonDisabled}
        onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
