"use client";

import { Box, Grid } from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";

// Importlar doğrudan ana components klasörüne ayarlandı
import SecurityHeader from "../../../components/security/SecurityHeader";
import PasswordResetCard from "../../../components/security/PasswordResetCard";
import TwoFactorAuthCard from "../../../components/security/TwoFactorAuthCard";
import ActiveSessionsCard from "../../../components/security/ActiveSessionsCard";
import SecurityLogsCard from "../../../components/security/SecurityLogsCard";

export default function SecurityPage() {
  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        
        <SecurityHeader />

        <Grid container spacing={4}>
          {/* SOL KOLON: Şifre ve 2FA */}
          <Grid size={{xs:12,md:7}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <PasswordResetCard />
              <TwoFactorAuthCard />
            </Box>
          </Grid>

          {/* SAĞ KOLON: Oturumlar ve Güvenlik Logları */}
          <Grid size={{xs:12,md:5}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <ActiveSessionsCard />
              <SecurityLogsCard />
            </Box>
          </Grid>
        </Grid>
        
      </Box>
    </LayoutWrapper>
  );
}