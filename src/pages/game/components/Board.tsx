import { useEffect, useRef } from "react";
import {
  getAvailableMoves,
  getPieceById,
  isMoveAvailable,
} from "~/utils/board";
import { useGameState } from "~/context/GameContext";
import { type Board } from "../../../types/board";

export function Board() {
  const { gameState, updateSelectedPiece, makeMove, resetSelectedPiece } =
    useGameState();
  const squaresContainerRef = useRef<HTMLDivElement | null>(null);
  const allSquaresRef = useRef<Element[]>([]);

  if (typeof gameState.boardState[0] === undefined) return <></>;

  const handleSquareClick = (event: any) => {
    unHighlightMoves();

    // Check if clicked on valid square on board
    const square = event.currentTarget;
    if (!!!square.id[0] || !!!square.id[1]) return;

    // Get position of square that was clicked form id
    const i = parseInt(square.id[0]);
    const j = parseInt(square.id[1]);

    // If clicked on piece
    if (gameState.boardState[i]?.[j] !== "") {
      const pieceToSelect = getPieceById(gameState.boardState[i]?.[j]);
      if (!!!pieceToSelect) return;

      const availableMoves = getAvailableMoves(
        gameState.boardState,
        gameState.boardState[i]?.[j],
        i,
        j
      );

      updateSelectedPiece(pieceToSelect, { row: i, col: j }, availableMoves);
      highlightMoves(availableMoves);

      return;
    }

    // If didn't click on piece and piece already selected
    if (!!gameState.selectedPiece) {
      if (isMoveAvailable(gameState.selectedPiece.availableMoves, i, j)) {
        makeMove(
          {
            row: gameState.selectedPiece.row,
            col: gameState.selectedPiece.col,
          },
          { row: i, col: j }
        );

        return;
      }

      resetSelectedPiece();

      return;
    }

    // No piece selected and clicked empty square
    resetSelectedPiece();
  };

  const highlightMoves = (availableMoves: number[][]) => {
    availableMoves.forEach((pos) => {
      const elem = document.getElementById(`${pos[0]}${pos[1]}`);
      if (!elem!.classList.contains("available-move"))
        elem!.classList.add("available-move");
    });
  };

  const unHighlightMoves = () => {
    allSquaresRef.current.forEach((square) => {
      square!.classList.remove("available-move");
    });
  };

  // Get children of the squaresContainer element (we need them to update visuals)
  useEffect(() => {
    if (!!!squaresContainerRef.current?.children) return;

    allSquaresRef.current = Array.from(squaresContainerRef.current?.children);
  }, [squaresContainerRef]);

  const whiteSquareClass = "sqr relative bg-white";
  const blackSquareClass = "sqr relative bg-slate-600";

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div
          ref={squaresContainerRef}
          className="grid-rows-8 relative grid h-[50rem] w-[50rem] grid-cols-8 border border-black"
        >
          {gameState.boardState.map((row, rowIndex) =>
            row.map((square, columnIndex) => {
              const className =
                (rowIndex + columnIndex) % 2 === 0
                  ? whiteSquareClass
                  : blackSquareClass;

              return (
                <div
                  key={`${rowIndex}${columnIndex}`}
                  id={`${rowIndex}${columnIndex}`}
                  className={className}
                  onClick={handleSquareClick}
                >
                  {square && <img className="absolute" src={square} />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
