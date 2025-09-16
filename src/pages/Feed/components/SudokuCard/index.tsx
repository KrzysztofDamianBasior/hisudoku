import { useContext } from "react";
import { useNavigate } from "react-router";

import { styled, Typography } from "@mui/material";

import { motion } from "motion/react";

import SudokuThumb from "../SudokuThumb";

import {
    GameBoardContext,
    generateGameBoardInitialState,
} from "../../../../shared/services/gameBoard/lib/GameBoardContext";
import { stringToSudokuBoard } from "../../../../shared/utils/SudokuUtils/stringToSudokuBoard";
import { type SudokuModelType } from "../../../../shared/models/internalAppRepresentation";

type Props = {
    sudoku: SudokuModelType;
};

const SudokuCard = ({ sudoku }: Props) => {
    const gameBoard = useContext(GameBoardContext);
    const navigate = useNavigate();

    const onClick = () => {
        gameBoard.setCurrentGameState(
            generateGameBoardInitialState({
                originalBoard: stringToSudokuBoard({ sudokuString: sudoku.content }),
                sudokuInfo: sudoku,
            })
        );
        navigate("/sudoku");
    };

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2 }}
        >
            <PlacardContainer onClick={onClick}>
                <Typography>{"Id: " + sudoku.id}</Typography>
                <Typography>{"Difficulty level: " + sudoku.level}</Typography>
                <Typography>{"Created at: " + sudoku.createdAt}</Typography>
                <SudokuThumb sudokuString={sudoku.content} />
            </PlacardContainer>
        </motion.div>
    );
};

export default SudokuCard;

const PlacardContainer = styled("button")(
    ({ theme }) => `
        background: transparent;

        width: 100%;
        height: 280px;
        @media (max-width: ${theme.breakpoints.values.sm}px) {
            height: 230px;
        }

        color: ${theme.palette.secondary.main};
        text-transform: uppercase;
        font-size: 0.7rem;

        border: none;
        border-radius: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 90%;
            object-fit: cover;
            border-radius: 1rem;
        }

        &:hover {
            filter: brightness(1.2);
            cursor: pointer;
            border: dashed ${theme.palette.secondary.main};
        }

        overflow: hidden;
    `
);
