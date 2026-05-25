import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { analyticsDomain, siteUrl } from "@/lib/site";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TransferFiles - Fast & Secure Cross-Device File Transfer",
  description: "Transfer files between any devices without installation. Secure, encrypted P2P sharing works across networks - Android, iPhone, PC, Mac all supported.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "TransferFiles - Fast & Secure Cross-Device File Transfer",
    description: "Transfer files between any devices without installation. Secure, encrypted P2P sharing works across networks - Android, iPhone, PC, Mac all supported.",
    url: siteUrl,
    siteName: "TransferFiles",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TransferFiles - Fast & Secure Cross-Device File Transfer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TransferFiles - Fast & Secure Cross-Device File Transfer",
    description: "Transfer files between any devices without installation. Secure, encrypted P2P sharing works across networks.",
    images: ["/twitter-image.png"]
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
        {analyticsDomain ? (
          <script defer data-domain={analyticsDomain} src="https://app.pageview.app/js/script.js"></script>
        ) : null}
      </head>
      <body>
        <Header />
        {children}
        <Footer />

        
        {/* Google Analytics */}
        {gaId ? (
          <>
            <Script 
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
} 
