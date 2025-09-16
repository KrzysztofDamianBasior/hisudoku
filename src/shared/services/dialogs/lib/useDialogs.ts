import { useState } from "react";

import {
    type GameSettingsDialogManagerType,
    type GenerateSudokuDialogManagerType,
    type DialogsContextType,
} from "./DialogsContext";

const gameSettingsDialogInitialState = {
    isGameSettingsDialogOpened: false,
};

const generateSudokuDialogInitialState = {
    isGenerateSudokuDialogOpened: false,
};

const useDialogs = (): DialogsContextType => {
    const [gameSettingsDialogState, setGameSettingsDialogState] = useState<{
        isGameSettingsDialogOpened: boolean;
    }>(gameSettingsDialogInitialState);

    const [generateSudokuDialogState, setGenerateSudokuDialogState] = useState<{
        isGenerateSudokuDialogOpened: boolean;
    }>(generateSudokuDialogInitialState);

    ///////////////////////////////////////////////////////

    const openGameSettingsDialog = () => {
        setGameSettingsDialogState((prev) => {
            return {
                ...prev,
                isGameSettingsDialogOpened: true,
            };
        });
    };

    const closeGameSettingsDialog = () => {
        setGameSettingsDialogState((prev) => {
            return {
                ...prev,
                isGameSettingsDialogOpened: false,
            };
        });
    };

    ///////////////////////////////////////////////////////

    const openGenerateSudokuDialog = () => {
        setGenerateSudokuDialogState((prev) => {
            return {
                ...prev,
                isGenerateSudokuDialogOpened: true,
            };
        });
    };

    const closeGenerateSudokuDialog = () => {
        setGenerateSudokuDialogState((prev) => {
            return {
                ...prev,
                isGenerateSudokuDialogOpened: false,
            };
        });
    };

    ///////////////////////////////////////////////////////
    const gameSettingsDialogManager: GameSettingsDialogManagerType = {
        ...gameSettingsDialogState,
        closeDialog: closeGameSettingsDialog,
        openDialog: openGameSettingsDialog,
    };

    const generateSudokuDialogManager: GenerateSudokuDialogManagerType = {
        ...generateSudokuDialogState,
        closeDialog: closeGenerateSudokuDialog,
        openDialog: openGenerateSudokuDialog,
    };

    return {
        gameSettingsDialogManager,
        generateSudokuDialogManager,
    };
};

export default useDialogs;
