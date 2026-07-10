"use client";

import { Box, Grid } from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";

// Import yolları tamamen ana components klasörüne yönlendirildi
import ProfileHeader from "../../../components/profile/ProfileHeader";
import ProfileAvatarCard from "../../../components/profile/ProfileAvatarCard";
import AccountFormCard from "../../../components/profile/AccountFormCard";
import ActiveSessionsCard from "../../../components/profile/ActiveSessionsCard";
import NotificationPreferencesCard from "../../../components/profile/NotificationPreferencesCard";

export default function ProfilePage() {
  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        <ProfileHeader />

        <Grid container spacing={4}>
          {/* SOL KOLON */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <ProfileAvatarCard />

              {/* Mobil görünümde formu sola (yukarıya) alıyoruz */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <AccountFormCard />
              </Box>

              <ActiveSessionsCard />
            </Box>
          </Grid>

          {/* SAĞ KOLON */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Masaüstü görünümde formu sağa (ana alana) alıyoruz */}
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <AccountFormCard />
              </Box>

              <NotificationPreferencesCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
