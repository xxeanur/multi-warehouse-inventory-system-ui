import { AlertColor } from "@mui/material";

type NotifyFunction = (message: string, severity?: AlertColor) => void;

let notifier: NotifyFunction | null = null;

export const registerNotifier = (fn: NotifyFunction) => {
  notifier = fn;
};

export const notifyError = (message: string) => notifier?.(message, "error");
export const notifySuccess = (message: string) => notifier?.(message, "success");