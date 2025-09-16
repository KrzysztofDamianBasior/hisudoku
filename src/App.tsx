import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router";

import ThemeProvider from "./shared/services/theme/providers/ThemeProvider";
import MUIProvider from "./shared/services/mui/providers/MUIProvider";
import SnackbarsProvider from "./shared/services/snackbars/providers/SnackbarsProvider";
import DialogsProvider from "./shared/services/dialogs/providers/DialogsProvider";
import GameSettingsProvider from "./shared/services/gameSettings/providers/GameSettingsProvider";
import FeedProvider from "./shared/services/feed/providers/FeedProvider";
import GameBoardProvider from "./shared/services/gameBoard/providers/GameBoardProvider";

import CoreRoutes from "./router/routes/CoreRoutes";

import ErrorBoundary from "./pages/Error";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <MUIProvider>
                    <SnackbarsProvider>
                        <GameSettingsProvider>
                            <FeedProvider>
                                <ErrorBoundary>
                                    <GameBoardProvider>
                                        <DialogsProvider>
                                            <AnimatePresence mode="wait">
                                                <CoreRoutes />
                                            </AnimatePresence>
                                        </DialogsProvider>
                                    </GameBoardProvider>
                                </ErrorBoundary>
                            </FeedProvider>
                        </GameSettingsProvider>
                    </SnackbarsProvider>
                </MUIProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
