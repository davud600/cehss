import { useEffect } from "react";
import { Board } from "../types/board";

export function Board({ boardState }: { boardState: Board }) {
  if (typeof boardState[0] === undefined) return <></>;

  const whiteSquareClass = "sqr relative bg-white";
  const blackSquareClass = "sqr relative bg-slate-600";

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid-rows-8 relative grid h-[50rem] w-[50rem] grid-cols-8 border border-black">
          {boardState.map((row, rowIndex) =>
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
