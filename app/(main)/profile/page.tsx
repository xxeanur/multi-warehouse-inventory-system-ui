"use client";

import { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAvatarCard from "@/components/profile/ProfileAvatarCard";
import AccountFormCard from "@/components/profile/AccountFormCard";
import ActiveSessionsCard from "@/components/profile/ActiveSessionsCard";
import NotificationPreferencesCard from "@/components/profile/NotificationPreferencesCard";

import { userService } from "@/services/identity/userService";
import { UserDto, UserProfileUpdateDto } from "@/types/identity/user";

export default function ProfilePage() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getMeAsync()
      .then((data) => setUser(data))
      .catch((error) => console.error("Profil bilgileri yüklenemedi:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleNotificationToggle = async (
    field: "receiveEmailNotifications" | "receiveInAppNotifications",
    newValue: boolean,
  ) => {
    if (!user) return;

    try {
      const profileUpdateDto: UserProfileUpdateDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        receiveEmailNotifications:
          field === "receiveEmailNotifications"
            ? newValue
            : user.receiveEmailNotifications,
        receiveInAppNotifications:
          field === "receiveInAppNotifications"
            ? newValue
            : user.receiveInAppNotifications,
      };

      await userService.updateProfileAsync(profileUpdateDto);

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          [field]: newValue,
        };
      });
    } catch (error) {
      console.error("Bildirim ayarları güncellenemedi:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#172C4A" }} />
        </Box>
      </LayoutWrapper>
    );
  }

  if (!user) {
    return (
      <LayoutWrapper>
        <Typography sx={{ color: "error.main", textAlign: "center", mt: 5 }}>
          Profil bilgileri yüklenemedi.
        </Typography>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        <ProfileHeader />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <ProfileAvatarCard user={user} />

              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <AccountFormCard user={user} />
              </Box>

              <ActiveSessionsCard />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <AccountFormCard user={user} />
              </Box>

              <NotificationPreferencesCard
                receiveEmailNotifications={
                  user.receiveEmailNotifications ?? true
                }
                receiveInAppNotifications={
                  user.receiveInAppNotifications ?? true
                }
                onToggleUpdate={handleNotificationToggle}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
