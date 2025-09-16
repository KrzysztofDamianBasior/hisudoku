import { styled } from "@mui/material/styles";

type Props = {
    isChecked: boolean;
    callback: (isChecked: boolean) => void;
};

const ToggleSwitch = (props: Props) => {
    return (
        <ToggleSwitchContainer>
            <ToggleSwitchInput
                type="checkbox"
                checked={props.isChecked}
                onChange={() => {
                    props.callback(!props.isChecked);
                }}
            />
            <SlideContainer>
                <Slide></Slide>
            </SlideContainer>
        </ToggleSwitchContainer>
    );
};
export default ToggleSwitch;

const ToggleSwitchContainer = styled("div")(
    () => `
        width: 110px;
        height: 40px;

        position: relative;
    `
);

const ToggleSwitchInput = styled("input")(
    () => `  
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 10;

        cursor: pointer;

        // z-index: 99999;

        opacity: 0;

        :checked + div span {
            transform: translateX(60px);
        }
    `
);

const SlideContainer = styled("div")(
    () => `         
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        border: 4px solid #000;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);

        overflow: hidden;
    `
);

const Slide = styled("span")(
    () => ` 
        position: absolute;
        top: 0;
        left: 0;

        width: 45px;
        height: 45px;

        background: #000;

        transition: 0.5s;

        :before {
            content: "ON";
            position: absolute;
            top: 0;
            left: -60px;

            color: #fff;
            line-height: 35px;
            font-weight: bold;
            text-align: center;

            width: 60px;
            height: 100%;

            background: #00da00;
        };

        :after {
            content: "OFF";

            position: absolute;
            top: 0;
            right: -60px;

            color: #fff;
            line-height: 35px;
            font-weight: bold;
            text-align: center;

            width: 60px;
            height: 100%;
            
            background: #ff002d;
        };
    `
);
