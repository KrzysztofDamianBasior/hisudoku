import { createContext } from "react";
import type { StopwatchState } from "./useStopwatch";

export const TimerContext = createContext<StopwatchState>({
    pauseStopwatch: () => {},
    resetStopwatch: () => {},
    startStopwatch: () => {},
    stopStopwatch: () => {},
    time: 0,
});
