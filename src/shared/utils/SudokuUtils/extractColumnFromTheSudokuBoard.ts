import type { SudokuBoard } from "../../models/internalAppRepresentation";

export const extractColumnFromTheSudokuBoard = ({
    sudokuBoard,
    columnNumber,
}: {
    sudokuBoard: SudokuBoard;
    columnNumber: number;
}) => {
    return sudokuBoard.reduce((total, row) => [...total, row[columnNumber]], []);
};
