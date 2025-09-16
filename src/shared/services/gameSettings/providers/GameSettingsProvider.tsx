import { GameSettingsContext } from "../lib/GameSettingsContext";
import { useGameSettings } from "../lib/useGameSettings";

export default function GameSettingsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const gameSettings = useGameSettings();

    return <GameSettingsContext.Provider value={gameSettings}>{children}</GameSettingsContext.Provider>;
}
