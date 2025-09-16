import { createContext } from "react";

export type GameSettingsContextState = {
    isTimerVisible: boolean;
    isRegionHighlightingVisible: boolean;
    isRowColumnHighlightingVisible: boolean;
    autoPreventMistakes: boolean;
    autoRemoveNotes: boolean;
};

export type GameSettingsContextType = GameSettingsContextState & {
    setTimerVisiblity: (newState: boolean) => void;
    setRegionHighlightingVisiblity: (newState: boolean) => void;
    setRowColumnHighlightingVisiblity: (newState: boolean) => void;
    setAutoPreventMistakes: (newState: boolean) => void;
    setAutoRemoveNotes: (newState: boolean) => void;
};

export const initialState = {
    isTimerVisible: true,
    isRegionHighlightingVisible: true,
    isRowColumnHighlightingVisible: true,
    autoPreventMistakes: false,
    autoRemoveNotes: false,
};

export const initialContext: GameSettingsContextType = {
    ...initialState,
    setAutoPreventMistakes: () => {},
    setAutoRemoveNotes: () => {},
    setRegionHighlightingVisiblity: () => {},
    setRowColumnHighlightingVisiblity: () => {},
    setTimerVisiblity: () => {},
};

export const GameSettingsContext = createContext<GameSettingsContextType>(initialContext);
