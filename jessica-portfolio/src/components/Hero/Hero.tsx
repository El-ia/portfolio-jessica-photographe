import Image from "next/image";
import styles from "./Hero.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type HeroProps = {
  photos: Photo[];
  pageKey?: PageKey; // home | plateau | social | evenementiel
};

export function Hero({ photos, pageKey = "home" }: HeroProps) {
  const firstPhoto = photos[0];

  if (!firstPhoto) {
    return (
      <section className={styles.hero}>
        <div className={styles.placeholder}>Aucune photo</div>
      </section>
    );
  }

  const image = firstPhoto.crops?.[pageKey] ?? firstPhoto.image;

  return (
    <section className={styles.hero}>
      <Image
        src={urlFor(image).width(2000).height(1200).quality(90).url()}
        alt={firstPhoto.alt}
        fill
        priority
        className={styles.image}
      />
    </section>
  );
}