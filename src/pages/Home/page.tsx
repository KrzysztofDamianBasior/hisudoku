import { styled } from "@mui/material/styles";

import GeometricBackground from "../../shared/components/backgrounds/GeometricBackground";

import HomeBanner from "./components/HomeBanner";
import GameCreator from "./components/GenerateGameBanner";
import CheckMoreBanner from "./components/CheckMoreBanner";
import FeedDashboard from "./components/FeedBanner";
import ToggleThemeSwitch from "../../shared/components/inputs/ToggleThemeSwitch/ToggleThemeSwitch";

export default function HomePage() {
    return (
        <GeometricBackground>
            <HomeContainer>
                <PositionKeeper>
                    <HomeBoard>
                        <HomeBanner />
                    </HomeBoard>
                    <HomeBoard>
                        <FeedDashboard />
                    </HomeBoard>
                    <HomeBoard>
                        <GameCreator />
                    </HomeBoard>
                    <HomeBoard>
                        <CheckMoreBanner />
                    </HomeBoard>
                </PositionKeeper>
                <div
                    style={{
                        position: "fixed",
                        top: "10%",
                        left: "10%",
                    }}
                >
                    <ToggleThemeSwitch id="home-banner__toggle-theme-switch-name" />
                </div>
            </HomeContainer>
        </GeometricBackground>
    );
}

const HomeContainer = styled("div")(
    () => `
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        overflow-x: auto;
    `
);

const PositionKeeper = styled("div")(
    () => `
        width: 100%;
        height: 400%;
    `
);

const HomeBoard = styled("div")(
    () => `
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    `
);
