import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

import Box from "@mui/material/Box";

import { appConfig } from "../../../utils/General/appConfiguration";
import type { JSX } from "react";

const Footer = () => {
    const linksList: {
        url: string;
        icon: JSX.Element;
    }[] = [
        {
            url: appConfig.krzysztofDamianBasiorPersonalWebsiteBaseUrl,
            icon: <AccountBoxIcon fontSize="large" />,
        },
        {
            url: appConfig.krzysztofDamianBasiorFacebookBaseUrl,
            icon: <FacebookIcon fontSize="large" />,
        },
        {
            url: appConfig.krzysztofDamianBasiorLinkedinBaseUrl,
            icon: <LinkedInIcon fontSize="large" />,
        },

        {
            url: appConfig.krzysztofDamianBasiorGithubBaseUrl,
            icon: <GitHubIcon fontSize="large" />,
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                background: "#111",
                height: "auto",
                width: "100%",
                paddingTop: "40px",
                color: "#fff",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                <h3
                    style={{
                        fontSize: "2rem",
                        fontWeight: 400,
                        textTransform: "capitalize",
                        lineHeight: "3rem",
                    }}
                >
                    HiSudoku
                </h3>
                <p
                    style={{
                        margin: "10px auto",
                        lineHeight: "28px",
                        fontSize: "1rem",
                    }}
                >
                    Web application for playing sudoku puzzles.
                </p>
                <Box
                    component="ul"
                    sx={{
                        padding: 0,
                        boxSizing: "border-box",
                        listStyle: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "1rem 0 3rem 0",
                    }}
                >
                    {linksList.map((link) => (
                        <Box
                            component="li"
                            key={link.url}
                            sx={{
                                margin: "0 10px",
                                textDecoration: "none",
                                color: "#fff",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: "primary.main",
                                },
                                cursor: "pointer",
                            }}
                        >
                            <a href={link.url} style={{ color: "inherit" }}>
                                {link.icon}
                            </a>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    width: "100%",
                    padding: "20px 0",
                    textAlign: "center",
                    color: "text.primary",
                }}
            >
                2025
            </Box>
        </Box>
    );
};

export default Footer;
