// based on https://javascript.plainenglish.io/building-a-sudoku-puzzle-generator-d55cead9656d

import type { SudokuBoard, SudokuValue } from "../../models/internalAppRepresentation";

const easyPuzzles: SudokuBoard[] = [
    [
        [0, 0, 1, 0, 3, 0, 5, 6, 0],
        [8, 0, 0, 6, 0, 7, 0, 1, 0],
        [9, 0, 0, 5, 8, 0, 0, 4, 6],
        [0, 1, 2, 0, 0, 3, 4, 0, 0],
        [0, 0, 4, 0, 0, 0, 9, 0, 0],
        [0, 0, 8, 7, 0, 0, 6, 3, 0],
        [7, 2, 0, 0, 4, 6, 0, 0, 5],
        [0, 5, 0, 3, 0, 2, 0, 0, 4],
        [0, 8, 6, 0, 9, 0, 7, 0, 0],
    ],
    [
        [7, 8, 0, 0, 2, 0, 0, 0, 5],
        [0, 0, 1, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 9, 7, 0],
        [0, 4, 0, 0, 0, 1, 7, 3, 9],
        [3, 5, 6, 2, 0, 7, 1, 4, 8],
        [1, 7, 9, 8, 0, 0, 0, 6, 0],
        [0, 1, 2, 0, 0, 9, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 2, 0, 0],
        [9, 0, 0, 0, 8, 0, 0, 5, 4],
    ],
];

const mediumPuzzles: SudokuBoard[] = [
    [
        [6, 0, 0, 0, 0, 5, 0, 7, 3],
        [0, 0, 0, 0, 1, 0, 8, 0, 0],
        [0, 0, 7, 0, 0, 8, 2, 1, 0],
        [5, 0, 0, 3, 0, 9, 0, 4, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [0, 7, 0, 2, 0, 1, 0, 0, 6],
        [0, 9, 3, 7, 0, 0, 5, 0, 0],
        [0, 0, 5, 0, 8, 0, 0, 0, 0],
        [7, 6, 0, 5, 0, 0, 0, 0, 8],
    ],
    [
        [5, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 7, 3, 0, 2, 0, 0, 8],
        [0, 0, 0, 0, 5, 0, 1, 3, 0],
        [0, 1, 0, 0, 7, 8, 0, 0, 0],
        [0, 5, 8, 9, 2, 6, 3, 1, 0],
        [0, 0, 0, 1, 3, 0, 0, 9, 0],
        [0, 8, 6, 0, 4, 0, 0, 0, 0],
        [1, 0, 0, 7, 0, 3, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 3],
    ],
];

const hardPuzzles: SudokuBoard[] = [
    [
        [0, 8, 0, 4, 5, 0, 0, 0, 0],
        [5, 4, 0, 0, 2, 3, 0, 0, 0],
        [0, 1, 3, 0, 0, 9, 0, 0, 0],
        [0, 0, 0, 6, 0, 0, 7, 5, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 9, 5, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 1, 4, 0],
        [0, 0, 0, 3, 7, 0, 0, 2, 5],
        [0, 0, 0, 0, 4, 6, 0, 9, 0],
    ],
    [
        [0, 2, 0, 0, 9, 0, 0, 0, 0],
        [0, 7, 0, 0, 3, 0, 0, 4, 0],
        [0, 3, 0, 0, 0, 0, 1, 0, 2],
        [0, 0, 8, 6, 0, 0, 0, 0, 4],
        [4, 0, 0, 3, 5, 9, 0, 0, 7],
        [3, 0, 0, 0, 0, 1, 6, 0, 0],
        [6, 0, 5, 0, 0, 0, 0, 9, 0],
        [0, 4, 0, 0, 8, 0, 0, 6, 0],
        [0, 0, 0, 0, 2, 0, 0, 5, 0],
    ],
];

// Rotate the matrix between 0 and 3 times
// Map all of the sudoku numbers to other valid numbers
// Shuffle any 2–3 rows or columns that span the same 3 boxes.

const rotateMatrix = ({ matrix }: { matrix: SudokuBoard }): SudokuBoard => {
    const n = matrix.length;

    // Create a temporary matrix of size n x n
    const t = Array.from(Array(n), () => Array.from(Array(n)));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // basically matrix[i][j] gets moved to [j][n - (i + 1)]
            // e.g. matrix[0][0] => matrix[0][8] assuming 9x9 matrix
            const ele = matrix[i][j];
            const idx = n - (i + 1);

            t[j][idx] = ele;
        }
    }
    return t;
};

function shuffle({ array }: { array: SudokuValue[] | SudokuBoard }) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shuffleSudoku = ({ board }: { board: SudokuBoard }) => {
    const shuffled = shuffle({ array: [1, 2, 3, 4, 5, 6, 7, 8, 9] });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const shuffledSudoku = board.map((row, index) => {
        row.map((num) => shuffled[num - 1]);
    });

    return shuffledSudoku;
};

const shuffleSudokuRows = ({ board }: { board: SudokuBoard }) => {
    return [
        shuffle({ array: board.slice(0, 3) }),
        shuffle({ array: board.slice(3, 6) }),
        shuffle({ array: board.slice(6, 9) }),
    ].flat(); // flat by default flattens array by one level
};

const shuffleSudokuColumns = ({ board }: { board: SudokuBoard }) => {
    let arr = rotateMatrix({ matrix: board });
    arr = shuffleSudokuRows({ board: arr }) as SudokuBoard;
    arr = rotateMatrix({ matrix: rotateMatrix({ matrix: rotateMatrix({ matrix: arr }) }) });
    return arr;
};

function getRandomInt({ min, max }: { min: number; max: number }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export type SudokuDifficultyType = "EASY" | "MEDIUM" | "HARD";

export const generateSudoku = ({ difficulty }: { difficulty: SudokuDifficultyType }): SudokuBoard => {
    switch (difficulty) {
        case "EASY": {
            let easySudoku = easyPuzzles[getRandomInt({ min: 0, max: easyPuzzles.length })];
            easySudoku = rotateMatrix({ matrix: easySudoku });
            easySudoku = shuffleSudokuRows({ board: easySudoku }) as SudokuBoard;
            easySudoku = shuffleSudokuColumns({ board: easySudoku });
            return easySudoku;
        }
        case "MEDIUM": {
            let mediumSudoku = mediumPuzzles[getRandomInt({ min: 0, max: mediumPuzzles.length })];
            mediumSudoku = rotateMatrix({ matrix: mediumSudoku });
            mediumSudoku = shuffleSudokuRows({ board: mediumSudoku }) as SudokuBoard;
            mediumSudoku = shuffleSudokuColumns({ board: mediumSudoku });
            return mediumSudoku;
        }
        case "HARD": {
            let hardSudoku = easyPuzzles[getRandomInt({ min: 0, max: hardPuzzles.length })];
            hardSudoku = rotateMatrix({ matrix: hardSudoku });
            hardSudoku = shuffleSudokuRows({ board: hardSudoku }) as SudokuBoard;
            hardSudoku = shuffleSudokuColumns({ board: hardSudoku });
            return hardSudoku;
        }
    }
};
