import { Box } from "@mui/material";

type Props = { children: React.ReactNode };

const GeometricBackground = ({ children }: Props) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "palette.background.default",
            }}
        >
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    top: "80vh",
                    left: "45vw",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.dark",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                }}
            ></Box>
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    left: "25vw",
                    top: "40vh",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.light",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                    animationDelay: "2s",
                }}
            ></Box>
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    left: "75vw",
                    top: "50vh",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.main",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                    animationDelay: "4s",
                }}
            ></Box>
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    left: "90vw",
                    top: "10vh",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.dark",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                    animationDelay: "6s",
                }}
            ></Box>
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    left: "10vw",
                    top: "85vh",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.light",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                    animationDelay: "8s",
                }}
            ></Box>
            <Box
                sx={{
                    "@keyframes cube": {
                        from: {
                            transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                            opacity: 0.3,
                        },
                        to: {
                            transform: "scale(20) rotate(960deg) translate(-50%, -50%)",
                            opacity: 0,
                        },
                    },
                    position: "absolute",
                    left: "50vw",
                    top: "10vh",

                    width: "10px",
                    height: "10px",

                    borderColor: "primary.main",
                    borderWidth: "1px",
                    borderStyle: "solid",

                    transformOrigin: "top left",
                    transform: "scale(0) rotate(0deg) translate(-50%, -50%)",
                    animation: "cube 12s ease-in forwards infinite",
                    animationDelay: "10s",
                }}
            ></Box>
            {children}
        </Box>
    );
};

export default GeometricBackground;
