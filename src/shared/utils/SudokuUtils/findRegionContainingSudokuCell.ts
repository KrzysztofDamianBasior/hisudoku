// The region condition, we must first determine which region the cell belongs to. Each region begins on rows 0, 3, and 6 and columns 0, 3, and 6. Using a combination of subtraction and modulus with the coordinates of the empty cell, we can determine the top-left most cell of the region which the cell belongs to- then, we scan through the region and look for a match

import type { SudokuCellPosition } from "../../models/internalAppRepresentation";

export const findRegionContainingSudokuCell = (sudokuCellPosition: SudokuCellPosition): number => {
    const rowIndex = sudokuCellPosition[0];
    const colIndex = sudokuCellPosition[1];

    return Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
};
