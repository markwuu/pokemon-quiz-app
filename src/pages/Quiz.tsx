import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Difficulty } from "../types/Difficulty";
import { Question } from "../types/Question";

interface IProps {
  setNextButtonDisabled: (arg0: boolean) => void;
  nextButtonDisabled: boolean;
  prevButtonDisabled: boolean;
  progress: string;
  questionData: any;
  questions: Question[];
  setSelectedOption: (arg0: number | null) => void;
  prevQuestion: () => void;
  nextQuestion: () => void;
  difficultyLevel: Difficulty | null;
  inputValue: string;
  setInputValue: (arg0: string) => void;
  currentQuestion: number;
}

const Quiz: FC<IProps> = ({
  setNextButtonDisabled,
  nextButtonDisabled,
  prevButtonDisabled,
  questionData,
  progress,
  setSelectedOption,
  prevQuestion,
  nextQuestion,
  difficultyLevel,
  inputValue,
  setInputValue,
  questions,
  currentQuestion,
}) => {
  const options = questionData?.options;
  const pokemonCry = questionData?.cry;
  const pokemonDescription = questionData?.description;
  const [answer, setAnswer] = useState("");
  const multipleChoiceDifficulties = [Difficulty.Easy, Difficulty.Hard];
  const InputTextDifficulties = [Difficulty.Medium];
  const audioRef = useRef<any>(null);

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
    const selectedAnswer = questions[currentQuestion]?.selectedAnswer;
    if (selectedAnswer !== null && selectedAnswer >= 0) {
      setAnswer(questions[currentQuestion].options[selectedAnswer]);
      setSelectedOption(selectedAnswer);
      setNextButtonDisabled(false);
    } else {
      setAnswer("");
    }
  };

  const handleBackClick = () => {
    prevQuestion();
    if (currentQuestion !== 1) {
      const prevSelectedAnswer = questions[currentQuestion - 2]?.selectedAnswer;
      if (prevSelectedAnswer !== null) {
        const prevAnswer =
          questions[currentQuestion - 2].options[prevSelectedAnswer];
        setSelectedOption(prevSelectedAnswer);
        setAnswer(prevAnswer);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  if (!difficultyLevel) {
    return <p>difficulty not set...</p>;
  }

  const addInputClass = InputTextDifficulties.includes(difficultyLevel)
    ? "quiz-screen-input"
    : null;

  return (
    <div id="quiz-screen" className={`screen ${addInputClass}`}>
      <div>
        <div id="progress">{progress}</div>
        <div className="pokemon-card">
          {questionData?.image ? (
            <img
              alt={questionData?.options[answer]}
              src={questionData?.image}
            />
          ) : null}
          {pokemonCry ? (
            <>
              <audio ref={audioRef} src={pokemonCry} autoPlay={true}></audio>
              <figure>
                <button onClick={playAudio} name="play"></button>
              </figure>
            </>
          ) : null}
          {pokemonDescription ? (
            <>
              <p style={{ color: "black", padding: "0 20px" }}>
                {pokemonDescription}
              </p>
            </>
          ) : null}
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
          autoComplete="off"
          placeholder="Type your answer here..."
          maxLength={12}
        />
      ) : null}
      <div className="buttonContainer">
        <button
          type="submit"
          className="next-btn quiz-btn"
          disabled={prevButtonDisabled}
          onClick={handleBackClick}>
          Back
        </button>
        <button
          type="submit"
          className="next-btn quiz-btn"
          disabled={nextButtonDisabled}
          onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
