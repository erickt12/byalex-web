import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google"; // 1. Importamos las fuentes
import "./globals.css";

// 2. Las configuramos
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  display: "swap",
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "ByAlex | WebDesing",
  description: "Forging the digital future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Inyectamos las variables CSS en el body */}
      <body className={`${syne.variable} ${jetbrains.variable} bg-[#050507] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}