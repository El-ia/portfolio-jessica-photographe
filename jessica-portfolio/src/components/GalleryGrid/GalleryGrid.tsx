"use client";

import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { useCallback, useState } from "react";
import { Lightbox } from "@/components/Lightbox/Lightbox";

type GalleryGridProps = {
  photos: Photo[];
  pageKey?: PageKey;
};

function getTileClass(index: number) {
  const pattern = ["big", "", "tall", "", "wide", "", ""] as const;
  return pattern[index % pattern.length];
}

export function GalleryGrid({ photos, pageKey = "home" }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i + 1) % photos.length;
    });
  }, [photos.length]);

  return (
    <>
      <section className={styles.grid} aria-label="Photo gallery">
        {photos.map((photo, index) => {
          const tile = getTileClass(index);
          const thumbImage = photo.crops?.[pageKey] ?? photo.image;

          return (
            <button
              key={photo._id}
              type="button"
              className={`${styles.item} ${tile ? styles[tile] : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ouvrir ${photo.alt}`}
            >
              <Image
                className={styles.image}
                src={urlFor(thumbImage).width(1600).height(1600).quality(85).url()}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          );
        })}
      </section>

      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}