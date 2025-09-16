import { useNavigate } from "react-router";

import ActionButton from "../../../../shared/components/inputs/ActionButton";

import { Box, useMediaQuery, useTheme } from "@mui/material";

const FeedDashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <h1
                style={{
                    color: "#333",
                    fontSize: "3rem",
                    lineHeight: "1.5",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    position: "relative",
                    width: "550px",
                    scale: matchesMd ? (matchesSm ? "0.6" : "0.8") : "1",
                }}
            >
                <span
                    style={{
                        fontSize: "40px",
                        marginLeft: "40px",
                    }}
                >
                    always be
                </span>
                <Box
                    sx={{
                        backgroundColor: "yellow",
                        color: "#333",
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        paddingLeft: "0.5rem",
                        top: "0.2rem",
                        left: "270px",
                        animation: "openclose 5s ease-in-out infinite",
                        "@keyframes openclose": {
                            "0%": {
                                top: "0.2rem",
                                width: 0,
                            },
                            "5%": {
                                width: 0,
                            },
                            "15%": {
                                width: "230px",
                            },
                            "30%": {
                                top: "0.2rem",
                                width: "230px",
                            },
                            "33%": {
                                top: "0.2rem",
                                width: 0,
                            },
                            "35%": {
                                top: "0.2rem",
                                width: 0,
                            },
                            "38%": {
                                top: "-4.5rem",
                            },
                            "48%": {
                                top: "-4.5rem",
                                width: "190px",
                            },
                            "62%": {
                                top: "-4.5rem",
                                width: "190px",
                            },
                            "66%": {
                                top: "-4.5rem",
                                width: 0,
                                textIndent: 0,
                            },
                            "71%": {
                                top: "-9rem",
                                width: 0,
                                textIndent: "5px",
                            },
                            "86%": {
                                top: "-9rem",
                                width: "285px",
                            },
                            "95%": {
                                top: "-9rem",
                                width: "285px",
                            },
                            "98%": {
                                top: "-9rem",
                                width: 0,
                                textIndent: "5px",
                            },
                            "100%": {
                                top: 0,
                                width: 0,
                                textIndent: 0,
                            },
                        },
                    }}
                >
                    <div className="word1">close</div>
                    <div className="word2">active</div>
                    <div className="word3">creative</div>
                </Box>
            </h1>

            <div style={{ color: "white" }}>
                <p>browse the feed and select a sudoku to solve</p>
                <ActionButton
                    onClick={() => {
                        navigate("/feed");
                    }}
                >
                    Find A Ready Sudoku
                </ActionButton>
            </div>
        </Box>
    );
};

export default FeedDashboard;
