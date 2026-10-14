import type { Metadata } from "next";
import { DM_Sans, Caveat, Fredoka, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Tipografía principal
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Tipografía para títulos
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

// Tipografía decorativa
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NALU | Good Mood Department",
  description:
    "Descubre NALU, bolis colombianos elaborados con frutas reales. Sabores tropicales, momentos felices y mucha buena energía.",
  keywords: [
    "NALU",
    "bolis colombianos",
    "bolis de fruta",
    "helados artesanales",
    "Bogotá",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(dmSans.variable, caveat.variable, fredoka.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}