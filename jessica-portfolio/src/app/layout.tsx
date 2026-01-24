import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jessica Rozycka – Photographe",
  description: "Portfolio photo – Événementiel, Plateau, Social.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* These classes inject the CSS variables for the fonts */}
      <body className={`${inter.variable} ${garamond.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}