import type { SudokuBoard, SudokuValue } from "../../models/internalAppRepresentation";

export const checkIfSudokuValueNotCollides = ({
    sudokuBoard,
    row,
    column,
    sudokuValue,
}: {
    sudokuBoard: SudokuBoard;
    row: number;
    column: number;
    sudokuValue: SudokuValue;
}): boolean => {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(column / 3) + (i % 3);
        if (
            sudokuBoard[row][i] === sudokuValue ||
            sudokuBoard[i][column] === sudokuValue ||
            sudokuBoard[m][n] === sudokuValue
        ) {
            return false;
        }
    }
    return true;
};
