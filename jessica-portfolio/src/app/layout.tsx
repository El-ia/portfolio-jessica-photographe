import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

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
  metadataBase: new URL("https://jessicarozyckaphoto.fr"),
  title: {
    template: "%s | Jessica Rozycka Photographe",
    default: "Jessica Rozycka – Photographe Île-de-France",
  },
  description:
    "Jessica Rozycka, photographe professionnelle en Île-de-France. Spécialisée en photographie événementielle, plateau et social media. Portfolio et prise de contact.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jessicarozyckaphoto.fr",
    siteName: "Jessica Rozycka Photographe",
    title: "Jessica Rozycka – Photographe Île-de-France",
    description:
      "Photographe professionnelle en Île-de-France, spécialisée en événementiel, plateau et social media.",
    images: [
      {
        url: "/images/a-propos/photo-jess.jpg",
        width: 420,
        height: 560,
        alt: "Jessica Rozycka, photographe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jessica Rozycka – Photographe Île-de-France",
    description:
      "Photographe professionnelle en Île-de-France, spécialisée en événementiel, plateau et social media.",
    images: ["/images/a-propos/photo-jess.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Jessica Rozycka Photographe",
  description:
    "Photographe professionnelle spécialisée en événementiel, plateau et social media, basée en Île-de-France.",
  url: "https://jessicarozyckaphoto.fr",
  image: "https://jessicarozyckaphoto.fr/images/a-propos/photo-jess.jpg",
  email: "jessicarozycka@yahoo.fr",
  areaServed: "Île-de-France",
  sameAs: ["https://www.instagram.com/rozatelli_images/"],
  founder: {
    "@type": "Person",
    name: "Jessica Rozycka",
    jobTitle: "Photographe professionnelle",
    image: "https://jessicarozyckaphoto.fr/images/a-propos/photo-jess.jpg",
    sameAs: ["https://www.instagram.com/rozatelli_images/"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${garamond.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}