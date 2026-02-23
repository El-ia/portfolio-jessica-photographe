import { client } from "@/sanity/lib/client";
import { photosByCategoryQuery } from "@/sanity/queries";
import { GalleryGrid } from "@/components/GalleryGrid/GalleryGrid";
import type { Photo, PhotoCategory } from "@/sanity/types";
import { notFound } from "next/navigation";

const ALLOWED: PhotoCategory[] = ["evenementiel", "plateau", "social"];

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