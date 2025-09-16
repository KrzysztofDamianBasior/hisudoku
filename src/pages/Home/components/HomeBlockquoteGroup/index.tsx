import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { DurstenfeldShuffle } from "../../../../shared/utils/General/shuffleArray";

import { AnimatePresence, motion } from "framer-motion";

import React from "react";

const accentText: SxProps<Theme> = {
    display: "inline",
    color: (theme) => (theme.palette.mode === "light" ? theme.palette.primary.dark : theme.palette.primary.light),
};

const HomeQuotationsGroup = () => {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down("lg"));
    const matchesSm = useMediaQuery(theme.breakpoints.down("md"));

    const [quotationsIndexes, setQuotationsIndexes] = React.useState<[number, number, number]>([0, 1, 2]);

    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const quotationsArray = matchesMd ? (matchesSm ? [0] : [0, 1]) : [0, 1, 2];

    React.useEffect(() => {
        const id = setInterval(() => {
            let indexes = Array.from(quotations.keys());

            indexes = indexes.filter((num) => !quotationsIndexes.includes(num));

            indexes = DurstenfeldShuffle(indexes);
            const top3: [number, number, number] = indexes.slice(0, 3) as [number, number, number];
            setQuotationsIndexes(top3);
        }, 6000);
        intervalRef.current = id;

        return () => {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
        };
    });

    // function handleCancel() {
    //     clearInterval(intervalRef.current);
    // }

    return (
        <AnimatePresence mode="wait">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "40px",
                }}
            >
                {quotationsArray.map((index) => (
                    <Paper
                        elevation={3}
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0 20px",
                            background: (theme) =>
                                theme.palette.mode === "light" ? theme.palette.background.paper : "black",
                            borderRadius: 4,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 10 }}
                            key={quotationsIndexes.toString()}
                        >
                            <Blockquote>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        position: "relative" /* for pseudos */,
                                        fontWeight: "normal",
                                        lineHeight: 1,
                                        margin: 0,
                                        border: "2px solid",
                                        borderColor: (theme) => theme.palette.text.primary,
                                        borderRadius: "20px",
                                        padding: "25px",
                                        width: "300px",
                                        height: "150px",

                                        "&:after": {
                                            content: "''",
                                            position: "absolute",
                                            border: "2px solid",
                                            borderColor: (theme) => theme.palette.text.primary,
                                            borderRadius: "0 50px 0 0",
                                            width: "60px",
                                            height: "60px",
                                            bottom: "-60px",
                                            left: "48px",
                                            borderBottom: "none",
                                            borderLeft: "none",
                                            zIndex: 3,
                                        },
                                        "&:before": {
                                            content: "''",
                                            position: "absolute",
                                            width: "80px",
                                            border: "6px solid",
                                            borderColor: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? theme.palette.background.paper
                                                    : "black",
                                            bottom: "-3px",
                                            left: "50px",
                                            zIndex: 2,
                                        },
                                    }}
                                >
                                    {quotations[quotationsIndexes[index]].content}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.secondary.dark
                                                : theme.palette.secondary.light,
                                        fontWeight: 400,
                                        fontSize: "1rem",
                                        lineHeight: 1.2,
                                        margin: 0,
                                        paddingTop: "15px",
                                        marginLeft: "150px",
                                        paddingLeft: "12px",
                                    }}
                                    variant="h4"
                                >
                                    &mdash;{quotations[quotationsIndexes[index]].author}
                                </Typography>
                            </Blockquote>
                        </motion.div>
                    </Paper>
                ))}
            </div>
        </AnimatePresence>
    );
};

const Blockquote = styled("blockquote")`
    max-width: 350px;
    font-size: 2rem;
    line-height: 1.2;
    text-align: center;
`;

const quotations: { author: string; content: React.ReactElement }[] = [
    {
        author: "E E Cummings",
        content: (
            <>
                The world is a giant puzzle {""}
                <Typography component="span" sx={accentText}>
                    that hasnt been put together yet
                </Typography>
                ,{""} and were trying to find the other piece of this puzzle that goes with us
            </>
        ),
    },
    {
        author: "Douglas Horton",
        content: (
            <>
                The art of{" "}
                <Typography component="span" sx={accentText}>
                    simplicity
                </Typography>{" "}
                is a puzzle of{" "}
                <Typography component="span" sx={accentText}>
                    complexity
                </Typography>
                .
            </>
        ),
    },
    {
        author: "Kid Cudi",
        content: (
            <>
                But see I&apos;ll never get, why da earth is a puzzle that I&apos;ll never fit {""}
                <Typography component="span" sx={accentText}>
                    I&apos;m outta their world
                </Typography>
                .
            </>
        ),
    },
    {
        author: "Hans Hofmann",
        content: (
            <>
                Colors must fit together as{" "}
                <Typography component="span" sx={accentText}>
                    pieces
                </Typography>{" "}
                in a puzzle or cogs in a wheel.
            </>
        ),
    },
    {
        author: "Adrian Belew",
        content: (
            <>
                My favorite puzzle is trying to work out the parts myself, after all it is a{" "}
                <Typography component="span" sx={accentText}>
                    solo effort
                </Typography>
                .
            </>
        ),
    },
    {
        author: "Erno Rubik",
        content: (
            <>
                A good puzzle,{" "}
                <Typography component="span" sx={accentText}>
                    it&apos;s a fair thing
                </Typography>
                . Nobody is lying. It&apos;s very clear, and the problem depends{" "}
                <Typography component="span" sx={accentText}>
                    just on you
                </Typography>
                .
            </>
        ),
    },
    {
        author: "Mariana Fulger",
        content: (
            <>
                Reality is a puzzle revealing itself{" "}
                <Typography component="span" sx={accentText}>
                    one portion at a time
                </Typography>
                , always where the deepest shroud falls. Wanting to piece the clues together, you are only{" "}
                <Typography component="span" sx={accentText}>
                    losing yourself in the maze
                </Typography>
                .
            </>
        ),
    },
    {
        author: "Vera Nazarian",
        content: (
            <>
                Not every puzzle is intended to be solved. Some are in place to{" "}
                <Typography component="span" sx={accentText}>
                    test your limits
                </Typography>
                . Others are, in fact, not puzzles at all...
            </>
        ),
    },
];

export default HomeQuotationsGroup;
