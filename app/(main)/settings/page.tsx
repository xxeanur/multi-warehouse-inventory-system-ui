"use client";

import { Box, Grid } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

import SettingsHeader from "@/components/settings/SettingsHeader";
import RestApiSettingsCard from "@/components/settings/RestApiSettingsCard";
import WebhookSettingsCard from "@/components/settings/WebhookSettingsCard";
import SmtpSettingsCard from "@/components/settings/SmtpSettingsCard";
import BackupSettingsCard from "@/components/settings/BackupSettingsCard";

export default function SettingsPage() {
  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        <SettingsHeader />

        <Grid container rowSpacing={12} columnSpacing={4} sx={{ alignItems: "stretch" }}>
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", "& > *": { width: "100%" } }}
          >
            <RestApiSettingsCard />
          </Grid>

          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", "& > *": { width: "100%" } }}
          >
            <WebhookSettingsCard />
          </Grid>

          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", "& > *": { width: "100%" } }}
          >
            <SmtpSettingsCard />
          </Grid>

          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", "& > *": { width: "100%" } }}
          >
            <BackupSettingsCard />
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
