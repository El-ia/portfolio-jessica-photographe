"use client";

import Image from "next/image";
import styles from "./Lightbox.module.css";
import type { Photo } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useRef, useState } from "react";

type LightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const photo = photos[index];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      }

      if (!isFullscreen && e.key === "ArrowLeft") onPrev();
      if (!isFullscreen && e.key === "ArrowRight") onNext();
    };

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, isFullscreen]);

  if (!photo) return null;

  const toggleFullscreen = async () => {
    const el = wrapRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div
        ref={wrapRef}
        className={`${styles.wrapper} ${isFullscreen ? styles.fullscreen : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!isFullscreen && (
          <>
            <div className={styles.topRight}>
              <button onClick={toggleFullscreen} aria-label="Plein écran" title="Plein écran">
                ⛶
              </button>
              <button onClick={onClose} aria-label="Fermer" title="Fermer">
                ✕
              </button>
            </div>

            <div className={styles.content}>
              <button className={styles.arrow} onClick={onPrev} aria-label="Précédente" title="Précédente">
                ‹
              </button>

              <div className={styles.imageContainer}>
                <Image
                  src={urlFor(photo.image).quality(90).url()}
                  alt={photo.alt}
                  width={2400}
                  height={1600}
                  sizes="100vw"
                  className={styles.image}
                  priority
                />
              </div>

              <button className={styles.arrow} onClick={onNext} aria-label="Suivante" title="Suivante">
                ›
              </button>
            </div>

            <div className={styles.caption}>{photo.title ?? photo.alt}</div>
          </>
        )}

        {isFullscreen && (
          <>
            <button
              className={styles.exitFullscreen}
              onClick={toggleFullscreen}
              aria-label="Quitter plein écran"
              title="Quitter plein écran"
            >
              ✕
            </button>

            <Image
              src={urlFor(photo.image).quality(90).url()}
              alt={photo.alt}
              width={2400}
              height={1600}
              sizes="100vw"
              className={styles.fullscreenImage}
              priority
            />
          </>
        )}
      </div>
    </div>
  );
}