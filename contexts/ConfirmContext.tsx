"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmOptions {
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ description: "" });
  const [resolver, setResolver] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver({ resolve });
    });
  }, []);

  const handleConfirm = () => {
    resolver?.resolve(true);
    setOpen(false);
  };

  const handleCancel = () => {
    resolver?.resolve(false);
    setOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={open}
        onClose={handleCancel}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            padding: "12px",
            minWidth: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {options.title || "Emin misiniz?"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            {options.description}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
          <Button
            onClick={handleCancel}
            sx={{
              color: "#222",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          >
            {options.cancelText || "İptal"}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              backgroundColor: "#FF385C",
              "&:hover": { backgroundColor: "#D90B38" },
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            {options.confirmText || "Onayla"}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context)
    throw new Error(
      "useConfirm hook'u ConfirmProvider içinde kullanılmalıdır.",
    );
  return context;
};
