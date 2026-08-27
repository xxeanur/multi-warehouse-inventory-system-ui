"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress, Button } from "@mui/material";

// İkonlar
import AddIcon from "@mui/icons-material/Add";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import LayoutWrapper from "@/components/LayoutWrapper";
import InboundOrdersTable from "@/components/documents/inbound/InboundOrdersTable"; // Yeni oluşturduğumuz tablo

import { inboundService } from "@/services/documents/inboundService";
import { userService } from "@/services/identity/userService";
import { InboundOrderListDto } from "@/types/documents/inbound";
import { UserDto } from "@/types/identity/user";

import { notifySuccess } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext"; // Modern Confirm yapısı

export default function InboundOrdersPage() {
  const router = useRouter();
  const { confirm } = useConfirm();

  const [orders, setOrders] = useState<InboundOrderListDto[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  // YETKİ KONTROLÜ İÇİN STATE
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Yetkiyi LocalStorage'dan oku
    const userContextStr = localStorage.getItem("userContext");
    if (userContextStr) {
      try {
        const user = JSON.parse(userContextStr);
        if (user.role === "Staff" || user.role === 2) {
          setIsStaff(true);
        }
      } catch (error) {
        console.error("User context parse edilemedi", error);
      }
    }

    const fetchData = async () => {
      try {
        const [ordersData, meData] = await Promise.all([
          inboundService.getAllAsync(),
          userService.getMeAsync(),
        ]);

        if (isMounted) {
          setOrders(ordersData);
          setCurrentUser(meData);
        }
      } catch (error) {
        console.error("Veriler getirilemedi:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await inboundService.getAllAsync();
      setOrders(response);
    } catch (error) {
      console.error("Yenileme başarısız:", error);
    }
  };

  const handleCancelClick = async (orderId: string) => {
    const isConfirmed = await confirm({
      title: "Fişi İptal Et",
      description:
        "Bu mal kabul fişini iptal etmek istediğinize emin misiniz? İşlem geri alınamaz.",
      confirmText: "Evet, İptal Et",
      cancelText: "Vazgeç",
    });

    if (isConfirmed) {
      try {
        await inboundService.cancelAsync(orderId);
        notifySuccess("Fiş başarıyla iptal edildi.");
        await handleRefresh();
      } catch (error) {
        console.error("İptal sırasında hata:", error);
      }
    }
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#172C4A" }} />
        </Box>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 4 },
          pb: 8,
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ bgcolor: "#EEF2FF", p: 1.5, borderRadius: 2 }}>
              <LocalShippingOutlinedIcon
                sx={{ color: "#172C4A", fontSize: 28 }}
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                Mal Kabul (Inbound)
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                Depoya giren ürünlerin fişlerini ve onay durumlarını yönetin.
              </Typography>
            </Box>
          </Box>

          {!isStaff && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push("/documents/inbound/create")}
              disableElevation
              sx={{
                bgcolor: "#172C4A",
                color: "#FFFFFF",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#0F1C2E" },
              }}
            >
              Yeni Fiş Ekle
            </Button>
          )}
        </Box>

        <InboundOrdersTable
          orders={orders}
          currentUser={currentUser}
          onCancelClick={handleCancelClick}
        />
      </Box>
    </LayoutWrapper>
  );
}
