import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { Roboto } from 'next/font/google';
import { Montserrat } from 'next/font/google';
 
// Roboto fontunu Next.js üzerinden optimize ederek çağırıyoruz
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', // CSS değişkeni olarak tanımladık
});

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
    // 'className' ile fontu html etiketine bağlıyoruz
    <html lang="tr" suppressHydrationWarning className={roboto.variable}>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'var(--font-roboto), sans-serif' // Tüm uygulamada Roboto kullanımı
      }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}