import React, { useContext } from "react";
import { useNavigate } from "react-router";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import Draggable from "react-draggable";

import { FeedContext } from "../../../services/feed/lib/FeedContext";
import { DialogsContext } from "../../../services/dialogs/lib/DialogsContext";
import { NotificationContext } from "../../../services/snackbars/lib/NotificationsContext";
import { GameBoardContext, generateGameBoardInitialState } from "../../../services/gameBoard/lib/GameBoardContext";
import { generateDiagonalSudoku } from "../../../utils/SudokuGenerators/generateDiagonalSudoku";
import { generateSudoku } from "../../../utils/SudokuGenerators/generateSudoku";
import { sudokuBoardToString } from "../../../utils/SudokuUtils/sudokuBoardToString";
import { stringToSudokuBoard } from "../../../utils/SudokuUtils/stringToSudokuBoard";

import { type SudokuModelType } from "../../../models/internalAppRepresentation";

type GeneratedSudokuKindType = "none" | "diagonal" | "easy" | "medium" | "hard";

const GenerateSudokuDialog = () => {
    const feed = useContext(FeedContext);
    const dialogs = useContext(DialogsContext);
    const gameBoard = useContext(GameBoardContext);
    const notifications = useContext(NotificationContext);
    const navigate = useNavigate();

    const [generatedSudokuKind, setGeneratedSudokuKind] = React.useState<GeneratedSudokuKindType>("none");
    const [isLoading, setisLoading] = React.useState<boolean>(false);

    // If you want to find the object with max Id :
    // const item = feed.sudokus.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)
    // If you want to find the object with min Id :
    // const item = feed.sudokus.reduce((prev, current) => (+prev.id < +current.id) ? prev : current)
    // If you wnat to find the max Id :
    // const max = Math.max.apply(null, feed.sudokus.map(item => item.id));
    // If you want to find the min Id :
    // const min = Math.min.apply(null, feed.sudokus.map(item => item.id));

    const handleClose = () => {
        dialogs.generateSudokuDialogManager.closeDialog();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setGeneratedSudokuKind(event.target.value as GeneratedSudokuKindType);
    };

    const handleSubmit = () => {
        if (generatedSudokuKind !== "none") {
            setisLoading(true);

            switch (generatedSudokuKind) {
                case "diagonal":
                    modifyGameState(createDiagonalSudoku());
                    break;
                case "easy":
                    modifyGameState(createEasySudoku());
                    break;
                case "medium":
                    modifyGameState(createMediumSudoku());
                    break;
                case "hard":
                    modifyGameState(createHardSudoku());
                    break;
            }

            notifications.openSnackbar({
                severity: "success",
                title: "Success",
                body: "A new sudoku has been generated",
                gameWonFlag: false,
            });

            setisLoading(false);

            dialogs.generateSudokuDialogManager.closeDialog();
        }
    };

    const modifyGameState = (sudoku: SudokuModelType) => {
        feed.addSudoku(sudoku);
        gameBoard.setCurrentGameState(
            generateGameBoardInitialState({
                originalBoard: stringToSudokuBoard({ sudokuString: sudoku.content }),
                sudokuInfo: sudoku,
            })
        );
        navigate("/sudoku");
    };

    const createCurrentDateTime = () => {
        const currentdate = new Date();
        // 7/9/2025 | 23:48:31
        const datetime =
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " | " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();
        return datetime;
    };

    const createEasySudoku = (): SudokuModelType => {
        return {
            origin: "automatically generated",
            content: sudokuBoardToString({ sudokuBoard: generateSudoku({ difficulty: "EASY" }) }),
            createdAt: createCurrentDateTime(),
            id: Date.now(),
            level: "easy",
        };
    };
    const createMediumSudoku = (): SudokuModelType => {
        return {
            origin: "automatically generated",
            content: sudokuBoardToString({ sudokuBoard: generateSudoku({ difficulty: "MEDIUM" }) }),
            createdAt: createCurrentDateTime(),
            id: Date.now(),
            level: "medium",
        };
    };
    const createHardSudoku = (): SudokuModelType => {
        return {
            origin: "automatically generated",
            content: sudokuBoardToString({ sudokuBoard: generateSudoku({ difficulty: "HARD" }) }),
            createdAt: createCurrentDateTime(),
            id: Date.now(),
            level: "hard",
        };
    };
    const createDiagonalSudoku = (): SudokuModelType => {
        return {
            origin: "automatically generated",
            content: sudokuBoardToString({ sudokuBoard: generateDiagonalSudoku() }),
            createdAt: createCurrentDateTime(),
            id: Date.now(),
            level: "easy",
        };
    };

    return (
        <Dialog
            open={dialogs.generateSudokuDialogManager.isGenerateSudokuDialogOpened}
            onClose={handleClose}
            scroll={"paper"}
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                Generate Sudoku
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        marginTop: "5%",
                        display: "flex",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ justifySelf: "start", m: 2 }}>Choose sudoku kind:</Box>
                    <Box style={{ justifySelf: "end" }}>
                        <FormControl variant="filled" sx={{ m: 2, minWidth: 120 }}>
                            <InputLabel id="select-filled-label">Generator type:</InputLabel>
                            <Select
                                labelId="select-filled-label"
                                id="simple-select-filled"
                                value={generatedSudokuKind}
                                onChange={handleChange}
                                label="Generator type"
                            >
                                <MenuItem value="none">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="diagonal">diagonal</MenuItem>
                                <MenuItem value="easy">easy</MenuItem>
                                <MenuItem value="medium">medium</MenuItem>
                                <MenuItem value="hard">hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleClose} loading={isLoading}>
                    Close
                </Button>
                <Button
                    variant="outlined"
                    autoFocus
                    onClick={handleSubmit}
                    loading={isLoading}
                    disabled={generatedSudokuKind === "none"}
                >
                    Generate
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function PaperComponent(props: PaperProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    return (
        <Draggable
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default GenerateSudokuDialog;
