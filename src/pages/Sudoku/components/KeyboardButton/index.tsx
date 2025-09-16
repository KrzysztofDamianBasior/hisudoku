import { styled } from "@mui/material";

import { GameBoardContext } from "../../../../shared/services/gameBoard/lib/GameBoardContext";
import { validateSudokuValue } from "../../../../shared/utils/SudokuUtils/validateSudokuValue";

import { useContext } from "react";
import { TimerContext } from "../Timer/TimerContext";

type Props = {
    mode: "number" | "undo" | "erase" | "auto-solve" | "stop-timer" | "reset-timer";
    value: number | string;
};

const KeyboardButton = ({ mode, value }: Props) => {
    const gameBoard = useContext(GameBoardContext);
    const stopwatch = useContext(TimerContext);

    return (
        <RaisedButton
            onClick={() => {
                if (mode === "number" && typeof value === "number") {
                    if (validateSudokuValue(value)) {
                        gameBoard.addValue(value);
                    }
                } else if (mode === "erase") {
                    gameBoard.removeValue();
                    // gameBoard.blurCell();
                } else if (mode === "undo") {
                    gameBoard.undoMove();
                    gameBoard.blurCell();
                } else if (mode === "reset-timer") {
                    stopwatch.resetStopwatch();
                } else if (mode === "stop-timer") {
                    stopwatch.pauseStopwatch();
                } else if (mode === "auto-solve") {
                    gameBoard.solveSudoku();
                }
            }}
        >
            <ButtonEdge backgroundHue="200"></ButtonEdge>
            <ButtonFront className="buttonFront" backgroundHue="200" color="white">
                {value}
            </ButtonFront>
        </RaisedButton>
    );
};

export default KeyboardButton;

const ButtonEdge = styled("span")<{ backgroundHue: string }>(({ backgroundHue }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    background: `linear-gradient(
        to left,
        hsl(${backgroundHue}deg 100% 16%) 0%,
        hsl(${backgroundHue}deg 100% 32%) 8%,
        hsl(${backgroundHue}deg 100% 32%) 92%,
        hsl(${backgroundHue}deg 100% 16%) 100%
    );`,
}));

const ButtonFront = styled("span")<{ backgroundHue: string; color: string }>(({ backgroundHue, color }) => ({
    background: `hsl(${backgroundHue}deg 100% 47%)`,
    color: color,
    position: "relative",
    width: "100%",
    height: "90%",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.25rem",
    padding: "12px 42px",
    willChange: "transform",
    transform: "translateY(-4px)",
    transition: "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1)",
}));

const RaisedButton = styled("button")(() => ({
    border: "none",
    position: "relative",
    width: "100%",
    height: "100%",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    transition: "filter 250ms",
    userSelect: "none",
    touchAction: "manipulation",
    "&:hover": {
        filter: "brightness(150%)",
    },
    "&:hover .buttonFront": {
        transform: "translateY(-6px)",
        transition: "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
    },
    "&:active .buttonFront": {
        transform: "translateY(-2px)",
        transition: "transform 30ms",
    },
}));
