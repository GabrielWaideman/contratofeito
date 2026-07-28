import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Contrato Feito - Imobiliária Digital",
  description: "Especialistas no mercado imobiliário urbano e rural em Álvares Florence e região. Encontre o imóvel perfeito para morar ou investir.",
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
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-white text-gray-900`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
