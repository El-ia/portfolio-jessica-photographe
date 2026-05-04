export const revalidate = 3600;

import { client } from "@/sanity/lib/client";
import { homePhotosQuery, slideshowPhotosQuery } from "@/sanity/queries";
import { Hero } from "@/components/Hero/Hero";
import { GalleryGrid } from "@/components/GalleryGrid/GalleryGrid";

export default async function HomePage() {
  const [slideshowPhotos, homePhotos] = await Promise.all([
    client.fetch(slideshowPhotosQuery),
    client.fetch(homePhotosQuery),
  ]);

  return (
    <>
      <Hero photos={slideshowPhotos} pageKey="home" />

      <div id="gallery">
        <GalleryGrid photos={homePhotos} pageKey="home" />
      </div>
    </>
  );
}