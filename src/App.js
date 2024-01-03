import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const initialBoard = Array(9).fill("/");
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] !== "/" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const squares = [...board];

    if (calculateWinner(squares) || squares[i] !== "/") {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <button
      className="board-button"
      onClick={() => handleClick(i)}
      data-testid={`button-${i + 1}`}
      disabled={board[i] !== "/" || calculateWinner(board)}
    >
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `${winner} is the winner`;
  } else if (!board.includes("/")) {
    status = "DRAW";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  return (
    <div className="board">
      <div className="title mt-3 h-100 d-flex justify-content-center align-items-center">
        <h1>Tic Tac Toe</h1>
      </div>
      <h4 className="status board-row h-100 d-flex align-items-center justify-content-center">
        {status}
      </h4>
      <div className="board-row h-100 d-flex align-items-center justify-content-center">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row h-100 d-flex align-items-center justify-content-center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row h-100 d-flex align-items-center justify-content-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="mt-3 board-row h-100 d-flex align-items-center justify-content-center">
        {(winner || !board.includes("/")) && (
          <button
            className="btn btn-primary"
            onClick={resetGame}
            data-testid="reset-button"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
