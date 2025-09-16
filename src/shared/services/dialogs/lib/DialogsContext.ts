import { createContext } from "react";

export type DialogsContextType = {
    gameSettingsDialogManager: GameSettingsDialogManagerType;
    generateSudokuDialogManager: GenerateSudokuDialogManagerType;
};

export type GameSettingsDialogManagerType = {
    isGameSettingsDialogOpened: boolean;
    openDialog: () => void;
    closeDialog: () => void;
};

export type GenerateSudokuDialogManagerType = {
    isGenerateSudokuDialogOpened: boolean;
    openDialog: () => void;
    closeDialog: () => void;
};

export const dialogsInitialManager: DialogsContextType = {
    gameSettingsDialogManager: {
        isGameSettingsDialogOpened: false,
        openDialog: async () => {},
        closeDialog: async () => {},
    },
    generateSudokuDialogManager: {
        isGenerateSudokuDialogOpened: false,
        openDialog: async () => {},
        closeDialog: async () => {},
    },
};

export const DialogsContext = createContext<DialogsContextType>(dialogsInitialManager);
