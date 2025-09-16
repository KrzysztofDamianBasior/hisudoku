import { useState } from "react";

import { type FeedContextType, type FeedStateType, initialState } from "./FeedContext";

import type { SudokuModelType } from "../../../models/internalAppRepresentation";

export const useFeed = (): FeedContextType => {
    const [state, setState] = useState<FeedStateType>(initialState);

    const setFeed = (actionPayload: FeedStateType) => {
        // state = action.payload;
        setState((prev) => {
            return {
                ...prev,
                ...actionPayload,
            };
        });
    };
    const removeSudoku = (actionPayload: { sudokuId: number }) => {
        const removedSudokuIdx = state.sudokus.findIndex((sudoku) => sudoku.id === actionPayload.sudokuId);

        const sudokus = state.sudokus.splice(removedSudokuIdx, 1);

        if (removedSudokuIdx >= 0) {
            //state.sudokus.splice(removedSudokuIdx, 1);
            setState((prev) => {
                return {
                    ...prev,
                    sudokus: sudokus,
                };
            });
        }
    };

    const addSudoku = (actionPayload: SudokuModelType) => {
        // state.sudokus.unshift(action.payload); // adds the specified elements to the beginning of an array
        const sudokus = [...state.sudokus];
        sudokus.unshift(actionPayload);

        setState((prev) => {
            return {
                ...prev,
                sudokus: sudokus,
            };
        });
    };

    // const updateSudoku = (actionPayload: SudokuModelType) => {
    //     const updatedSudokuIdx = state.sudokus.findIndex((sudoku) => sudoku.id === action.payload.id);
    //     if (updatedSudokuIdx >= 0) {
    //         state.sudokus[updatedSudokuIdx] = action.payload;
    //     }
    // };

    return {
        ...state,
        addSudoku,
        removeSudoku,
        setFeed,
    };
};
