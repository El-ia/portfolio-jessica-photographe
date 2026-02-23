import { client } from "@/sanity/lib/client";
import { homePhotosQuery, slideshowPhotosQuery } from "@/sanity/queries";

import { Hero } from "@/components/Hero/Hero";
import { GalleryGrid } from "@/components/GalleryGrid/GalleryGrid";

export default async function HomePage() {
  const slideshowPhotos = await client.fetch(slideshowPhotosQuery);
  const homePhotos = await client.fetch(homePhotosQuery);

  return (
    <>
      <Hero photos={slideshowPhotos} pageKey="home" />
      <GalleryGrid photos={homePhotos} pageKey="home" />
    </>
  );
}