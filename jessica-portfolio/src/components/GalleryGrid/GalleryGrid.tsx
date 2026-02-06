import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import type { Photo } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type GalleryGridProps = {
  photos: Photo[];
};

function getTileClass(index: number) {
  const pattern = ["big", "", "tall", "", "wide", "", ""] as const;
  return pattern[index % pattern.length];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <section className={styles.grid} aria-label="Photo gallery">
      {photos.map((photo, index) => {
        const tile = getTileClass(index);

        return (
          <div
            key={photo._id}
            className={`${styles.item} ${tile ? styles[tile] : ""}`}
          >
            <Image
              className={styles.image}
              src={urlFor(photo.image).width(1600).height(1600).quality(85).url()}
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