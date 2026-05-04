"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import type { CSSProperties } from "react";

type HeroProps = {
  photos: Photo[];
  pageKey?: PageKey;
};

const TOTAL_DURATION = 12;
const FADE_PCT = 8;

export function Hero({ photos }: HeroProps) {
  if (!photos?.length) {
    return (
      <section className={styles.hero}>
        <div className={styles.placeholder}>Aucune photo</div>
      </section>
    );
  }

  const n = photos.length;
  const step = TOTAL_DURATION / n;
  const stepPct = 100 / n;
  const fadePct = Math.min(FADE_PCT, stepPct * 0.4);
  const animName = `crossFade${n}`;

  const keyframesCSS = `@keyframes ${animName} {
    0% { opacity: 0; }
    ${fadePct.toFixed(2)}% { opacity: 1; }
    ${stepPct.toFixed(2)}% { opacity: 1; }
    ${(stepPct + fadePct).toFixed(2)}% { opacity: 0; }
    100% { opacity: 0; }
  }`;

  return (
    <section className={styles.hero} aria-label="Slideshow">
      <style>{keyframesCSS}</style>
      <ul className={styles.slideshow} aria-hidden="true">
        {photos.map((photo, index) => {
          const delay = index === 0
            ? -(fadePct / 100) * TOTAL_DURATION
            : index * step;

          const slideStyle: CSSProperties = {
            animationName: animName,
            animationDuration: `${TOTAL_DURATION}s`,
            animationDelay: `${delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "backwards",
          };

          return (
            <li key={photo._id} className={styles.slide} style={slideStyle}>
              <Image
                className={styles.image}
                src={urlFor(photo.image).width(1920).height(1280).quality(80).url()}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </li>
          );
        })}
      </ul>

      <a
        href="#gallery"
        className={styles.scrollDown}
        aria-label="Aller à la galerie"
        title="Aller à la galerie"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className={styles.scrollDownIcon}>›</span>
      </a>
    </section>
  );
}
