import { createContext, useContext, useState, type ReactNode } from "react";
import { type GameState, type Piece } from "~/types/board";
import { INITIAL_BOARD_STATE } from "../utils/board";

type GameStateContextData = {
  gameState: GameState;
  updateSelectedPiece: (
    pieceToSelect: Piece | undefined,
    piecePosition: { row: number; col: number },
    availableMoves: number[][]
  ) => void;
  makeMove: (
    pieceCurrentPos: { row: number; col: number },
    pieceNewPos: { row: number; col: number }
  ) => void;
  resetSelectedPiece: () => void;
};

const InitialGameStateContext: GameStateContextData = {
  gameState: {
    boardState: INITIAL_BOARD_STATE,
    selectedPiece: null,
  },
  updateSelectedPiece: () => undefined,
  makeMove: () => undefined,
  resetSelectedPiece: () => undefined,
};

const GameStateContext = createContext<GameStateContextData>(
  InitialGameStateContext
);

export function useGameState() {
  return useContext(GameStateContext);
}

export default function GameStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameState, setGameState] = useState<GameState>({
    boardState: INITIAL_BOARD_STATE,
    selectedPiece: null,
  });

  const resetSelectedPiece = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        selectedPiece: null,
      };
    });
  };

  const updateSelectedPiece = (
    pieceToSelect: Piece | undefined,
    piecePosition: { row: number; col: number },
    availableMoves: number[][]
  ) => {
    if (!!!pieceToSelect) return;

    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        selectedPiece: {
          ...pieceToSelect,
          availableMoves,
          row: piecePosition.row,
          col: piecePosition.col,
        },
      };
    });
  };

  const makeMove = (
    pieceCurrentPos: { row: number; col: number },
    pieceNewPos: { row: number; col: number }
  ) => {
    const updatedBoardState = JSON.parse(JSON.stringify(gameState.boardState));

    for (let i = 0; i < updatedBoardState.length; i++) {
      for (let j = 0; j < updatedBoardState.length; j++) {
        if (i === pieceCurrentPos.row && j === pieceCurrentPos.col) {
          updatedBoardState[i][j] = "";
        } else if (i === pieceNewPos.row && j === pieceNewPos.col) {
          updatedBoardState[i][j] = gameState.selectedPiece?.id;
        }
      }
    }

    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        selectedPiece: null,
        boardState: updatedBoardState,
      };
    });
  };

  const value = {
    gameState,
    updateSelectedPiece,
    makeMove,
    resetSelectedPiece,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
