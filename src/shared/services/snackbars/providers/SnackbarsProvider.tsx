import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";

import ConsecutiveNotifications from "../lib/ConsecutiveNotifications";
import { NotificationContext } from "../lib/NotificationsContext";
import useNotifications from "../lib/useNotifications";

export default function SnackbarsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { closeSnackbar, handleSnackbarExited, isSnackbarOpened, messageInfo, openSnackbar } = useNotifications();
    const { width, height } = useWindowSize();

    return (
        <NotificationContext.Provider value={{ closeSnackbar, openSnackbar }}>
            <ConsecutiveNotifications
                handleClose={closeSnackbar}
                handleExited={handleSnackbarExited}
                isOpened={isSnackbarOpened}
                messageInfo={messageInfo}
            />
            {children}
            {messageInfo?.gameWonFlag && <Confetti width={width} height={height} />}
        </NotificationContext.Provider>
    );
}
