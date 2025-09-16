import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

import { type SudokuValue } from "../../../../shared/models/internalAppRepresentation";
import { GameBoardContext } from "../../../../shared/services/gameBoard/lib/GameBoardContext";
import { findRegionContainingSudokuCell } from "../../../../shared/utils/SudokuUtils/findRegionContainingSudokuCell";
import { validateSudokuValue } from "../../../../shared/utils/SudokuUtils/validateSudokuValue";
import { GameSettingsContext } from "../../../../shared/services/gameSettings/lib/GameSettingsContext";

type Props = {
    row: number;
    col: number;
};

const SudokuCell = ({ row, col }: Props) => {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down("md")); // Variable for media query
    const settings = useContext(GameSettingsContext);

    const [rowBacklight, setRowBacklight] = useState<boolean>(false);
    const [columnBacklight, setColumnBacklight] = useState<boolean>(false);
    const [regionBacklight, setRegionBacklight] = useState<boolean>(false);

    const gameBoard = useContext(GameBoardContext);

    const cellValue: SudokuValue = gameBoard.moves[gameBoard.moves.length - 1][row][col];
    const cellNotes: SudokuValue[] = gameBoard.cellsNotes[row][col];

    const isCellADuplicate = gameBoard.duplicates.some(
        (coordinates) => coordinates[0] === row && coordinates[1] === col
    );

    useEffect(() => {
        if (gameBoard.focusedCellPosition !== null) {
            if (row === gameBoard.focusedCellPosition[0] && settings.isRowColumnHighlightingVisible) {
                setRowBacklight(true);
            } else {
                setRowBacklight(false);
            }
            if (col === gameBoard.focusedCellPosition[1] && settings.isRowColumnHighlightingVisible) {
                setColumnBacklight(true);
            } else {
                setColumnBacklight(false);
            }
            if (
                findRegionContainingSudokuCell(gameBoard.focusedCellPosition) ===
                    findRegionContainingSudokuCell([row, col]) &&
                settings.isRegionHighlightingVisible
            ) {
                setRegionBacklight(true);
            } else {
                setRegionBacklight(false);
            }
        } else {
            setRowBacklight(false);
            setColumnBacklight(false);
            setRegionBacklight(false);
        }
    }, [
        gameBoard.focusedCellPosition,
        col,
        row,
        settings.isRowColumnHighlightingVisible,
        settings.isRegionHighlightingVisible,
    ]);

    return (
        <Box
            sx={{
                width: matchesMd ? "40px" : "60px",
                height: matchesMd ? "40px" : "60px",
                border: isCellADuplicate ? "2px solid lime" : "1px solid black",
                position: "relative",
                transition: "background-color 0.5s",
                bgcolor: (theme) => {
                    if (
                        gameBoard.focusedCellPosition &&
                        gameBoard.focusedCellPosition[0] === row &&
                        gameBoard.focusedCellPosition[1] === col
                    ) {
                        return theme.palette.mode === "light"
                            ? theme.palette.secondary.light
                            : theme.palette.secondary.dark;
                    }
                    if (regionBacklight) {
                        return theme.palette.primary.main;
                    }
                    if (rowBacklight || columnBacklight) {
                        return theme.palette.mode === "light"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark;
                    }
                    return theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[900];
                },
            }}
        >
            <Box
                sx={{
                    color: "text.disabled",
                    fontSize: matchesMd ? "8px" : "15px",
                    lineHeight: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: matchesMd ? "1px" : "2px",
                    width: 1,
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        lineHeight: 1,
                    }}
                >
                    <Box>{cellNotes[0] !== 0 && cellNotes[0]}</Box>
                    <div className="sudoku-note">{cellNotes[1] !== 0 && cellNotes[1]}</div>
                    <div className="sudoku-note">{cellNotes[2] !== 0 && cellNotes[2]}</div>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        lineHeight: 1,
                    }}
                >
                    <div className="sudoku-note">{cellNotes[3] !== 0 && cellNotes[3]}</div>
                    <div className="sudoku-note">{cellNotes[4] !== 0 && cellNotes[4]}</div>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        lineHeight: 1,
                    }}
                >
                    <div className="sudoku-note">{cellNotes[5] !== 0 && cellNotes[5]}</div>
                    <div className="sudoku-note">{cellNotes[6] !== 0 && cellNotes[6]}</div>
                    <div className="sudoku-note">{cellNotes[7] !== 0 && cellNotes[7]}</div>
                    <div className="sudoku-note">{cellNotes[8] !== 0 && cellNotes[8]}</div>
                </Box>
            </Box>
            <Box
                sx={{
                    position: "relative",
                    backgroundColor: "transparent",
                    width: 1,
                    height: 1,
                    "& > input": {
                        fontSize: "30px",
                        bgcolor: "transparent",
                        textAlign: "center",
                        width: 1,
                        height: 1,
                        outline: 0,
                        border: 0,
                        color: "text.primary",
                        "&:disabled": {
                            bgcolor: (theme) =>
                                theme.palette.mode === "light" ? theme.palette.grey[500] : theme.palette.grey[800],
                            color: "text.secondary",
                        },
                    },
                }}
            >
                <input
                    value={cellValue === 0 ? "" : cellValue}
                    onFocus={() => {
                        gameBoard.focusCell([row, col]);
                    }}
                    // onBlur={() => {
                    //   dispatch(blurCell());
                    // }}
                    disabled={gameBoard.originalBoard![row][col] !== 0}
                    onChange={(event) => {
                        const sudokuValue = parseInt(event.target.value.slice(-1));
                        if (validateSudokuValue(sudokuValue)) {
                            gameBoard.addValue(sudokuValue);
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default SudokuCell;
