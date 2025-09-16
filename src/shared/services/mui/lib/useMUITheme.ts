import { useContext, useMemo } from "react";
import { createTheme } from "@mui/material";
import { ThemeContext } from "../../theme/lib/ThemeContext";

const useMuiTheme = () => {
    const theme = useContext(ThemeContext);
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Material UI uses a recommended 8px scaling factor by default.
    // theme.spacing(2); // `${8 * 2}px` = '16px'
    const themeOptions = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme.isDarkMode ? "dark" : "light",
                    primary: {
                        main: "#1978a5",
                        light: "#1fbfb8",
                        dark: "#05716c",
                    },
                    secondary: {
                        main: "#EEE8A9",
                        light: "#f9f5cb",
                        dark: "#8a865b",
                    },
                    info: {
                        main: "#9C5C82",
                    },
                },
                typography: {
                    fontFamily: ["Alegreya", "serif"].join(","),
                    fontWeightLight: 400,
                    fontWeightRegular: 400,
                    fontWeightMedium: 400,
                    fontWeightBold: 700,
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: `
                            /************** reset **************/        
                            *{
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            a {
                                all: unset;
                            }                        
                            body,
                            html,
                            div#root,
                            div.app {
                                width: 100%;
                                min-height: 100%;
                            }
                        `,
                    },
                },
            }),
        [theme]
    );

    return themeOptions;
};

export default useMuiTheme;
