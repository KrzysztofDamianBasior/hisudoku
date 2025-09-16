import { DialogsContext } from "../lib/DialogsContext";
import DialogsManager from "../lib/DialogsManager";
import useDialogs from "../lib/useDialogs";

export default function DialogsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { gameSettingsDialogManager, generateSudokuDialogManager } = useDialogs();

    return (
        <DialogsContext.Provider
            value={{
                gameSettingsDialogManager,
                generateSudokuDialogManager,
            }}
        >
            <DialogsManager />
            {children}
        </DialogsContext.Provider>
    );
}
