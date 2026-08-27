"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  CircularProgress,
} from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import AddIcon from "@mui/icons-material/Add";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import AddWarehouseModal from "@/components/warehouses/AddWarehouseModal";
import { warehouseService } from "@/services/definitions/warehouseService";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { formatVolume } from "@/utils/formatters";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext";
import { userService } from "@/services/identity/userService";
import { UserRole } from "@/types/identity/user";

export default function WarehousesPage() {
  const router = useRouter();
  const { confirm } = useConfirm();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([warehouseService.getAllAsync(), userService.getMeAsync()])
      .then(([warehouseData, user]) => {
        if (isMounted) {
          setWarehouses(warehouseData);
          if (user.role === UserRole.SuperAdmin) {
            setIsSuperAdmin(true);
          }
        }
      })
      .catch((error) => {
        console.error("Veriler yüklenirken hata oluştu:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const reloadWarehouses = () => {
    warehouseService.getAllAsync().then((data) => setWarehouses(data));
  };

  const handleCardClick = (id: string) => {
    router.push(`/warehouses/${id}`);
  };

  const handleDeleteClick = async (
    e: React.MouseEvent,
    warehouse: WarehouseDto,
  ) => {
    e.stopPropagation();

    const isConfirmed = await confirm({
      title: "Depoyu Sil",
      description: `"${warehouse.name}" adlı depoyu silmek istediğinize emin misiniz? (İçi dolu depolar silinemez).`,
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    try {
      await warehouseService.removeAsync(warehouse.id);
      notifySuccess("Depo başarıyla silindi.");
      reloadWarehouses();
    } catch (error) {
      notifyError("Depo silinirken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
            >
              Depo ve Konum Yönetimi
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Depoların hacimsel doluluk oranlarını ve raf kırılımlarını takip
              edin
            </Typography>
          </Box>
          {isSuperAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              disableElevation
              onClick={() => setIsAddModalOpen(true)}
              sx={{
                bgcolor: "#172C4A",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#0F1D33" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Yeni Depo Tanımla
            </Button>
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#172C4A" }} />
          </Box>
        ) : warehouses.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6, color: "#6B7280" }}>
            Sistemde kayıtlı depo bulunamadı.
          </Box>
        ) : (
          <Grid container spacing={3}>
            {warehouses.map((warehouse) => {
              const fillPercentage =
                warehouse.maxCapacity > 0
                  ? (warehouse.usedCapacity / warehouse.maxCapacity) * 100
                  : 0;
              const isCritical = fillPercentage > 90;
              const statusText =
                warehouse.operationalStatus === 1 // 1: Active
                  ? isCritical
                    ? "Dolu"
                    : "Aktif"
                  : warehouse.operationalStatus === 3 // 3: UnderMaintenance
                    ? "Bakımda"
                    : "Pasif";

              return (
                <Grid size={{ xs: 12, md: 6, lg: 6 }} key={warehouse.id}>
                  <Card
                    onClick={() => handleCardClick(warehouse.id)}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #0c0c0c",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      "&:hover": {
                        borderColor: "#172C4A",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "#F3F4F6",
                              p: 1,
                              borderRadius: 2,
                              color: "#172C4A",
                            }}
                          >
                            <WarehouseOutlinedIcon />
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                color: "#111827",
                                lineHeight: 1.2,
                              }}
                            >
                              {warehouse.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              <LocationOnOutlinedIcon
                                sx={{ fontSize: 14, color: "#6B7280" }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "#6B7280" }}
                              >
                                {warehouse.city}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Chip
                            label={statusText}
                            size="small"
                            sx={{
                              bgcolor: isCritical ? "#FEF2F2" : "#ECFCCB",
                              color: isCritical ? "#DC2626" : "#047857",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                          {isSuperAdmin && (
                            <IconButton
                              size="small"
                              onClick={(e) => handleDeleteClick(e, warehouse)}
                              sx={{
                                color: "#9CA3AF",
                                "&:hover": {
                                  color: "#DC2626",
                                  bgcolor: "#FEF2F2",
                                },
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, color: "#374151" }}
                          >
                            Hacim Doluluk Oranı
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: isCritical ? "#DC2626" : "#111827",
                            }}
                          >
                            %{fillPercentage.toFixed(1)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(100, Math.max(0, fillPercentage))}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#F3F4F6",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: isCritical ? "#EF4444" : "#172C4A",
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: "#9CA3AF", display: "block", mt: 1 }}
                        >
                          {formatVolume(warehouse.usedCapacity)} /{" "}
                          {formatVolume(warehouse.maxCapacity)} kullanılıyor
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {isSuperAdmin && (
          <AddWarehouseModal
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => reloadWarehouses()}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
}
