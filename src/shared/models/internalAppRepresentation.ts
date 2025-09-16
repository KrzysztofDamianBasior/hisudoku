export type SudokuValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SudokuBoard = SudokuValue[][];

export type SudokuCellPosition = [number, number];

export type SudokuModelType = {
    origin: string;
    level: "easy" | "medium" | "hard";
    content: string;
    createdAt: string;
    id: number;
};
