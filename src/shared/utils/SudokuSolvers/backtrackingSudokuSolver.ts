import type { SudokuBoard, SudokuValue } from "../../models/internalAppRepresentation";
import { checkIfSudokuValueNotCollides } from "../SudokuUtils/checkIfSudokuValueNotCollides";

export function backtrackingSudokuSolver({ sudokuBoard }: { sudokuBoard: SudokuBoard }) {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (sudokuBoard[row][column] === 0) {
                for (let sudokuValue: SudokuValue = 1; sudokuValue <= 9; sudokuValue++) {
                    if (
                        checkIfSudokuValueNotCollides({
                            sudokuBoard: sudokuBoard,
                            row,
                            column,
                            sudokuValue: sudokuValue as SudokuValue,
                        })
                    ) {
                        sudokuBoard[row][column] = sudokuValue as SudokuValue;
                        if (backtrackingSudokuSolver({ sudokuBoard })) {
                            return true;
                        } else {
                            sudokuBoard[row][column] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
