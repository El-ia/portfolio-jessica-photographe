export const revalidate = 3600;

import { client } from "@/sanity/lib/client";
import { photosByCategoryQuery } from "@/sanity/queries";
import { GalleryGrid } from "@/components/GalleryGrid/GalleryGrid";
import type { Photo, PhotoCategory } from "@/sanity/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ALLOWED: PhotoCategory[] = ["evenementiel", "plateau", "social"];

const categoryMeta: Record<PhotoCategory, { title: string; description: string }> = {
  evenementiel: {
    title: "Photographie Événementielle",
    description:
      "Photos d'événements professionnels et particuliers en Île-de-France. Conférences, soirées, lancements de produits — Jessica Rozycka capture chaque moment.",
  },
  plateau: {
    title: "Photographie Plateau & Studio",
    description:
      "Séances photo en studio et plateau : portraits, packshots, contenus corporate. Jessica Rozycka, photographe plateau à Paris et Île-de-France.",
  },
  social: {
    title: "Photographie Social Media",
    description:
      "Contenus visuels pour les réseaux sociaux : photos lifestyle, brand content et social media. Jessica Rozycka, photographe social media en Île-de-France.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category as PhotoCategory];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${category}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://jessicarozyckaphoto.fr/${category}`,
    },
  };
}

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryGalleryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = category as PhotoCategory;

  if (!ALLOWED.includes(cat)) notFound();

  const photos: Photo[] = await client.fetch(photosByCategoryQuery, {
    category: cat,
  });

  return <GalleryGrid photos={photos} pageKey={cat} />;
}