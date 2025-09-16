import React, { useContext, useState } from "react";

import ToggleSwitch from "../../inputs/ToggleSwitch";

import { GameSettingsContext } from "../../../../shared/services/gameSettings/lib/GameSettingsContext";
import { DialogsContext } from "../../../../shared/services/dialogs/lib/DialogsContext";
import { NotificationContext } from "../../../../shared/services/snackbars/lib/NotificationsContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";

import Draggable from "react-draggable";

const GameSettingsDialog = () => {
    const [hasGameSettingsChanged, setHasGameSettingsChanged] = useState<boolean>(false);
    const gameSettings = useContext(GameSettingsContext);
    const dialogs = useContext(DialogsContext);
    const notifications = useContext(NotificationContext);

    const handleClose = () => {
        dialogs.gameSettingsDialogManager.closeDialog();
        if (hasGameSettingsChanged) {
            notifications.openSnackbar({
                severity: "success",
                title: "Success",
                body: "Game setting has changed",
                gameWonFlag: false,
            });
            setHasGameSettingsChanged(false);
        }
    };

    return (
        <Dialog
            open={dialogs.gameSettingsDialogManager.isGameSettingsDialogOpened}
            onClose={handleClose}
            scroll={"paper"}
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                Game Settings
            </DialogTitle>

            <DialogContent>
                <div
                    style={{
                        marginTop: "5%",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        alignContent: "center",
                        textAlign: "center",
                    }}
                >
                    <div style={{ justifySelf: "start" }}>Is timer visible</div>
                    <div style={{ justifySelf: "end" }}>
                        <ToggleSwitch
                            isChecked={gameSettings.isTimerVisible}
                            callback={(isChecked: boolean) => {
                                gameSettings.setTimerVisiblity(isChecked);
                                setHasGameSettingsChanged(true);
                            }}
                        />
                    </div>

                    <div style={{ justifySelf: "start" }}>Show region highlighting</div>
                    <div style={{ justifySelf: "end" }}>
                        <ToggleSwitch
                            isChecked={gameSettings.isRegionHighlightingVisible}
                            callback={(isChecked: boolean) => {
                                gameSettings.setRegionHighlightingVisiblity(isChecked);
                                setHasGameSettingsChanged(true);
                            }}
                        />
                    </div>

                    <div style={{ justifySelf: "start" }}>Turn on row/column highlighting</div>
                    <div style={{ justifySelf: "end" }}>
                        <ToggleSwitch
                            isChecked={gameSettings.isRowColumnHighlightingVisible}
                            callback={(isChecked: boolean) => {
                                gameSettings.setRowColumnHighlightingVisiblity(isChecked);
                                setHasGameSettingsChanged(true);
                            }}
                        />
                    </div>

                    <div style={{ justifySelf: "start" }}>Auto prevent mistakes</div>
                    <div style={{ justifySelf: "end" }}>
                        <ToggleSwitch
                            isChecked={gameSettings.autoPreventMistakes}
                            callback={(isChecked: boolean) => {
                                gameSettings.setAutoPreventMistakes(isChecked);
                                setHasGameSettingsChanged(true);
                            }}
                        />
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleClose}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameSettingsDialog;

function PaperComponent(props: PaperProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    return (
        <Draggable
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
