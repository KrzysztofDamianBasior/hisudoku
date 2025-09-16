import type { SudokuValue } from "../../models/internalAppRepresentation";

export const isSudokuFragmentSolved = ({ sudokuValuesArray }: { sudokuValuesArray: SudokuValue[] }) => {
    const fragment = sudokuValuesArray.slice(0).sort().join("");
    const passingFragment = [1, 2, 3, 4, 5, 6, 7, 8, 9].join("");
    return fragment === passingFragment;
};
