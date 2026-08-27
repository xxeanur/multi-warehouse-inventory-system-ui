"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

import LayoutWrapper from "@/components/LayoutWrapper";
import TransferListHeader from "@/components/documents/transfer/TransferListHeader";
import TransferListTable from "@/components/documents/transfer/TransferListTable";

import { transferService } from "@/services/documents/transferService";
import { TransferOrderListDto } from "@/types/documents/transfer";
import { notifySuccess } from "@/lib/notificationService";

import { useConfirm } from "@/contexts/ConfirmContext";

export default function TransferOrdersPage() {
  const router = useRouter();
  const { confirm } = useConfirm();

  const [orders, setOrders] = useState<TransferOrderListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    let isMounted = true;

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

    transferService
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
    transferService.getAllAsync().then((response) => setOrders(response));
  };

  const handleCancelClick = async (orderId: string) => {
    const isConfirmed = await confirm({
      title: "Transferi İptal Et",
      description:
        "Henüz yola çıkmamış olan bu transfer fişini iptal etmek istediğinize emin misiniz? Kaynak depodaki rezervasyonlar iptal edilecektir.",
      confirmText: "Evet, İptal Et",
      cancelText: "Vazgeç",
    });

    if (isConfirmed) {
      setIsCancelling(true);
      transferService
        .cancelAsync({ transferOrderId: orderId })
        .then(() => {
          notifySuccess(
            "Transfer fişi iptal edildi ve rezerve stoklar serbest bırakıldı.",
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
        <TransferListHeader
          isStaff={isStaff}
          onCreateNew={() => router.push("/documents/transfer/create")}
        />
        <TransferListTable
          orders={orders}
          isStaff={isStaff}
          isCancelling={isCancelling}
          onView={(id) => router.push(`/documents/transfer/${id}`)}
          onCancel={handleCancelClick}
        />
      </Box>
    </LayoutWrapper>
  );
}
