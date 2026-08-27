"use client";

import { Box, Card, Typography, Avatar, Divider } from "@mui/material";
import { UserDto, UserRole } from "@/types/identity/user";

interface ProfileAvatarCardProps {
  user: UserDto;
}

export default function ProfileAvatarCard({ user }: ProfileAvatarCardProps) {
  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  const getRoleName = (role: UserRole | string | number) => {
    if (role === UserRole.SuperAdmin || role === "SuperAdmin" || role === 0)
      return "Sistem Yöneticisi";
    if (
      role === UserRole.WarehouseManager ||
      role === "WarehouseManager" ||
      role === 1
    )
      return "Depo Yöneticisi";
    if (role === UserRole.Staff || role === "Staff" || role === 2)
      return "Depo Personeli";
    return "Personel";
  };

  return (
    <Card
      elevation={0}
      sx={{
        ...sectionCardStyle,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          bgcolor: "#172C4A",
          opacity: 0.04,
          borderBottom: "1px solid #E5E7EB",
        }}
      />
      <Avatar
        src={user.avatarUrl}
        sx={{
          width: 90,
          height: 90,
          bgcolor: "#172C4A",
          fontSize: "2.25rem",
          fontWeight: 700,
          mx: "auto",
          mt: 2,
          mb: 2,
          border: "4px solid #FFFFFF",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </Avatar>

      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          bgcolor: "#EEF2FF",
          color: "#4F46E5",
          fontWeight: 700,
          px: 1.5,
          py: 0.5,
          borderRadius: 5,
          display: "inline-block",
          mt: 1,
        }}
      >
        {getRoleName(user.role)}
      </Typography>

      <Divider sx={{ my: 3, borderColor: "#F3F4F6" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, color: "#111827" }}
          >
            Aktif
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Hesap Durumu
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
