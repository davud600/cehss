import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { type Board } from "./types/board";

const PIECES: any = {
  WHITE_PAWN: {
    id: "/pieces-basic-svg/pawn-w.svg",
  },
  WHITE_QUEEN: {
    id: "/pieces-basic-svg/queen-w.svg",
  },
  WHITE_KING: {
    id: "/pieces-basic-svg/king-w.svg",
  },
  WHITE_BISHOP: {
    id: "/pieces-basic-svg/bishop-w.svg",
  },
  WHITE_KNIGHT: {
    id: "/pieces-basic-svg/knight-w.svg",
  },
  WHITE_ROOK: {
    id: "/pieces-basic-svg/rook-w.svg",
  },
  BLACK_PAWN: {
    id: "/pieces-basic-svg/pawn-b.svg",
  },
  BLACK_QUEEN: {
    id: "/pieces-basic-svg/queen-b.svg",
  },
  BLACK_KING: {
    id: "/pieces-basic-svg/king-b.svg",
  },
  BLACK_BISHOP: {
    id: "/pieces-basic-svg/bishop-b.svg",
  },
  BLACK_KNIGHT: {
    id: "/pieces-basic-svg/knight-b.svg",
  },
  BLACK_ROOK: {
    id: "/pieces-basic-svg/rook-b.svg",
  },
};
// const initialBoardState: Board = [
//   [
//     PIECES.BLACK_ROOK.id,
//     PIECES.BLACK_KNIGHT.id,
//     PIECES.BLACK_BISHOP.id,
//     PIECES.BLACK_QUEEN.id,
//     PIECES.BLACK_KING.id,
//     PIECES.BLACK_BISHOP.id,
//     PIECES.BLACK_KNIGHT.id,
//     PIECES.BLACK_ROOK.id,
//   ],
//   [
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//     PIECES.BLACK_PAWN.id,
//   ],
//   ["", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", ""],
//   [
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//     PIECES.WHITE_PAWN.id,
//   ],
//   [
//     PIECES.WHITE_ROOK.id,
//     PIECES.WHITE_KNIGHT.id,
//     PIECES.WHITE_BISHOP.id,
//     PIECES.WHITE_QUEEN.id,
//     PIECES.WHITE_KING.id,
//     PIECES.WHITE_BISHOP.id,
//     PIECES.WHITE_KNIGHT.id,
//     PIECES.WHITE_ROOK.id,
//   ],
// ];
const initialBoardState: Board = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", PIECES.WHITE_BISHOP.id, "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", PIECES.WHITE_BISHOP.id, ""],
];

interface BoardContextData {
  boardState: Board;
  setBoardState: Dispatch<SetStateAction<Board>>;
  getAvailableMoves: (
    pieceId: string | undefined,
    row: number,
    col: number
  ) => number[][];
}

// i shouldnt need to do this smh but cant find a way around it
const initialBoardContextData = {
  boardState: initialBoardState,
  setBoardState: () => false,
  getAvailableMoves: () => [],
};

const BoardContext = createContext<BoardContextData>(initialBoardContextData);

export function useBoard() {
  return useContext(BoardContext);
}

export default function BoardProvider({ children }: { children: ReactNode }) {
  const [boardState, setBoardState] = useState<Board>(initialBoardState);

  const getAvailableMoves = (
    pieceId: string | undefined,
    row: number,
    col: number
  ): number[][] => {
    if (typeof pieceId === undefined) return [];

    let moves: number[][] = [];

    // Bishop moves
    if (
      pieceId === PIECES.WHITE_BISHOP.id ||
      pieceId === PIECES.BLACK_BISHOP.id
    ) {
      // South east
      for (let i = 1; i < boardState.length - Math.max(row, col); i++) {
        let pos = [row + i, col + i];

        if (boardState[row + i]?.[col + i] !== "") break;

        moves = [...moves, pos];
      }

      // South west
      for (let i = 1; i <= boardState.length - Math.min(row, col); i++) {
        let pos = [row + i, col - i];

        if (boardState[row + i]?.[col - i] !== "") break;

        moves = [...moves, pos];
      }

      // North west
      for (let i = 1; i <= Math.min(row, col); i++) {
        let pos = [row - i, col - i];

        if (boardState[row - i]?.[col - i] !== "") break;

        moves = [...moves, pos];
      }

      // North east
      for (let i = 1; i <= Math.max(row, col); i++) {
        let pos = [row - i, col + i];

        if (boardState[row - i]?.[col + i] !== "") break;

        moves = [...moves, pos];
      }
    }

    return moves;
  };

  const value = { boardState, setBoardState, getAvailableMoves };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
