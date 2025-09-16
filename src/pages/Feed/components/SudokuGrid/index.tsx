import { useContext } from "react";

import { AnimatePresence, motion } from "motion/react";

import { styled } from "@mui/material";

import { FeedContext } from "../../../../shared/services/feed/lib/FeedContext";
import { type SudokuModelType } from "../../../../shared/models/internalAppRepresentation";
import SudokuCard from "../SudokuCard";

const SudokuGrid = () => {
    const feed = useContext(FeedContext);

    return (
        <motion.div layout>
            <AnimatePresence>
                <GameBanners>
                    {feed.sudokus.map((sudoku: SudokuModelType, index: number) => (
                        <SudokuCard key={index} sudoku={sudoku} />
                    ))}
                </GameBanners>
            </AnimatePresence>
        </motion.div>
    );
};

export default SudokuGrid;

const GameBanners = styled("section")`
    ${({ theme }) => `
        width: 90vw;

        margin: 20px;

        display: grid;
        grid-template-columns: repeat(auto-fit, 250px);
        @media (max-width: ${theme.breakpoints.values.sm}px) {
            grid-template-columns: repeat(auto-fit, 200px);
        }
        grid-column-gap: 1rem;
        grid-row-gap: 2rem;
        align-content: center;
        justify-content: center;
  `}
`;
