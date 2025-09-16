import { styled } from "@mui/material/styles";

const ActionButton = styled("button")(
    () => `
        background-color: #ffffff;
        color: #000000;

        display: inline-block;
        box-shadow: #adcfff 0 -12px 6px inset;
        box-sizing: border-box;
        outline: none;
        border-radius: 40em;
        border-style: none;
        
        cursor: pointer;
        
        transition: all 0.15s;
        
        font-family: sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: -0.24px;
        text-align: center;
        text-decoration: none;

        padding: 1rem 1.3rem;
        margin: 1rem;

        @media (min-width: 768px) {
            font-size: 1.5rem;
            padding: 0.75rem 2rem;
        }

        :hover {
            background-color: #ffc229;
            box-shadow: #ff6314 0 -6px 8px inset;
            transform: scale(1.125);
        };

        :active {
            transform: scale(1.025);
        };
  `
);

export default ActionButton;
