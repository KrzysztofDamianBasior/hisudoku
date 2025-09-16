import { TimerContext } from "./TimerContext";
import { useStopwatch } from "./useStopwatch";

export default function StopwatchProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { pauseStopwatch, resetStopwatch, startStopwatch, stopStopwatch, time } = useStopwatch();

    return (
        <TimerContext.Provider value={{ pauseStopwatch, resetStopwatch, startStopwatch, stopStopwatch, time }}>
            {children}
        </TimerContext.Provider>
    );
}
