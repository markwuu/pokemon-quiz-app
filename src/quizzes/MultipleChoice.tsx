interface IProps {
  answer: string;
  questionData: any;
  handleClick: (arg0: string, arg1: number) => void;
}

const MultipleChoice: React.FC<IProps> = ({
  answer,
  questionData,
  handleClick,
}) => {
  const { options } = questionData;

  return (
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
  );
};

export default MultipleChoice;
