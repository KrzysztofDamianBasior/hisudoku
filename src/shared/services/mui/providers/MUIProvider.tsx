import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import useMuiTheme from "../lib/useMUITheme";

export default function MUIProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const theme = useMuiTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
