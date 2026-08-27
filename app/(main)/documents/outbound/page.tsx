"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

import LayoutWrapper from "@/components/LayoutWrapper";
import OutboundListHeader from "@/components/documents/outbound/OutboundListHeader";
import OutboundListTable from "@/components/documents/outbound/OutboundListTable";

import { outboundService } from "@/services/documents/outboundService";
import { OutboundOrderListDto } from "@/types/documents/outbound";
import { notifySuccess } from "@/lib/notificationService";

import { useConfirm } from "@/contexts/ConfirmContext";

export default function OutboundOrdersPage() {
  const router = useRouter();
  const { confirm } = useConfirm();

  const [orders, setOrders] = useState<OutboundOrderListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

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

    outboundService
      .getAllAsync()
      .then((response) => {
        if (isMounted) setOrders(response);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    outboundService.getAllAsync().then((response) => setOrders(response));
  };

  const handleCancelClick = async (orderId: string) => {
    const isConfirmed = await confirm({
      title: "Fişi İptal Et",
      description:
        "Bu mal çıkış fişini iptal etmek istediğinize emin misiniz? Rezerve edilen stoklar serbest bırakılacaktır.",
      confirmText: "Evet, İptal Et",
      cancelText: "Vazgeç",
    });

    if (isConfirmed) {
      setIsCancelling(true);
      outboundService
        .cancelAsync({ outboundOrderId: orderId })
        .then(() => {
          notifySuccess(
            "Fiş iptal edildi ve rezerve stoklar serbest bırakıldı.",
          );
          handleRefresh();
        })
        .finally(() => setIsCancelling(false));
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
        <OutboundListHeader
          isStaff={isStaff}
          onCreateNew={() => router.push("/documents/outbound/create")}
        />

        <OutboundListTable
          orders={orders}
          isStaff={isStaff}
          isCancelling={isCancelling}
          onView={(id) => router.push(`/documents/outbound/${id}`)}
          onCancel={handleCancelClick}
        />
      </Box>
    </LayoutWrapper>
  );
}
