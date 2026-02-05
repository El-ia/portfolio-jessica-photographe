import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import type { Photo } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type GalleryGridProps = {
  photos: Photo[];
};

const FALLBACK_LAYOUT: Array<Photo["mosaicSize"]> = [
  "large",
  "vertical",
  "vertical",
  "large",
  "small",
  "small",
  "small",
];

export function GalleryGrid({ photos }: GalleryGridProps) {
  // Always render 7 slots to keep your CSS nth-of-type layout stable
  const slots = Array.from({ length: 7 }, (_, i) => photos[i] ?? null);

  return (
    <section className={styles.grid} aria-label="Photo gallery layout">
      {slots.map((photo, index) => {
        const mosaicSize = photo?.mosaicSize ?? FALLBACK_LAYOUT[index];

        return (
          <div
            key={photo?._id ?? `placeholder-${index}`}
            className={`${styles.item} ${styles[mosaicSize]}`}
          >
            {photo?.image ? (
              <Image
                className={styles.image}
                src={urlFor(photo.image).width(1600).height(1600).quality(85).url()}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 2}
              />
            ) : (
              <span className={styles.label}>{mosaicSize}</span>
            )}
          </div>
        );
      })}
    </section>
  );
}