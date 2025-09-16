import SudokuCell from "../SudokuCell";
import { styled, useTheme } from "@mui/material/styles";

const SudokuBoard = () => {
    const theme = useTheme();

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
                                        <SudokuCell row={row} col={col} />
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
export default SudokuBoard;

const SudokuTable = styled("table")<{
    outerBorderColor: string;
    innerBorderColor: string;
}>(({ outerBorderColor, innerBorderColor }) => ({
    margin: "50px",
    borderCollapse: "collapse",
    border: "6px solid",
    borderColor: outerBorderColor,
    ".bBorder": {
        borderBottom: "4px solid",
        borderColor: innerBorderColor,
    },
    ".rBorder": {
        borderRight: "4px solid",
        borderColor: innerBorderColor,
    },
}));
