"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Tabs, Tab, Typography } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

import UsersHeader from "@/components/users/UsersHeader";
import UsersFilterBar from "@/components/users/UsersFilterBar";
import UsersTable from "@/components/users/UsersTable";
import UserDetailDrawer from "@/components/users/UserDetailDrawer";
import ResetPasswordDialog from "@/components/users/ResetPasswordDialog";
import AddUserDialog from "@/components/users/AddUserDialog";

import { userService } from "@/services/identity/userService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { UserDto, UserRole } from "@/types/identity/user";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext";

export default function UsersPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const { confirm } = useConfirm();

  const [isStaff, setIsStaff] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [isActiveTab, setIsActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("ALL");
  const [selectedRole, setSelectedRole] = useState<string | number>("ALL");

  useEffect(() => {
    const userContextStr = localStorage.getItem("userContext");
    if (userContextStr) {
      try {
        const user = JSON.parse(userContextStr);
        if (user.role === UserRole.Staff || user.role === 2) setIsStaff(true);
        if (user.role === UserRole.SuperAdmin || user.role === 0)
          setIsSuperAdmin(true);
      } catch (error) {
        console.error("User context parse edilemedi", error);
      }
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (!currentUser) {
        const [meData, warehousesData] = await Promise.all([
          userService.getMeAsync(),
          warehouseService.getAllAsync(),
        ]);
        setCurrentUser(meData);
        setWarehouses(warehousesData);
      }

      const filter = {
        isActive: isActiveTab === 0,
        searchText: debouncedSearch,
        warehouseId: selectedWarehouse,
        role: selectedRole,
      };

      const usersData = await userService.getAllAsync(filter);
      setUsers(usersData);
    } catch (error) {
      console.error("Veriler getirilemedi:", error);
    } finally {
      setLoading(false);
    }
  }, [
    isActiveTab,
    debouncedSearch,
    selectedWarehouse,
    selectedRole,
    currentUser,
  ]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleRowClick = (user: UserDto) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleEditOpen = (user: UserDto) => {
    setSelectedUser(user);
    setAddUserOpen(true);
  };

  const handleResetPasswordOpen = (user: UserDto) => {
    setSelectedUser(user);
    setResetPasswordOpen(true);
  };

  const handleUserSuccess = () => {
    void fetchData();
    setAddUserOpen(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = async (user: UserDto) => {
    const isActivating = !user.isActive;
    const actionText = isActivating ? "yeniden aktifleştirmek" : "askıya almak";

    const isConfirmed = await confirm({
      title: isActivating ? "Hesabı Aktifleştir" : "Hesabı Askıya Al",
      description: `"${user.firstName} ${user.lastName}" isimli kullanıcının hesabını ${actionText} istediğinize emin misiniz?`,
      confirmText: isActivating ? "Evet, Aktifleştir" : "Evet, Askıya Al",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    try {
      await userService.toggleStatusAsync(user.id);
      notifySuccess(`Kullanıcı hesabı başarıyla güncellendi.`);
      setDrawerOpen(false);
      void fetchData();
    } catch (error) {
      notifyError("İşlem sırasında bir hata oluştu.");
      console.error("Durum değiştirilemedi:", error);
    }
  };

  const handlePasswordReset = async (newPassword: string) => {
    if (selectedUser) {
      try {
        await userService.resetPasswordAsync(selectedUser.id, newPassword);
        notifySuccess("Kullanıcının şifresi başarıyla sıfırlandı.");
        setResetPasswordOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Şifre sıfırlanamadı:", error);
      }
    }
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        <UsersHeader
          isStaff={isStaff}
          onAddUserClick={() => {
            setSelectedUser(null);
            setAddUserOpen(true);
          }}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={isActiveTab}
            onChange={(e, val) => setIsActiveTab(val)}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#172C4A",
              },
              "& .MuiTab-root": {
                color: "#6B7280",
                "&.Mui-selected": {
                  color: "#172C4A",
                },
              },
            }}
          >
            <Tab
              label="Aktif Personeller"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
              }}
            />
            <Tab
              label="Askıya Alınanlar"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
              }}
            />
          </Tabs>
        </Box>

        <UsersFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          warehouses={warehouses}
          isSuperAdmin={isSuperAdmin}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#172C4A" }} />
          </Box>
        ) : users.length === 0 ? (
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#6B7280", fontWeight: 500 }}
            >
              Kriterlere uygun kullanıcı bulunamadı.
            </Typography>
          </Box>
        ) : (
          <UsersTable
            users={users}
            warehouses={warehouses}
            currentUserId={currentUser?.id || ""}
            onRowClick={handleRowClick}
          />
        )}

        <UserDetailDrawer
          open={drawerOpen}
          user={selectedUser}
          currentUser={currentUser}
          onClose={() => setDrawerOpen(false)}
          onEdit={handleEditOpen}
          onResetPassword={handleResetPasswordOpen}
          onSuspend={handleToggleStatus}
        />

        <ResetPasswordDialog
          open={resetPasswordOpen}
          onClose={() => setResetPasswordOpen(false)}
          selectedUser={selectedUser}
          onConfirm={handlePasswordReset}
        />

        <AddUserDialog
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          onSuccess={handleUserSuccess}
          userToEdit={selectedUser}
          currentUser={currentUser}
        />
      </Box>
    </LayoutWrapper>
  );
}
