import { useDarkMode } from "usehooks-ts";
import { ThemeContext } from "../lib/ThemeContext";

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { isDarkMode, disable, enable, set, toggle } = useDarkMode();

    return (
        <ThemeContext.Provider value={{ disable, enable, isDarkMode, set, toggle }}>{children}</ThemeContext.Provider>
    );
}
