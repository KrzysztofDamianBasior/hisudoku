import SudokuGrid from "./components/SudokuGrid";
import WavyBackground from "../../shared/components/backgrounds/WavyBackground";

import { styled, Typography } from "@mui/material";

export default function FeedPage() {
    return (
        <WavyBackground>
            <Container>
                <Typography variant="h1" component="h1" sx={{ margin: 2 }}>
                    Sudoku Feed
                </Typography>

                <SudokuGrid />
            </Container>
        </WavyBackground>
    );
}

const Container = styled("main")`
    width: 100%;
    height: 100%;
    padding-top: 4em;
    padding-bottom: 12em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
