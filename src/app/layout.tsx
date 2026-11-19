import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Jost, Playfair_Display } from "next/font/google";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Luxe Organization | Vision 2035",
    template: "%s | The Luxe Organization",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "The Luxe Organization",
  openGraph: {
    type: "website",
    siteName: "The Luxe Organization",
    title: "The Luxe Organization | Vision 2035",
    description:
      "Investing in the infrastructure of tomorrow: energy, computing, healthcare and connectivity, from Pakistan to the world.",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} antialiased`}>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
