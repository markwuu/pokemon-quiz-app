interface IProps {
  name: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled: boolean;
  className: string;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({
  name,
  type = "submit",
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
