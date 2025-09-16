// based on: ref: https://dev.to/dsasse07/generating-solving-sudoku-in-js-ruby-with-backtracking-4hm
// Randomly take any number 1-9.
// Check if it is safe to put in the cell.(row , column and box)
// If safe, place it and increment to next location and go to step 1.
// If not safe, then without incrementing go to step 1.
// Once matrix is fully filled, remove k no. of elements randomly to complete game.

const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function shuffle(array: number[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const rowSafe = (puzzleArray: number[][], emptyCell: { rowIndex: number; colIndex: number }, num: number) => {
    // -1 is return value of .find() if value not found
    return puzzleArray[emptyCell.rowIndex].indexOf(num) === -1;
};

const colSafe = (puzzleArray: number[][], emptyCell: { rowIndex: number; colIndex: number }, num: number) => {
    return !puzzleArray.some((row) => row[emptyCell.colIndex] === num);
};

const boxSafe = (puzzleArray: number[][], emptyCell: { rowIndex: number; colIndex: number }, num: number) => {
    const boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3); // Define top left corner of box region for empty cell
    const boxStartCol = emptyCell.colIndex - (emptyCell.colIndex % 3);
    let safe = true;

    for (const boxRow of [0, 1, 2]) {
        for (const boxCol of [0, 1, 2]) {
            if (puzzleArray[boxStartRow + boxRow][boxStartCol + boxCol] === num) {
                safe = false; // Num is present in box region? If number is found, it is not safe to place
            }
        }
    }
    return safe;
};

const safeToPlace = (puzzleArray: number[][], emptyCell: { rowIndex: number; colIndex: number }, num: number) => {
    return (
        rowSafe(puzzleArray, emptyCell, num) &&
        colSafe(puzzleArray, emptyCell, num) &&
        boxSafe(puzzleArray, emptyCell, num)
    );
};

const nextEmptyCell = (puzzleArray: number[][]) => {
    const emptyCell = { rowIndex: -1, colIndex: -1 };

    puzzleArray.forEach((row, rowIndex) => {
        if (emptyCell.colIndex !== -1) return; // If this key has already been assigned, skip iteration

        const firstZero = row.find((col) => col === 0); // find first zero-element

        if (firstZero === undefined) return; // if no zero present, skip to next row

        emptyCell.rowIndex = rowIndex;
        emptyCell.colIndex = row.indexOf(firstZero);
    });

    if (emptyCell.colIndex !== -1) return emptyCell;

    return false; // If emptyCell was never assigned, there are no more zeros
};

const fillPuzzle = (startingBoard: number[][]) => {
    const emptyCell = nextEmptyCell(startingBoard);

    // If there are no more zeros, the board is finished, return it
    if (!emptyCell) return startingBoard;

    let counter = 0;
    const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Shuffled [0 - 9] array fills board randomly each pass
    for (const num of shuffle(numArray)) {
        // Counter is a global variable tracking the number of iterations performed in generating a puzzle. Most puzzles generate in < 500ms, but occassionally random generation could run in to heavy backtracking and result in a long wait. Best to abort this attempt and restart.
        counter++;
        if (counter > 20_000_000) throw new Error("Recursion Timeout");
        if (safeToPlace(startingBoard, emptyCell, num)) {
            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = num; // If safe to place number, place it
            // Recursively call the fill function to place num in next empty cell
            if (fillPuzzle(startingBoard)) return startingBoard;
            // If we were unable to place the future num, that num was wrong. Reset it and try next value
            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = 0;
        }
    }
    return false; // If unable to place any number, return false, which triggers previous round to go to next num
};

const newSolvedBoard = () => {
    const newBoard = BLANK_BOARD.map((row) => row.slice()); // Create an unaffiliated clone of a fresh board
    fillPuzzle(newBoard); // Populate the board using backtracking algorithm
    return newBoard;
};

const pokeHoles = (startingBoard: number[][], holes: number) => {
    const removedVals: { rowIndex: number; colIndex: number; val: number }[] = [];

    while (removedVals.length < holes) {
        const val = Math.floor(Math.random() * 81); // Value between 0-81
        const randomRowIndex = Math.floor(val / 9); // Integer 0-8 for row index
        const randomColIndex = val % 9;

        if (!startingBoard[randomRowIndex]) continue; // guard against cloning error
        if (startingBoard[randomRowIndex][randomColIndex] === 0) continue; // If cell already empty, restart loop

        removedVals.push({
            // Store the current value at the coordinates
            rowIndex: randomRowIndex,
            colIndex: randomColIndex,
            val: startingBoard[randomRowIndex][randomColIndex],
        });
        startingBoard[randomRowIndex][randomColIndex] = 0; // "poke a hole" in the board at the coords
        const proposedBoard = startingBoard.map((row) => row.slice()); // Clone this changed board

        // Attempt to solve the board after removing value. If it cannot be solved, restore the old value, and remove that option from the list
        if (!fillPuzzle(proposedBoard)) {
            const removedVal = removedVals.pop();
            if (removedVal) {
                startingBoard[randomRowIndex][randomColIndex] = removedVal.val;
            }
        }
    }
    return [removedVals, startingBoard];
};

export function newStartingBoard(holes: number) {
    // Reset global iteration counter to 0 and Try to generate a new game.
    // If counter reaches its maximum limit in the fillPuzzle function, current attemp will abort
    // To prevent the abort from crashing the script, the error is caught and used to re-run
    // this function
    try {
        const solvedBoard = newSolvedBoard();

        // Clone the populated board and poke holes in it.
        // Stored the removed values for clues
        const [removedVals, startingBoard] = pokeHoles(
            solvedBoard.map((row) => row.slice()),
            holes
        );

        return [removedVals, startingBoard, solvedBoard];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        /* empty */
    }

    return newStartingBoard(holes);
}

// We can observe that all 3 x 3 matrices, which are diagonally present are independent of other 3 x 3 adjacent matrices initially, as others are empty.
// 3 8 5 0 0 0 0 0 0
// 9 2 1 0 0 0 0 0 0
// 6 4 7 0 0 0 0 0 0
// 0 0 0 1 2 3 0 0 0
// 0 0 0 7 8 4 0 0 0
// 0 0 0 6 9 5 0 0 0
// 0 0 0 0 0 0 8 7 3
// 0 0 0 0 0 0 9 6 2
// 0 0 0 0 0 0 1 4 5
//
// (We can observe that in above matrix, the diagonal matrices are independent of other empty matrices initially). So if we fill them first, then we will only have to do box check and thus column/row check not required
//
// Secondly, while we fill rest of the non-diagonal elements, we will not have to use random generator, but we can fill recursively by checking 1 to 9.
//
// Following is the improved logic for the problem.
// 1. Fill all the diagonal 3x3 matrices.
// 2. Fill recursively rest of the non-diagonal matrices. For every cell to be filled, we try all numbers until we find a safe number to be placed.
// 3. Once matrix is fully filled, remove K elements randomly to complete game.
