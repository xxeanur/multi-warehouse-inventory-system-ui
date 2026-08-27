"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { registerNotifier } from "@/lib/notificationService";

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showNotification = (msg: string, sev: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    registerNotifier(showNotification);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert 
          onClose={handleClose} 
          severity={severity} 
          variant="filled" 
          sx={{ width: "100%", color: "#fff", borderRadius: "12px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationProvider bulunamadı.");
  return context;
};