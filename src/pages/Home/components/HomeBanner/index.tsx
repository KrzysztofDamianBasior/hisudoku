import HomeBlockquoteGroup from "../HomeBlockquoteGroup";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const HomeBanner = () => {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                component="h1"
                sx={{
                    fontSize: matchesMd ? (matchesSm ? "2rem" : "3rem") : "4rem",
                    marginTop: "50px",
                    marginBottom: "50px",
                    "z-index": 10,
                    backgroundImage: "linear-gradient(-225deg,#231557 0%, #44107a 29%, #ff1361 67%,#fff800 100%)",
                    color: "#fff",
                    textFillColor: "transparent",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    display: "inline-block",
                    animation: "textclip 2s linear infinite",
                    "@keyframes textclip": {
                        to: {
                            backgroundPosition: "200% center",
                        },
                    },
                }}
            >
                HiSudoku
            </Box>

            <HomeBlockquoteGroup />

            <Typography variant="h4" sx={{ my: "50px" }}>
                scroll the page to reveal more
            </Typography>
        </div>
    );
};

export default HomeBanner;
