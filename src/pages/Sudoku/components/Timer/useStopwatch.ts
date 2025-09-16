import { useState, useEffect } from "react";

export type StopwatchState = {
    time: number;
    startStopwatch: () => void;
    resetStopwatch: () => void;
    pauseStopwatch: () => void;
    stopStopwatch: () => void;
};

export function useStopwatch(): StopwatchState {
    const [time, setTime] = useState<number>(0);
    const [timerState, setTimerState] = useState<"active" | "paused" | "inactive">("active");

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined = undefined;

        if (timerState === "active") {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timerState]);

    const pauseStopwatch = () => {
        if (timerState === "active") setTimerState("paused");
        if (timerState === "paused") setTimerState("active");
    };

    const startStopwatch = () => {
        setTimerState("active");
    };

    const stopStopwatch = () => {
        setTimerState("inactive");
    };

    const resetStopwatch = () => {
        // setTimerState("inactive");
        setTime(0);
    };

    return {
        time,
        startStopwatch,
        resetStopwatch,
        pauseStopwatch,
        stopStopwatch,
    };
}
