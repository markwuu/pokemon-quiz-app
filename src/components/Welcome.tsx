import { FC } from "react";
import "../App.css";

interface IProps {
  welcomeScreenActive: string;
  startQuiz: () => void;
  startButtonDisabled: boolean;
}

const Welcome: FC<IProps> = ({
  welcomeScreenActive,
  startQuiz,
  startButtonDisabled,
}) => {
  return (
    // Welcome Screen
    <div id="welcome-screen" className={`screen ${welcomeScreenActive}`}>
      <h1 style={{ fontSize: "30px" }}>Test your Pokemon knowledge!</h1>
      <button onClick={startQuiz} id="start-btn" disabled={startButtonDisabled}>
        Start Quiz
      </button>
    </div>
  );
};

export default Welcome;
