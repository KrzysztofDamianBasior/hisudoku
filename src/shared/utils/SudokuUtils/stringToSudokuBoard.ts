import type { SudokuBoard } from "../../models/internalAppRepresentation";

export function stringToSudokuBoard({ sudokuString }: { sudokuString: string }): SudokuBoard {
    const rows = sudokuString.split(";");
    const board: number[][] = [];

    for (const key in rows) {
        const matches = rows[key].match(/[0-9]/g);

        if (matches !== null) {
            const numbers = matches.map((num) => parseInt(num));
            board.push(numbers);
        }
    }
    return board as SudokuBoard;
}
