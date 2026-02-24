import Image from "next/image";
import styles from "./Hero.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import type React from "react";

type HeroProps = {
  photos: Photo[];
  pageKey?: PageKey; // home | plateau | social | evenementiel
};

type CSSVarStyle = React.CSSProperties & {
  "--delay"?: string;
  "--duration"?: string;
};

const TOTAL_DURATION_SECONDS = 12; 

export function Hero({ photos, pageKey = "home" }: HeroProps) {
  if (!photos?.length) {
    return (
      <section className={styles.hero}>
        <div className={styles.placeholder}>Aucune photo</div>
      </section>
    );
  }

  const step = TOTAL_DURATION_SECONDS / photos.length;

  return (
    <section className={styles.hero} aria-label="Slideshow">
      <ul className={styles.slideshow}>
        {photos.map((photo, index) => {
          const image = photo.crops?.[pageKey] ?? photo.image;

          const cssVars: CSSVarStyle = {
            "--delay": `${index * step}s`,
            "--duration": `${TOTAL_DURATION_SECONDS}s`,
          };

          return (
            <li key={photo._id} className={styles.slide} style={cssVars}>
              <Image
                className={styles.image}
                src={urlFor(image).width(2400).height(1600).quality(90).url()}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}