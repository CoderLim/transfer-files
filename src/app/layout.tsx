import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransferFiles - Fast & Secure Cross-Device File Transfer",
  description: "Transfer files between any devices without installation. Secure, encrypted P2P sharing works across networks - Android, iPhone, PC, Mac all supported.",
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
} 