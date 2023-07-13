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

export const INITIAL_BOARD_STATE: Board = [
  [
    PIECES.BLACK_ROOK.id,
    PIECES.BLACK_KNIGHT.id,
    PIECES.BLACK_BISHOP.id,
    PIECES.BLACK_QUEEN.id,
    PIECES.BLACK_KING.id,
    PIECES.BLACK_BISHOP.id,
    PIECES.BLACK_KNIGHT.id,
    PIECES.BLACK_ROOK.id,
  ],
  [
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
    PIECES.BLACK_PAWN.id,
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
    PIECES.WHITE_PAWN.id,
  ],
  [
    PIECES.WHITE_ROOK.id,
    PIECES.WHITE_KNIGHT.id,
    PIECES.WHITE_BISHOP.id,
    PIECES.WHITE_QUEEN.id,
    PIECES.WHITE_KING.id,
    PIECES.WHITE_BISHOP.id,
    PIECES.WHITE_KNIGHT.id,
    PIECES.WHITE_ROOK.id,
  ],
];
// export const INITIAL_BOARD_STATE: Board = [
//   ["", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", PIECES.WHITE_BISHOP.id, ""],
//   ["", "", "", "", "", "", "", ""],
//   ["", "", PIECES.WHITE_KNIGHT.id, "", "", "", "", ""],
//   ["", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", PIECES.WHITE_KING.id, "", ""],
//   ["", "", "", "", "", "", "", ""],
//   ["", PIECES.WHITE_QUEEN.id, "", "", "", "", PIECES.WHITE_ROOK.id, ""],
// ];

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

  type PieceColor = "-w." | "-b.";
  const pieceCol: PieceColor = pieceId?.includes("-w.") ? "-w." : "-b.";
  const opponentCol: PieceColor = pieceCol === "-w." ? "-b." : "-w.";

  let moves: number[][] = [];

  // Bishop moves
  if (
    pieceId === PIECES.WHITE_BISHOP.id ||
    pieceId === PIECES.BLACK_BISHOP.id
  ) {
    // South east
    for (let i = 1; i < boardState.length - Math.max(row, col); i++) {
      let pos = [row + i, col + i];

      if (boardState[row + i]?.[col + i] !== "") {
        if (boardState[row + i]?.[col + i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // South west
    for (let i = 1; i <= boardState.length - Math.min(row, col); i++) {
      let pos = [row + i, col - i];

      if (boardState[row + i]?.[col - i] !== "") {
        if (boardState[row + i]?.[col - i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // North west
    for (let i = 1; i <= Math.min(row, col); i++) {
      let pos = [row - i, col - i];

      if (boardState[row - i]?.[col - i] !== "") {
        if (boardState[row - i]?.[col - i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // North east
    for (let i = 1; i <= Math.max(row, col); i++) {
      let pos = [row - i, col + i];

      if (boardState[row - i]?.[col + i] !== "") {
        if (boardState[row - i]?.[col + i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }
  } else if (
    pieceId === PIECES.WHITE_ROOK.id ||
    pieceId === PIECES.BLACK_ROOK.id
  ) {
    // North
    for (let i = row - 1; i >= 0; i--) {
      let pos = [i, col];

      if (boardState[i]?.[col] !== "") {
        if (boardState[i]?.[col]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // South
    for (let i = row + 1; i < boardState.length; i++) {
      let pos = [i, col];

      if (boardState[i]?.[col] !== "") {
        if (boardState[i]?.[col]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // West
    for (let i = col - 1; i >= 0; i--) {
      let pos = [row, i];

      if (boardState[row]?.[i] !== "") {
        if (boardState[row]?.[i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // East
    for (let i = col + 1; i < boardState.length; i++) {
      let pos = [row, i];

      if (boardState[row]?.[i] !== "") {
        if (boardState[row]?.[i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }
  } else if (
    pieceId === PIECES.WHITE_QUEEN.id ||
    pieceId === PIECES.BLACK_QUEEN.id
  ) {
    /** -- Diagonal -- */
    // South east
    for (let i = 1; i < boardState.length - Math.max(row, col); i++) {
      let pos = [row + i, col + i];

      if (boardState[row + i]?.[col + i] !== "") {
        if (boardState[row + i]?.[col + i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // South west
    for (let i = 1; i <= boardState.length - Math.min(row, col); i++) {
      let pos = [row + i, col - i];

      if (boardState[row + i]?.[col - i] !== "") {
        if (boardState[row + i]?.[col - i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // North west
    for (let i = 1; i <= Math.min(row, col); i++) {
      let pos = [row - i, col - i];

      if (boardState[row - i]?.[col - i] !== "") {
        if (boardState[row - i]?.[col - i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // North east
    for (let i = 1; i <= Math.max(row, col); i++) {
      let pos = [row - i, col + i];

      if (boardState[row - i]?.[col + i] !== "") {
        if (boardState[row - i]?.[col + i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    /** -- Horizontal and vertical -- */
    // North
    for (let i = row - 1; i >= 0; i--) {
      let pos = [i, col];

      if (boardState[i]?.[col] !== "") {
        if (boardState[i]?.[col]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // South
    for (let i = row + 1; i < boardState.length; i++) {
      let pos = [i, col];

      if (boardState[i]?.[col] !== "") {
        if (boardState[i]?.[col]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // West
    for (let i = col - 1; i >= 0; i--) {
      let pos = [row, i];

      if (boardState[row]?.[i] !== "") {
        if (boardState[row]?.[i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }

    // East
    for (let i = col + 1; i < boardState.length; i++) {
      let pos = [row, i];

      if (boardState[row]?.[i] !== "") {
        if (boardState[row]?.[i]?.includes(opponentCol)) {
          moves = [...moves, pos];
        }

        break;
      }

      moves = [...moves, pos];
    }
  } else if (
    pieceId === PIECES.WHITE_KING.id ||
    pieceId === PIECES.BLACK_KING.id
  ) {
    let pos = [];

    /** -- Diagonal -- */
    // South east
    pos = [row + 1, col + 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row + 1]?.[col + 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // South west
    pos = [row + 1, col - 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row + 1]?.[col - 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // North west
    pos = [row - 1, col - 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row - 1]?.[col - 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // North east
    pos = [row - 1, col + 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row - 1]?.[col + 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    /** -- Horizontal and vertical -- */
    // North
    pos = [row - 1, col];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row - 1]?.[col]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // South
    pos = [row + 1, col];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row + 1]?.[col]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // West
    pos = [row, col - 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row]?.[col - 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }

    // East
    pos = [row, col + 1];

    if (pos[0] !== undefined && pos[0] < boardState.length && pos[0] >= 0) {
      if (pos[1] !== undefined && pos[1] < boardState.length && pos[1] >= 0) {
        if (!boardState[row]?.[col + 1]?.includes(pieceCol)) {
          moves = [...moves, pos];
        }
      }
    }
  } else if (
    pieceId === PIECES.WHITE_KNIGHT.id ||
    pieceId === PIECES.BLACK_KNIGHT.id
  ) {
    let pos: number[] = [];

    // North
    pos = [row - 2, col - 1];
    if (
      boardState[row - 2]?.[col - 1] === "" ||
      boardState[row - 2]?.[col - 1]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }
    pos = [row - 2, col + 1];
    if (
      boardState[row - 2]?.[col + 1] === "" ||
      boardState[row - 2]?.[col + 1]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }

    // South
    pos = [row + 2, col - 1];
    if (
      boardState[row + 2]?.[col - 1] === "" ||
      boardState[row + 2]?.[col - 1]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }
    pos = [row + 2, col + 1];
    if (
      boardState[row + 2]?.[col + 1] === "" ||
      boardState[row + 2]?.[col + 1]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }

    // West
    pos = [row + 1, col - 2];
    if (
      boardState[row + 1]?.[col - 2] === "" ||
      boardState[row + 1]?.[col - 2]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }
    pos = [row - 1, col - 2];
    if (
      boardState[row - 1]?.[col - 2] === "" ||
      boardState[row - 1]?.[col - 2]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }

    // West
    pos = [row + 1, col + 2];
    if (
      boardState[row + 1]?.[col + 2] === "" ||
      boardState[row + 1]?.[col + 2]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }
    pos = [row - 1, col + 2];
    if (
      boardState[row - 1]?.[col + 2] === "" ||
      boardState[row - 1]?.[col + 2]?.includes(opponentCol)
    ) {
      moves = [...moves, pos];
    }
  } else if (pieceId === PIECES.WHITE_PAWN.id) {
    let pos: number[] = [row, col];

    pos = [row - 1, col];
    if (boardState[row - 1]?.[col] === "") {
      moves = [...moves, pos];
    }

    // 2 Step move if pawn hasn't moved yet
    pos = [row - 2, col];
    if (
      row === boardState.length - 2 &&
      boardState[row - 1]?.[col] === "" &&
      boardState[row - 2]?.[col] === ""
    ) {
      moves = [...moves, pos];
    }

    pos = [row - 1, col + 1];
    if (boardState[row - 1]?.[col + 1]?.includes(opponentCol)) {
      moves = [...moves, pos];
    }

    pos = [row - 1, col - 1];
    if (boardState[row - 1]?.[col - 1]?.includes(opponentCol)) {
      moves = [...moves, pos];
    }
  } else if (pieceId === PIECES.BLACK_PAWN.id) {
    let pos: number[] = [row, col];

    pos = [row + 1, col];
    if (boardState[row + 1]?.[col] === "") {
      moves = [...moves, pos];
    }

    // 2 Step move if pawn hasn't moved yet
    pos = [row + 2, col];
    if (
      row === 1 &&
      boardState[row + 1]?.[col] === "" &&
      boardState[row + 2]?.[col] === ""
    ) {
      moves = [...moves, pos];
    }

    pos = [row + 1, col + 1];
    if (boardState[row + 1]?.[col + 1]?.includes(opponentCol)) {
      moves = [...moves, pos];
    }

    pos = [row + 1, col - 1];
    if (boardState[row + 1]?.[col - 1]?.includes(opponentCol)) {
      moves = [...moves, pos];
    }
  }

  return moves;
};
