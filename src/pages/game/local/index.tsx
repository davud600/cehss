import { useEffect } from "react";
import { useBoard } from "../BoardContext";
import { Board } from "../components/Board";

export default function LocalGame() {
  const { boardState, getAvailableMoves } = useBoard();

  useEffect(() => {
    const squares = document.querySelectorAll(".sqr");

    const onMouseDown = (square: Element) => {
      squares.forEach((square) => {
        square!.classList.remove("available-move");
      });

      if (!!!square.id[0] || !!!square.id[1]) return;

      const i = parseInt(square.id[0]);
      const j = parseInt(square.id[1]);

      if (boardState[i]?.[j] === "") return;
      const availableMoves = getAvailableMoves(boardState[i]?.[j], i, j);

      availableMoves.forEach((pos) => {
        const elem = document.getElementById(`${pos[0]}${pos[1]}`);

        if (!elem!.classList.contains("available-move"))
          elem!.classList.add("available-move");
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
