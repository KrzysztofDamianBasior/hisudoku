import { GameBoardContext } from "../lib/GameBoardContext";
import { useGameBoard } from "../lib/useGameBoard";

export default function GameBoardProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const gameBoard = useGameBoard();

    return <GameBoardContext.Provider value={gameBoard}>{children}</GameBoardContext.Provider>;
}
