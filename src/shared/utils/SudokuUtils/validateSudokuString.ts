export function validateSudokuString({ sudokuString }: { sudokuString: string }) {
    return /^([0-9]{3}\.[0-9]{3}\.[0-9]{3};){9}$/.test(sudokuString);
}
