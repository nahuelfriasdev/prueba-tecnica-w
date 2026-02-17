import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/components/TrpcProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wortise Journal | Plataforma de Contenidos",
    template: "%s | Wortise Journal"
  },
  description: "Una plataforma moderna para autores y lectores. Gestión de contenidos de alto rendimiento construida con Next.js 15 y tRPC.",
  keywords: ["CMS", "Blog", "Wortise", "Next.js", "TypeScript", "tRPC"],
  authors: [{ name: "Nahuel" }],
  creator: "Nahuel",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://prueba-tecnica-w.vercel.app", 
    siteName: "Wortise Journal",
    title: "Wortise Journal - Gestión de Contenidos Pro",
    description: "Plataforma de blog moderna, rápida y escalable para autores.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Wortise Journal Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wortise Journal",
    description: "Plataforma de blog moderna y escalable.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
