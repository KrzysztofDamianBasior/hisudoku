// (We can observe that in below matrix, the diagonal matrices are independent of other empty matrices initially). So if we fill them first, then we will only have to do box check and thus column/row check not required
// 3 8 5 0 0 0 0 0 0
// 9 2 1 0 0 0 0 0 0
// 6 4 7 0 0 0 0 0 0
// 0 0 0 1 2 3 0 0 0
// 0 0 0 7 8 4 0 0 0
// 0 0 0 6 9 5 0 0 0
// 0 0 0 0 0 0 8 7 3
// 0 0 0 0 0 0 9 6 2
// 0 0 0 0 0 0 1 4 5

import type { SudokuBoard, SudokuValue } from "../../models/internalAppRepresentation";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray({ arr }: { arr: SudokuValue[] }): SudokuValue[] {
    const array = arr.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function generateDiagonalSudoku(): SudokuBoard {
    const full: SudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const firstBox: SudokuValue[] = shuffleArray({ arr: full });
    const secondBox: SudokuValue[] = shuffleArray({ arr: full });
    const thirdBox: SudokuValue[] = shuffleArray({ arr: full });

    const board: SudokuValue[][] = [];
    const indices: SudokuValue[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];
    for (let i = 0; i < 9; i++) {
        if (Math.floor(i / 3) === 0) {
            board.push([
                ...[firstBox[indices[i][0]], firstBox[indices[i][1]], firstBox[indices[i][2]]],
                ...[0, 0, 0, 0, 0, 0],
            ] as SudokuValue[]);
        }
        if (Math.floor(i / 3) === 1) {
            board.push([
                ...[0, 0, 0],
                ...[secondBox[indices[i][0]], secondBox[indices[i][1]], secondBox[indices[i][2]]],
                ...[0, 0, 0],
            ] as SudokuValue[]);
        }
        if (Math.floor(i / 3) === 2) {
            board.push([
                ...[0, 0, 0, 0, 0, 0],
                ...[thirdBox[indices[i][0]], thirdBox[indices[i][1]], thirdBox[indices[i][2]]],
            ] as SudokuValue[]);
        }
    }
    return board;
}
