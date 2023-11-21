import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Symbol",
  description: "Symbol Community Event",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"min-h-screen bg-background font-sans antialiased " + inter.variable}>{children}</body>
    </html>
  );
}