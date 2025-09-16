import { useContext } from "react";

import { keyframes } from "@emotion/react";
import { styled } from "@mui/material";

import ActionButton from "../../../../shared/components/inputs/ActionButton";
import { DialogsContext } from "../../../../shared/services/dialogs/lib/DialogsContext";

const GameCreator = () => {
    const dialogs = useContext(DialogsContext);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <h2
                style={{
                    display: "block",
                    fontWeight: 800,
                    fontSize: "8.5vw",
                    textTransform: "uppercase",
                }}
            >
                <FirstWordContainer>LET&apos;S </FirstWordContainer>
                <SecondWordContainer>PLAY </SecondWordContainer>
                <ThirdWordContainer>A </ThirdWordContainer>
                <FourthWordContainer>GAME</FourthWordContainer>
            </h2>
            <ActionButton
                onClick={() => {
                    dialogs.generateSudokuDialogManager.openDialog();
                }}
            >
                Generate New Sudoku
            </ActionButton>
        </div>
    );
};

export default GameCreator;

const firstWordAnimation = keyframes`
    0% { color: #df8453; }
    32% { color: #df8453; }
    33% { color: #3d8dae; }
    65% { color: #3d8dae; }
    66% { color: #e4a9a8; }
    99% { color: #e4a9a8; }
    100% { color: #df8453;}
`;

const FirstWordContainer = styled("span")`
    animation: ${firstWordAnimation} 4s linear infinite;
`;

const secondWordAnimation = keyframes`
    0% { color: #dbad4a; }
    32% { color: #dbad4a; }
    33% { color: #accfcb; }
    65% { color: #accfcb; }
    66% { color: #17494d; }
    99% { color: #17494d; }
    100% { color: #dbad4a;}
`;

const SecondWordContainer = styled("span")`
    animation: ${secondWordAnimation} 4s linear infinite;
`;

const thirdWordAnimation = keyframes`
    0% { color: #accfcb; }
    32% { color: #accfcb; }
    33% { color: #e4a9a8; }
    65% { color: #e4a9a8; }
    66% { color: #accfcb; }
    99% { color: #accfcb; }
    100% { color: #accfcb;}
`;

const ThirdWordContainer = styled("span")`
    animation: ${thirdWordAnimation} 4s linear infinite;
`;

const fourthWordAnimation = keyframes`
    0% { color: #3d8dae; }
    32% { color: #3d8dae; }
    33% { color: #df8453; }
    65% { color: #df8453; }
    66% { color: #e4a9a8; }
    99% { color: #e4a9a8; }
    100% { color: #3d8dae;}
`;

const FourthWordContainer = styled("span")`
    animation: ${fourthWordAnimation} 4s linear infinite;
`;
