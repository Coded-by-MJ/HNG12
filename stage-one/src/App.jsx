import { MdOutlineQuestionMark } from "react-icons/md";
import { useState, useRef } from "react";

function updateHighScore(lastScore, highScore) {
  if (lastScore > highScore) {
    localStorage.setItem("highScore", lastScore);
    return lastScore;
  }

  return highScore;
}

const colorArray = [
  "#FF0000",
  "#008000",
  "#0000FF",
  "#FFFF00",
  "#800080",
  "#FFA500",
];

function App() {
  const colorRef = useRef(colorArray[0]);

  const [scoreBoard, setScoreBoard] = useState({
    score: 0,
    highScore: parseInt(localStorage.getItem("highScore")) || 0,
  });
  const [isCorrect, setIsCorrect] = useState(null);
  const [showOrHideColorBox, setShowOrHideColorBox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const randomIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const updateColorBox = () => {
    const newColorIndex = randomIndex(0, colorArray.length - 1);
    const newColor = colorArray[newColorIndex];
    colorRef.current = newColor;
  };

  const handleColorOptionClick = (colorOption) => {
    setShowOrHideColorBox(true);
    setSelectedColor(colorOption);

    if (colorRef.current === colorOption) {
      const score = scoreBoard.score + 1;
      const newHighScore = updateHighScore(score, scoreBoard.highScore);
      setScoreBoard((prev) => {
        return {
          ...prev,
          score,
          highScore: newHighScore,
        };
      });
      setIsCorrect(true);
    } else {
      setScoreBoard((prev) => {
        return {
          ...prev,
          score: 0,
        };
      });
      setIsCorrect(false);
    }
  };

  const handleStartBtnClick = () => {
    updateColorBox();
    setShowOrHideColorBox(false);
    setIsCorrect(null);
    setSelectedColor(null);
  };

  return (
    <section className="container">
      <h1>Color Guessing Game!</h1>

      <div className="colorBoxWrapper">
        <div
          data-testid="colorBox"
          style={{
            backgroundColor: colorRef.current,
          }}
        ></div>
        <div
          className={`questionMark
            ${showOrHideColorBox ? `fadeOut` : ``}`}
        >
          <MdOutlineQuestionMark />
        </div>
      </div>

      <h2
        data-testid="gameStatus"
        className={isCorrect === null ? "fadeOut" : ""}
        style={{ color: isCorrect ? "green" : "red" }}
      >
        {isCorrect ? "Correct!🎊🎊" : isCorrect === null ? "" : "Wrong!😞😞"}
      </h2>

      <div className="scoreWrapper">
        <div className="highScore">High Score: {scoreBoard.highScore}</div>
        <div className="scoreStatus" data-testid="score">
          Score: {scoreBoard.score}
        </div>
      </div>

      <p data-testid="gameInstructions">
        Click on a color box to guess the hidden color!
      </p>

      <div className="colorOptionWrapper">
        {colorArray.map((color) => (
          <button
            onClick={() => handleColorOptionClick(color)}
            key={color}
            className={`colorBtnOption ${
              selectedColor === color ? `selected` : ``
            }`}
            data-testid="colorOption"
            disabled={showOrHideColorBox}
            style={{
              backgroundColor: color,
            }}
          ></button>
        ))}
      </div>

      <button
        className="startBtn"
        onClick={handleStartBtnClick}
        data-testid="newGameButton"
      >
        Start!
      </button>
    </section>
  );
}

export default App;
