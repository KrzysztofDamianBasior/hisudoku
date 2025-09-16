import { useContext, useState } from "react";

import Logo from "../../../assets/icon.png";

import ToggleThemeSwitch from "../../inputs/ToggleThemeSwitch/ToggleThemeSwitch";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DialogsContext } from "../../../services/dialogs/lib/DialogsContext";

import { Link, useLocation } from "react-router";

const SideBar = () => {
    const [close, setClose] = useState(true);
    const location = useLocation();
    const dialogs = useContext(DialogsContext);
    const pathname = location.pathname;

    return (
        <Box
            component="nav"
            sx={{
                backgroundColor: "#1d1f21",
                width: `${close ? "70px" : "250px"}`,
                left: 0,
                top: 0,
                // height: "100%",
                height: "100vh",
                padding: "10px 5px",
                transition: "all 0.3s ease",
                zIndex: 1000,
                // position: "absolute",
                position: "fixed",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minWidth: "60px",
                        borderRadius: "10px",
                        height: "100%",
                        fontSize: "20px",
                    }}
                >
                    <img
                        src={Logo}
                        alt="logo"
                        // loading="lazy"
                        style={{
                            // backgroundImage: "url('data:image/png;base64,...blured...')",
                            width: "40px",
                            borderRadius: "6px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    />
                </Box>
                <SideBarText close={close}>HiSudoku</SideBarText>
                <button
                    style={{
                        transform: `${close ? "translateY(-50%) rotate(0deg)" : " translateY(-50%) rotate(180deg)"}`,
                        position: "absolute",
                        top: "50%",
                        right: "-25px",
                        height: "25px",
                        width: "25px",
                        backgroundColor: "#3a3b3c",
                        color: "var(#242526)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                    onClick={() => setClose((prev) => !prev)}
                >
                    <ArrowCircleRightIcon />
                </button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "80%",
                    justifyContent: "space-between",
                    marginTop: "20px",
                }}
            >
                <SideBarSection>
                    {pathname !== "/" && (
                        <SideBarLink to="/">
                            <SideBarIcon>
                                <HomeIcon />
                            </SideBarIcon>
                            <SideBarText close={close}>Home</SideBarText>
                        </SideBarLink>
                    )}

                    {pathname !== "/feed" && (
                        <SideBarLink to="/feed">
                            <SideBarIcon>
                                <SearchIcon />
                            </SideBarIcon>
                            <SideBarText close={close}>Find Sudoku</SideBarText>
                        </SideBarLink>
                    )}
                </SideBarSection>

                <SideBarSection>
                    <SideBarElement
                        onClick={() => {
                            dialogs.generateSudokuDialogManager.openDialog();
                        }}
                    >
                        <SideBarIcon>
                            <CalculateIcon />
                        </SideBarIcon>
                        <SideBarText close={close}>Generate Sudoku</SideBarText>
                    </SideBarElement>

                    <SideBarElement
                        onClick={() => {
                            dialogs.gameSettingsDialogManager.openDialog();
                        }}
                    >
                        <SideBarIcon>
                            <BuildIcon />
                        </SideBarIcon>
                        <SideBarText close={close}>Game Settings</SideBarText>
                    </SideBarElement>
                </SideBarSection>

                <SideBarSection>
                    <Box
                        sx={{
                            opacity: `${close ? 0 : 1}`,
                            width: "100%",
                            margin: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <ToggleThemeSwitch />
                    </Box>
                </SideBarSection>
            </Box>
        </Box>
    );
};

export default SideBar;

const SideBarText = styled("div")<{ close: boolean }>`
    opacity: ${(props) => (props.close ? 0 : 1)};
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    color: #ccc;
`;

const SideBarElement = styled("div")`
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    border-radius: 6px;
    margin-top: 10px;
    min-height: 6vh;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        background-color: #3a3b3c;
    }
`;

const SideBarLink = styled(Link)`
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    border-radius: 6px;
    margin-top: 10px;
    min-height: 6vh;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        background-color: #3a3b3c;
    }
`;

const SideBarIcon = styled("span")`
    color: #ccc;

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 60px;
    height: 100%;
    border-radius: 10px;
    font-size: 20px;
    transition: all 0.3s ease;
`;

const SideBarSection = styled("div")``;
