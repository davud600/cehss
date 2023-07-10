import { useEffect } from "react";
import { useBoard } from "../BoardContext";
import { Board } from "../components/Board";

export default function LocalGame() {
  const { boardState, getAvailableMoves } = useBoard();

  useEffect(() => {
    const squares = document.querySelectorAll(".sqr");

    const onMouseDown = (square: Element) => {
      if (!!!square.id[0] || !!!square.id[1]) return;

      const i = parseInt(square.id[0]);
      const j = parseInt(square.id[1]);

      if (boardState[i]?.[j] === "") return;

      const availableMoves = getAvailableMoves(boardState[i]?.[j], i, j);

      availableMoves.forEach((pos) => {
        const elem = document.getElementById(`${pos[0]}${pos[1]}`);

        elem!.style.backgroundColor = "rgba(50, 200, 50, 0.5)";
      });
    };

    squares.forEach((square) =>
      square.addEventListener("mousedown", () => onMouseDown(square))
    );

    return () =>
      squares.forEach((square) =>
        square.removeEventListener("mousedown", () => onMouseDown(square))
      );
  }, [boardState]);

  return (
    <>
      <Board boardState={boardState} />
    </>
  );
}
