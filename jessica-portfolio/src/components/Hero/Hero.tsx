"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import type { Photo, PageKey } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import type React from "react";

type HeroProps = {
  photos: Photo[];
  pageKey?: PageKey;
};

const TOTAL_DURATION = 12; // seconds
const FADE_PCT = 8; // % of cycle for fade-in and fade-out

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
          const slideStyle: React.CSSProperties = {
            animationName: animName,
            animationDuration: `${TOTAL_DURATION}s`,
            animationDelay: `${index * step}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          };

          return (
            <li key={photo._id} className={styles.slide} style={slideStyle}>
              <Image
                className={styles.image}
                src={urlFor(photo.image).width(2400).height(1600).quality(90).url()}
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