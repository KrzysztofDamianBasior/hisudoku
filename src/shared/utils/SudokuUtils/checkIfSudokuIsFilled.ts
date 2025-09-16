import type { SudokuBoard } from "../../models/internalAppRepresentation";

export function checkIfSudokuIsFilled(board: SudokuBoard) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}
