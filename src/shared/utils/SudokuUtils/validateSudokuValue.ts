import type { SudokuValue } from "../../models/internalAppRepresentation";

export function validateSudokuValue(sudokuValue: number): sudokuValue is SudokuValue {
    if (
        sudokuValue === 1 ||
        sudokuValue === 2 ||
        sudokuValue === 3 ||
        sudokuValue === 4 ||
        sudokuValue === 5 ||
        sudokuValue === 6 ||
        sudokuValue === 7 ||
        sudokuValue === 8 ||
        sudokuValue === 9
    ) {
        return true;
    } else {
        return false;
    }
}
