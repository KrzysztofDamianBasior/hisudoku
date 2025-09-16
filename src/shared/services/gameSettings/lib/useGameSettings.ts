import { useState } from "react";
import { type GameSettingsContextState, type GameSettingsContextType, initialState } from "./GameSettingsContext";

export const useGameSettings = (): GameSettingsContextType => {
    const [gameSettingsState, setGameSettingsState] = useState<GameSettingsContextState>(initialState);

    const setTimerVisiblity = (newState: boolean) => {
        setGameSettingsState((prev) => {
            return {
                ...prev,
                isTimerVisible: newState,
            };
        });
    };
    const setRegionHighlightingVisiblity = (newState: boolean) => {
        setGameSettingsState((prev) => {
            return {
                ...prev,
                isRegionHighlightingVisible: newState,
            };
        });
    };
    const setRowColumnHighlightingVisiblity = (newState: boolean) => {
        setGameSettingsState((prev) => {
            return {
                ...prev,
                isRowColumnHighlightingVisible: newState,
            };
        });
    };
    const setAutoPreventMistakes = (newState: boolean) => {
        setGameSettingsState((prev) => {
            return {
                ...prev,
                autoPreventMistakes: newState,
            };
        });
    };
    const setAutoRemoveNotes = (newState: boolean) => {
        setGameSettingsState((prev) => {
            return {
                ...prev,
                autoRemoveNotes: newState,
            };
        });
    };

    return {
        ...gameSettingsState,
        setAutoPreventMistakes,
        setAutoRemoveNotes,
        setRegionHighlightingVisiblity,
        setRowColumnHighlightingVisiblity,
        setTimerVisiblity,
    };
};
