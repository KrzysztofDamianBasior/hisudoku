import { type SudokuBoard } from "../../../../shared/models/internalAppRepresentation";
import { stringToSudokuBoard } from "../../../../shared/utils/SudokuUtils/stringToSudokuBoard";

import { Box, styled, useTheme } from "@mui/material";

type Props = { sudokuString: string };

const SudokuThumb = ({ sudokuString }: Props) => {
    const theme = useTheme();

    const sudokuBoard: SudokuBoard = stringToSudokuBoard({ sudokuString });

    return (
        <SudokuTable
            innerBorderColor={theme.palette.mode === "light" ? "black" : "black"}
            outerBorderColor={theme.palette.mode === "light" ? "black" : "black"}
        >
            <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rindex) => {
                    return (
                        <tr key={rindex} className={(row + 1) % 3 === 0 ? "bBorder" : ""}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cindex) => {
                                return (
                                    <td key={cindex} className={(col + 1) % 3 === 0 ? "rBorder" : ""}>
                                        <Box
                                            sx={{
                                                border: "1px solid black",
                                                bgcolor: "secondary.main",
                                                // bgcolor: (theme) => {
                                                //     return theme.palette.mode === "light"
                                                //         ? theme.palette.grey[300]
                                                //         : theme.palette.grey[900];
                                                // },
                                                color: "black",
                                                fontSize: "10px",
                                                // lineHeight: 1,
                                                padding: "2px",
                                                width: "20px",
                                                height: "20px",
                                                textAlign: "center",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {sudokuBoard[row][col] === 0 ? null : sudokuBoard[row][col]}
                                        </Box>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </SudokuTable>
    );
};

export default SudokuThumb;

const SudokuTable = styled("table")<{
    outerBorderColor: string;
    innerBorderColor: string;
}>`
    border-collapse: collapse;
    border: 4px solid;
    border-color: ${(props) => props.outerBorderColor};
    .bBorder {
        border-bottom: 2px solid;
        border-color: ${(props) => props.innerBorderColor};
    }
    .rBorder {
        border-right: 2px solid;
        border-color: ${(props) => props.innerBorderColor};
    }
`;
