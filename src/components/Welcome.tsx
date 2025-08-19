import { FC } from "react";
import "../App.css";

interface IProps {
  welcomeScreenActive: string;
  startQuiz: () => void;
}

const Welcome: FC<IProps> = ({ welcomeScreenActive, startQuiz }) => {
  return (
    // Welcome Screen
    <div id="welcome-screen" className={`screen ${welcomeScreenActive}`}>
      <h1>Welcome to the Quiz!</h1>
      <button onClick={startQuiz} id="start-btn">
        Start Quiz
      </button>
    </div>
  );
};

export default Welcome;
