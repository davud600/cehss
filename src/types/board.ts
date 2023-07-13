export type Board = string[][];

export type Piece = {
  id: string;
};

export type SelectedPiece =
  | (Piece & {
      availableMoves: number[][];
      row: number;
      col: number;
    })
  | null;

export type PieceColor = "-w." | "-b.";

export type Pieces = {
  WHITE_PAWN: Piece;
  WHITE_QUEEN: Piece;
  WHITE_KING: Piece;
  WHITE_BISHOP: Piece;
  WHITE_KNIGHT: Piece;
  WHITE_ROOK: Piece;
  BLACK_PAWN: Piece;
  BLACK_QUEEN: Piece;
  BLACK_KING: Piece;
  BLACK_BISHOP: Piece;
  BLACK_KNIGHT: Piece;
  BLACK_ROOK: Piece;
};

export type GameState = {
  boardState: Board;
  selectedPiece: SelectedPiece;
};
