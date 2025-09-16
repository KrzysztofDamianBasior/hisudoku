import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

import SudokuBoard from "./components/SudokuBoard";
import Timer from "./components/Timer";
import SudokuKeyboard from "./components/SudokuKeyboard";
import Toolset from "./components/Toolset";
import StopwatchProvider from "./components/Timer/StopwatchProvider";

import SideBar from "../../shared/components/others/SideBar";
import Footer from "../../shared/components/others/Footer";
import { GameSettingsContext } from "../../shared/services/gameSettings/lib/GameSettingsContext";

export default function SudokuPage() {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down("lg")); // Variable for media query
    const settings = useContext(GameSettingsContext);

    return (
        <StopwatchProvider>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        // minHeight: "100%",
                        minHeight: "100%",
                        display: "flex",
                        flexDirection: matchesMd ? "column" : "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SideBar />
                    <Box
                        sx={{
                            // minHeight: "100%",
                            minHeight: "100%",
                            marginLeft: "30px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {settings.isTimerVisible && <Timer />}
                        <Toolset />
                        {!matchesMd && <SudokuKeyboard />}
                    </Box>
                    <SudokuBoard />
                </Box>
                <Footer />
            </Box>
        </StopwatchProvider>
    );
}
