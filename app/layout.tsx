import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Zidan Masadita — Mobile Developer & HomeCycle Creator",
  description:
    "Hi! I'm Zidan Masadita, a passionate mobile developer building HomeCycle — an app using AI to track expiration dates and manage food inventory, powered by Sunda Empire.",
  keywords: [
    "Zidan Masadita",
    "mobile developer",
    "HomeCycle app",
    "portfolio",
    "React Native",
    "eco app",
    "food waste tracker",
  ],
};

import LenisProvider from "../components/LenisProvider";
import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
