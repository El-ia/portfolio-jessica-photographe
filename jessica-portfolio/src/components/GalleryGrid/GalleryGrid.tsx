import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type GalleryGridProps = {
  photos: Photo[];
  pageKey?: PageKey;
};

function getTileClass(index: number) {
  const pattern = ["big", "", "tall", "", "wide", "", ""] as const;
  return pattern[index % pattern.length];
}

export function GalleryGrid({ photos, pageKey = "home" }: GalleryGridProps) {
  return (
    <section className={styles.grid} aria-label="Photo gallery">
      {photos.map((photo, index) => {
        const tile = getTileClass(index);

        const image = photo.crops?.[pageKey] ?? photo.image;

        return (
          <div
            key={photo._id}
            className={`${styles.item} ${tile ? styles[tile] : ""}`}
          >
            <Image
              className={styles.image}
              src={urlFor(image).width(1600).height(1600).quality(85).url()}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        );
      })}
    </section>
  );
}