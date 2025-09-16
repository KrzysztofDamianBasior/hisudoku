import type { SudokuBoard } from "../../models/internalAppRepresentation";

export const searchForDuplicates = ({ sudokuBoard }: { sudokuBoard: SudokuBoard }): [number, number][] => {
    const rows: number[][] = [[], [], [], [], [], [], [], [], []];
    const columns: number[][] = [[], [], [], [], [], [], [], [], []];
    const boxes: number[][] = [[], [], [], [], [], [], [], [], []];

    const duplicates: [number, number][] = [];

    sudokuBoard.forEach((boardRows, rowIndex) => {
        boardRows.forEach((num, colIndex) => {
            if (num !== 0) {
                if (rows[rowIndex].includes(num)) {
                    rows[rowIndex].push(num);

                    const indices: number[] = [];
                    let idx: number = rows[rowIndex].indexOf(num);

                    duplicates.push([rowIndex, idx]);

                    while (idx !== -1) {
                        indices.push(idx);
                        idx = rows[rowIndex].indexOf(num, idx + 1);
                        if (idx !== -1) {
                            duplicates.push([rowIndex, idx]);
                        }
                    }
                } else rows[rowIndex].push(num);
            } else rows[rowIndex].push(num);

            if (num !== 0) {
                if (columns[colIndex].includes(num)) {
                    columns[colIndex].push(num);

                    const indices: number[] = [];
                    let idx: number = columns[colIndex].indexOf(num);

                    duplicates.push([idx, colIndex]);

                    while (idx !== -1) {
                        indices.push(idx);
                        idx = columns[colIndex].indexOf(num, idx + 1);
                        if (idx !== -1) {
                            duplicates.push([idx, colIndex]);
                        }
                    }
                } else columns[colIndex].push(num);
            } else columns[colIndex].push(num);

            const boxIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
            if (num !== 0) {
                if (boxes[boxIndex].includes(num)) {
                    boxes[boxIndex].push(num);

                    const indices: number[] = [];
                    let idx: number = boxes[boxIndex].indexOf(num);

                    let duplicateR = Math.floor(idx / 3) + Math.floor(boxIndex / 3) * 3;
                    let duplicateC = (idx % 3) + (boxIndex / 3) * 3;
                    duplicates.push([duplicateR, duplicateC]);

                    while (idx !== -1) {
                        indices.push(idx);
                        idx = rows[rowIndex].indexOf(num, idx + 1);
                        if (idx !== -1) {
                            duplicateR = Math.floor(idx / 3) + Math.floor(boxIndex / 3) * 3;
                            duplicateC = (idx % 3) + (boxIndex / 3) * 3;
                            duplicates.push([duplicateR, duplicateC]);
                        }
                    }
                } else boxes[boxIndex].push(num);
            } else boxes[boxIndex].push(num);
        });
    });
    return duplicates;
};
