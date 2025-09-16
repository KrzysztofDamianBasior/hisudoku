import { keyframes } from "@emotion/react";
import { styled } from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const WavyBackground = ({ children }: Props) => {
    return (
        <WavyBackgroundContainer>
            <WavyBackgroundFirstWave></WavyBackgroundFirstWave>
            <WavyBackgroundSecondWave></WavyBackgroundSecondWave>
            <WavyBackgroundThirdtWave></WavyBackgroundThirdtWave>
            {children}
        </WavyBackgroundContainer>
    );
};

export default WavyBackground;

const backgroundAnimation = keyframes`
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
`;

const waveAnimation = keyframes`
    2% { transform: translateX(1); }
    25% { transform: translateX(-25%); }
    50% { transform: translateX(-50%); }
    75% { transform: translateX(-25%); }
    100% { transform: translateX(1); }
`;

const WavyBackgroundContainer = styled("div")`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        315deg,
        rgba(101, 0, 94, 1) 3%,
        rgba(60, 132, 206, 1) 38%,
        rgba(48, 238, 226, 1) 68%,
        rgba(255, 25, 25, 1) 98%
    );
    animation: ${backgroundAnimation} 15s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
`;

const WavyBackgroundFirstWave = styled("div")`
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 12em;
    animation: ${waveAnimation} 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
`;

const WavyBackgroundSecondWave = styled("div")`
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 12em;
    transform: translate3d(0, 0, 0);
    left: 0;
    bottom: -1.25em;
    animation: ${waveAnimation} 18s linear reverse infinite;
    opacity: 0.8;
`;

const WavyBackgroundThirdtWave = styled("div")`
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 12em;
    transform: translate3d(0, 0, 0);
    left: 0;
    bottom: -2.5em;
    animation: ${waveAnimation} 20s -1s reverse infinite;
    opacity: 0.9;
`;
