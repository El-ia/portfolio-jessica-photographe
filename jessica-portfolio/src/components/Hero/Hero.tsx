import Image from "next/image";
import styles from "./Hero.module.css";
import type { Photo } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type HeroProps = {
  photos: Photo[];
};

export function Hero({ photos }: HeroProps) {
  const firstPhoto = photos[0];

  if (!firstPhoto) {
    return (
      <section className={styles.hero}>
        <div className={styles.placeholder}>Aucune photo</div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <Image
        src={urlFor(firstPhoto.image).width(2000).height(1200).url()}
        alt={firstPhoto.alt}
        fill
        priority
        className={styles.image}
      />
    </section>
  );
}