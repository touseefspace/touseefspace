import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import FooterAndDock from "@/components/FooterAndDock";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://touseefspace.com"),
  title: "Touseef Ahmed | AI Systems & Software Developer",
  description: "I turn messy workflows into simple & reliable software spaces. Custom web applications and AI-powered systems.",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Touseef Ahmed | AI Systems & Software Developer",
    description: "I turn messy workflows into simple & reliable software spaces. Custom web applications and AI-powered systems.",
    url: "https://touseefspace.com",
    siteName: "touseefspace",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Touseef Ahmed | AI Systems & Software Developer",
    description: "I turn messy workflows into simple & reliable software spaces. Custom web applications and AI-powered systems.",
    creator: "@touseefspace",
  },
  icons: {
    icon: [
      {
        url: "/favicon_io_bglight_darklogo/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_io_bgdark_whitelogo/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon_io_bglight_darklogo/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_io_bgdark_whitelogo/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon_io_bgdark_whitelogo/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/favicon_io_bgdark_whitelogo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://touseefspace.com/#person",
      "name": "Touseef Ahmed",
      "jobTitle": "AI Systems and Software Developer",
      "url": "https://touseefspace.com",
      "sameAs": [
        "https://github.com/touseefspace",
        "https://linkedin.com/in/touseefspace",
        "https://x.com/touseefspace"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://touseefspace.com/#website",
      "url": "https://touseefspace.com",
      "name": "touseefspace",
      "publisher": {
        "@id": "https://touseefspace.com/#person"
      }
    }
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',d);var icons=document.querySelectorAll("link[rel*='icon']");icons.forEach(function(i){i.href=d==='light'?'/favicon_io_bglight_darklogo/favicon-32x32.png':'/favicon_io_bgdark_whitelogo/favicon-32x32.png';});}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <LayoutWrapper
            footerAndDock={
              <Suspense fallback={null}>
                <FooterAndDock />
              </Suspense>
            }
          >
            {children}
            {process.env.VERCEL === "1" && <SpeedInsights />}
          </LayoutWrapper>
        </Suspense>
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
