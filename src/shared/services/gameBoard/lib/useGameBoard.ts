import { useContext, useState } from "react";

import { type GameBoardContextType, type GameBoardStateType, initialState } from "./GameBoardContext";

import { NotificationContext } from "../../snackbars/lib/NotificationsContext";
import { GameSettingsContext } from "../../gameSettings/lib/GameSettingsContext";

import type { SudokuBoard, SudokuCellPosition, SudokuValue } from "../../../models/internalAppRepresentation";

import { checkIfSudokuValueNotCollides } from "../../../utils/SudokuUtils/checkIfSudokuValueNotCollides";
import { searchForDuplicates } from "../../../utils/SudokuUtils/searchForDuplicates";
import { checkIfSudokuIsFilled } from "../../../utils/SudokuUtils/checkIfSudokuIsFilled";
import { backtrackingSudokuSolver } from "../../../utils/SudokuSolvers/backtrackingSudokuSolver";

export const useGameBoard = (): GameBoardContextType => {
    const [state, setState] = useState<GameBoardStateType>(initialState);
    const notification = useContext(NotificationContext);
    const gameSettings = useContext(GameSettingsContext);

    const setCurrentGameState = (actionPayload: GameBoardStateType) => {
        setState((prev) => {
            return {
                ...prev,
                ...actionPayload,
            };
        });
    };

    const focusCell = (actionPayload: SudokuCellPosition) => {
        setState((prev) => {
            return {
                ...prev,
                focusedCellPosition: actionPayload,
            };
        });
    };

    const blurCell = () => {
        setState((prev) => {
            return {
                ...prev,
                focusedCellPosition: null,
            };
        });
    };

    const toggleNotesMode = () => {
        setState((prev) => {
            return {
                ...prev,
                isNotesModeActive: !prev.isNotesModeActive,
            };
        });
    };

    const addValue = (actionPayload: SudokuValue) => {
        if (state.focusedCellPosition !== null) {
            if (state.isNotesModeActive) {
                addNote(actionPayload);
            } else if (gameSettings.autoPreventMistakes) {
                if (
                    checkIfSudokuValueNotCollides({
                        sudokuBoard: state.moves[state.moves.length - 1],
                        row: state.focusedCellPosition[0],
                        column: state.focusedCellPosition[1],
                        sudokuValue: actionPayload,
                    })
                ) {
                    submitValue(actionPayload);
                }
            } else {
                submitValue(actionPayload);
            }
        }
    };

    const submitValue = (actionPayload: SudokuValue) => {
        if (state.focusedCellPosition !== null) {
            const lastMove: SudokuBoard = JSON.parse(JSON.stringify(state.moves[state.moves.length - 1]));
            lastMove[state.focusedCellPosition[0]][state.focusedCellPosition[1]] = actionPayload;
            // state.moves.push(lastMove);

            const duplicates = searchForDuplicates({ sudokuBoard: lastMove });

            // win condition
            if (checkIfSudokuIsFilled(lastMove) && duplicates.length < 1) {
                notification.openSnackbar({
                    gameWonFlag: true,
                    title: "Game won!",
                    body: "Puzzle solved correctly",
                    severity: "success",
                });
            }

            setState((prev) => {
                return {
                    ...prev,
                    moves: [...prev.moves, lastMove],
                    duplicates: duplicates,
                };
            });
        }
    };

    const solveSudoku = () => {
        const lastMove: SudokuBoard = JSON.parse(JSON.stringify(state.moves[state.moves.length - 1]));
        backtrackingSudokuSolver({ sudokuBoard: lastMove });

        if (checkIfSudokuIsFilled(lastMove)) {
            notification.openSnackbar({
                gameWonFlag: true,
                title: "Game won!",
                body: "Puzzle solved correctly",
                severity: "success",
            });
        } else {
            notification.openSnackbar({
                gameWonFlag: false,
                title: "Complex problem!",
                body: "The puzzles are too complex for the backtracking algorithm",
                severity: "warning",
            });
        }

        setState((prev) => {
            return {
                ...prev,
                moves: [...prev.moves, lastMove],
                duplicates: [],
            };
        });
    };

    const addNote = (actionPayload: SudokuValue) => {
        if (state.focusedCellPosition !== null) {
            const cellPosition0 = state.focusedCellPosition[0];
            const cellPosition1 = state.focusedCellPosition[1];
            for (let i = 0; i < 9; i++) {
                if (state.cellsNotes[cellPosition0][cellPosition1][i] === 0) {
                    setState((prev) => {
                        const newCellNotes = [...prev.cellsNotes];
                        newCellNotes[cellPosition0][cellPosition1][i] = actionPayload;
                        return {
                            ...prev,
                            cellsNotes: [...newCellNotes],
                        };
                    });
                    console.log(state.cellsNotes);
                    // state.cellsNotes[state.focusedCellPosition[0]][state.focusedCellPosition[1]][i] = action.payload; // row, col, note
                    break;
                }
            }
        }
    };

    const removeValue = () => {
        if (state.focusedCellPosition !== null) {
            if (state.isNotesModeActive) {
                removeNote();
            } else {
                submitValue(0);
            }
        }
    };

    const removeNote = () => {
        if (state.focusedCellPosition !== null) {
            const cellPosition0 = state.focusedCellPosition[0];
            const cellPosition1 = state.focusedCellPosition[1];

            let index = state.cellsNotes[cellPosition0][cellPosition1].length;

            while (index-- && state.cellsNotes[cellPosition0][cellPosition1][index] === 0 && index >= 0);

            console.log(index);
            if (index >= 0) {
                // state.cellsNotes[state.focusedCellPosition[0]][state.focusedCellPosition[1]][index] = null;
                setState((prev) => {
                    const newCellNotes = [...prev.cellsNotes];
                    newCellNotes[cellPosition0][cellPosition1][index] = 0;
                    return {
                        ...prev,
                        cellsNotes: [...newCellNotes],
                    };
                });
            }
        }
    };

    const undoMove = () => {
        if (state.moves.length > 1) {
            // state.moves.pop();
            setState((prev) => {
                const moves = [...prev.moves];
                moves.pop();
                return {
                    ...prev,
                    moves: moves,
                };
            });
        }
    };

    const newGame = (actionPayload: SudokuBoard) => {
        // state.originalBoard = action.payload;
        // state.moves = [action.payload];

        setState((prev) => {
            return {
                ...prev,
                moves: [actionPayload],
                originalBoard: actionPayload,
            };
        });
    };

    return {
        ...state,
        toggleNotesMode,
        addValue,
        blurCell,
        focusCell,
        newGame,
        setCurrentGameState,
        undoMove,
        solveSudoku,
        removeValue,
    };
};
