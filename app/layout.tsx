import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";

export const metadata = {
  title: "Entegre Yazılım ERP",
  description: "Akıllı Depo ve Stok Yönetim Sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        {/* MUI stillerinin Hydration hatası vermesini engeller */}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}