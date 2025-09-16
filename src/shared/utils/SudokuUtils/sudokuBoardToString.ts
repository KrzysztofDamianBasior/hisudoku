import type { SudokuBoard } from "../../models/internalAppRepresentation";

export const sudokuBoardToString = ({ sudokuBoard }: { sudokuBoard: SudokuBoard }): string => {
    const sudokuFragments: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sudokuBoard.forEach((row, rowIndex) => {
        const firstFragment = row.slice(0, 3).join("");
        const secondFragment = row.slice(3, 6).join("");
        const thirdFragment = row.slice(6, 9).join("");

        sudokuFragments.push([firstFragment, secondFragment, thirdFragment].join("."));
    });

    return sudokuFragments.join(";") + ";";
};
