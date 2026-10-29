import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";
import TestimonialToast from "@/components/TestimonialToast";
import PageTracker from "@/components/PageTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { getSiteUrl, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Contrato Feito",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Contrato Feito",
  authors: [{ name: "Contrato Feito Imobiliária Digital" }],
  keywords: [
    "imobiliária",
    "Álvares Florence",
    "Votuporanga",
    "imóveis",
    "casas à venda",
    "terrenos",
    "chácaras",
    "sítios",
    "fazendas",
    "imóveis rurais",
    "Contrato Feito",
    "compra e venda de imóveis",
  ],
  creator: "Contrato Feito",
  publisher: "Contrato Feito",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Contrato Feito - Imobiliária Digital em Álvares Florence e Região",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-white text-gray-900`}>
        {children}
        <WhatsAppButton />
        <TestimonialToast />
        <PageTracker />
      </body>
    </html>
  );
}
