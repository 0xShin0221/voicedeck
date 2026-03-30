import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoiceDeck — Hear your AI agents, hands-free",
  description:
    "Queue AI agent replies. Listen hands-free. Reply by voice. Built for power users running 3+ AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#050510] text-white font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
