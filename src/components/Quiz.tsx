import { FC, useState } from "react";
import "../App.css";

interface IProps {
  setNextButtonDisabled: (arg0: boolean) => void;
  nextButtonDisabled: boolean;
  quizScreenActive: string;
  progress: string;
  questionData: any;
  setSelectedOption: (arg0: number | null) => void;
}

const Quiz: FC<IProps> = ({
  setNextButtonDisabled,
  nextButtonDisabled,
  quizScreenActive,
  questionData,
  progress,
  setSelectedOption,
}) => {
  const options = questionData?.options;
  const [answer, setAnswer] = useState("");

  const handleClick = (option: string, index: number) => {
    setAnswer(option);
    setNextButtonDisabled(false);
    setSelectedOption(index);
  };

  return (
    <div id="quiz-screen" className={`screen ${quizScreenActive}`}>
      <div className="question-header">
        <h2 id="question-text">{questionData?.question}</h2>
        <div id="progress">{progress}</div>
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
      <button id="next-btn" disabled={nextButtonDisabled}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
