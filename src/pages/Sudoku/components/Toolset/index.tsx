import type { SxProps } from "@mui/material";

import Box from "@mui/material/Box";

import KeyboardButton from "../KeyboardButton";
import ToggleSwitch from "../../../../shared/components/inputs/ToggleSwitch";
import { useContext } from "react";
import { GameBoardContext } from "../../../../shared/services/gameBoard/lib/GameBoardContext";

const KeyboardElement: SxProps = {
    margin: "5px",
    width: "18%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
};

const KeyboardTop: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
};

const Toolset = () => {
    const gameBoard = useContext(GameBoardContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
                width: "500px",
                height: "120px",
                margin: 10,
            }}
        >
            <Box sx={KeyboardTop}>
                <Box
                    sx={{
                        // height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // bgcolor: "primary.main",
                    }}
                >
                    {/* <KeyboardButton mode="erase" value="notes" /> */}
                    <Box sx={{ margin: 2 }}>Notes mode:</Box>
                    <ToggleSwitch
                        isChecked={gameBoard.isNotesModeActive}
                        callback={() => {
                            gameBoard.toggleNotesMode();
                        }}
                    />
                </Box>
                <Box sx={KeyboardElement}>
                    <KeyboardButton mode="auto-solve" value="auto solve" />
                </Box>
            </Box>
            <Box sx={KeyboardTop}>
                <Box sx={KeyboardElement}>
                    <KeyboardButton mode="undo" value="undo" />
                </Box>
                <Box sx={KeyboardElement}>
                    <KeyboardButton mode="erase" value="erase" />
                </Box>
                <Box sx={KeyboardElement}>
                    <KeyboardButton mode="stop-timer" value="pause timer" />
                </Box>
                <Box sx={KeyboardElement}>
                    <KeyboardButton mode="reset-timer" value="reset timer" />
                </Box>
            </Box>
        </Box>
    );
};

export default Toolset;
