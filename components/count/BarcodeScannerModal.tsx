"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Dialog, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface BarcodeScannerModalProps {
  open: boolean;
  onClose: () => void;
  onScan: (decodedText: string) => void;
}

export default function BarcodeScannerModal({ open, onClose, onScan }: BarcodeScannerModalProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsMounted(true), 150);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isMounted) return;

    const element = document.getElementById("qr-reader");
    if (!element) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        rememberLastUsedCamera: true,
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        if (scannerRef.current) scannerRef.current.clear();
        onScan(decodedText);
        onClose();
      },
      (_errorMessage) => {
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => console.error("Kamera temizlenemedi:", error));
      }
    };
  }, [open, isMounted, onScan, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, overflow: "hidden" },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#172C4A", color: "#fff" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Barkod / QR Okut
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 3, bgcolor: "#F9FAFB" }}>
        <Typography variant="body2" sx={{ color: "#6B7280", mb: 2, textAlign: "center" }}>
          Kameranızı ürünün barkoduna hizalayın
        </Typography>
        <Box id="qr-reader" sx={{ width: "100%", borderRadius: 2, overflow: "hidden", border: "2px solid #E5E7EB" }}></Box>
      </Box>
    </Dialog>
  );
}