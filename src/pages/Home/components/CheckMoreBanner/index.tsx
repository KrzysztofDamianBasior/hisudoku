import { Typography, Divider, Box } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

import { appConfig } from "../../../../shared/utils/General/appConfiguration";

const CheckMoreBanner = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Divider component="div" role="presentation">
                <Typography variant="h2" display="block" align="center" gutterBottom={true}>
                    HiSudoku
                </Typography>
            </Divider>

            <Typography variant="h4" display="block" align="center" gutterBottom={true} sx={{ my: "20px" }}>
                Web application for playing sudokus
            </Typography>

            <Divider />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    //   border: "1px dashed grey",
                    margin: "40px",
                }}
            >
                <a href={appConfig.krzysztofDamianBasiorPersonalWebsiteBaseUrl}>
                    <AccountBoxIcon
                        sx={{
                            margin: "5px",
                            width: 150,
                            height: 150,
                            transition: "color .5s linear",
                            cursor: "pointer",
                            "&:hover": {
                                color: "primary.main",
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                </a>
                <a href={appConfig.krzysztofDamianBasiorFacebookBaseUrl}>
                    <FacebookIcon
                        sx={{
                            margin: "5px",
                            width: 150,
                            height: 150,
                            transition: "color .5s linear",
                            cursor: "pointer",
                            "&:hover": {
                                color: "primary.main",
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                </a>
                <a href={appConfig.krzysztofDamianBasiorLinkedinBaseUrl}>
                    <LinkedInIcon
                        sx={{
                            margin: "5px",
                            width: 150,
                            height: 150,
                            transition: "color .5s linear",
                            cursor: "pointer",
                            "&:hover": {
                                color: "primary.main",
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                </a>
                <a href={appConfig.krzysztofDamianBasiorGithubBaseUrl}>
                    <GitHubIcon
                        sx={{
                            margin: "5px",
                            width: 150,
                            height: 150,
                            transition: "color .5s linear",
                            cursor: "pointer",
                            "&:hover": {
                                color: "primary.main",
                                opacity: [0.9, 0.8, 0.7],
                                // "inset 0 0 50px #fff, inset 20px 0 80px #f0f, inset -20px 0 80px #0ff,inset 20px 0 300px #f0f,inset -20px 0 300px #0ff,0 0 50px #fff,-10px 0 80px #f0f,10px 0 80px #0ff",
                            },
                        }}
                    />
                </a>
            </Box>
        </Box>
    );
};

export default CheckMoreBanner;
