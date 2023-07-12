import { type Pieces, type Board, type Piece } from "../types/board";

export const PIECES: Pieces = {
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

// const INITIAL_BOARD_STATE: Board = [
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
export const INITIAL_BOARD_STATE: Board = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", PIECES.WHITE_BISHOP.id, "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", PIECES.WHITE_BISHOP.id, ""],
];

// Some helper functions related to board and pieces
export const getPieceById = (
  pieceId: string | undefined
): Piece | undefined => {
  if (!!!pieceId) return undefined;

  let piece: Piece | undefined;

  for (const key in PIECES) {
    if (pieceId === PIECES[key as keyof Pieces].id) {
      piece = PIECES[key as keyof Pieces];
    }
  }

  return piece;
};

export const isMoveAvailable = (
  availableMoves: number[][],
  row: number,
  col: number
) => {
  let available = false;

  for (let i = 0; i < availableMoves.length; i++) {
    if (availableMoves[i]?.[0] === row && availableMoves[i]?.[1] === col) {
      available = true;
      break;
    }
  }

  return available;
};

export const getAvailableMoves = (
  boardState: Board,
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
