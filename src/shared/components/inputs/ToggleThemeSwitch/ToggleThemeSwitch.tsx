import { useState, useEffect, type KeyboardEvent, useContext } from "react";

import { styled } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { ThemeContext } from "../../../services/theme/lib/ThemeContext";

type Props = { id?: string };

const ToggleThemeSwitch = ({ id = "toggle-theme-switch" }: Props) => {
    const theme = useContext(ThemeContext);

    const [checked, setChecked] = useState<boolean>(theme.isDarkMode ? false : true);
    //   const [disabled, setDisabled] = useState<boolean>(isDisabled);

    useEffect(() => {
        if (checked === true) {
            theme.disable();
        } else {
            theme.enable();
        }
    }, [checked, theme]);

    function handleKeyPress(e: KeyboardEvent) {
        //KeyboardEvent Value
        if (e.keyCode !== 32) return;

        e.preventDefault();
        setChecked(!checked);
    }

    return (
        <ThemeSwitchContainer>
            <ThemeSwitchInput
                type="checkbox"
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
                name={id}
                id={id}
                // disabled={disabled}
            />
            <ThemeSwitchLabel
                className="toggle-theme-switch-label"
                htmlFor={id}
                // tabIndex={disabled ? -1 : 1}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <ThemeSwitchLabelOptions
                    // className={ disabled ? "toggle-theme-switch-inner toggle-theme-switch-disabled" : "toggle-theme-switch-inner" }
                    data-yes={"light"}
                    data-no={"dark"}
                    tabIndex={-1}
                    className="inner"
                />
                <ThemeSwitchLabelIconContainer className="icon" tabIndex={-1}>
                    {checked ? <LightModeIcon /> : <DarkModeIcon />}
                </ThemeSwitchLabelIconContainer>
            </ThemeSwitchLabel>
        </ThemeSwitchContainer>
    );
};

export default ToggleThemeSwitch;

const ThemeSwitchContainer = styled("div")(
    ({ theme }) => ` 
        @media screen and (max-width: ${theme.breakpoints.values.md}px) {
            transform: scale(0.8);
        }
        position: relative;
        width: 85px;
        display: inline-block;
    `
);

const ThemeSwitchInput = styled("input")(
    () => `
        display: none;

        :checked + label {
            .inner {
                margin-left: 0;
            }
            .icon {
                right: 0px;
            }
        }
    `
);

const ThemeSwitchLabel = styled("label")(
    () => ` 
        display: block;

        overflow: hidden;

        cursor: pointer;

        margin: 0;

        border: 0 solid #bbb;
        border-radius: 20px;
    `
);
const ThemeSwitchLabelOptions = styled("span")(
    () => `
        display: block;

        width: 200%;

        margin-left: -100%;

        transition: margin 0.3s ease-in 0s;

        :before, :after {
            display: block;
            box-sizing: border-box;
            width: 50%;
            height: 34px;
            padding: 0;
            float: left;

            line-height: 34px;
            font-size: 14px;
            font-weight: bold;
        }

        :after {
            content: attr(data-no);
            @media screen and (max-width: breakpoints.$max-tablet-width) {
                content: "";
            }

            padding-right: 10px;

            background-color: #bbb;

            text-transform: uppercase;
            text-align: right;
        }

        :before {
            content: attr(data-yes);
            @media screen and (max-width: breakpoints.$max-tablet-width) {
                content: "";
            }

            padding-left: 10px;
            
            background-color: #f90;

            text-transform: uppercase;
            color: #000000;
        }
    `
);

const ThemeSwitchLabelIconContainer = styled("span")(
    () => ` 
        display: flex;
        justify-content: center;
        align-items: center;

        width: 24px;
        margin: 5px;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 50px;
        
        background: #ffffff;
        color: black;
        
        border: 0 solid #bbb;
        border-radius: 20px;

        transition: all 0.3s ease-in 0s;
`
);
