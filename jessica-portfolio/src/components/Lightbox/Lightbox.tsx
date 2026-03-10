"use client";

import Image from "next/image";
import styles from "./Lightbox.module.css";
import type { Photo } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const touchStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const photo = photos[index];

  const currentImageKey = useMemo(() => {
    if (!photo) return "";
    return `${photo._id}-${isFullscreen ? "fullscreen" : "lightbox"}`;
  }, [photo, isFullscreen]);

  const currentLoaded = loadedKey === currentImageKey;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          onClose();
        }
      }

      if (!isFullscreen && e.key === "ArrowLeft") onPrev();
      if (!isFullscreen && e.key === "ArrowRight") onNext();
    };

    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFsChange);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFsChange);
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

  const handleTouchEnd = () => {
    if (dragOffset > 50) {
      setAnimate(false);
      onPrev();
    } else if (dragOffset < -50) {
      setAnimate(false);
      onNext();
    } else {
      setAnimate(true);
    }

    setDragOffset(0);
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={wrapRef}
        className={`${styles.wrapper} ${isFullscreen ? styles.fullscreen : ""}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          if (touchStartX.current === null) return;
          setDragOffset(e.touches[0].clientX - touchStartX.current);
        }}
        onTouchEnd={handleTouchEnd}
      >
        {!isFullscreen && (
          <>
            <div className={styles.topRight}>
              <button
                onClick={toggleFullscreen}
                aria-label="Plein écran"
                type="button"
              >
                ⛶
              </button>
              <button onClick={onClose} aria-label="Fermer" type="button">
                ✕
              </button>
            </div>

            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={onPrev}
              aria-label="Précédente"
              type="button"
            >
              <span className={styles.arrowIcon}>›</span>
            </button>

            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={onNext}
              aria-label="Suivante"
              type="button"
            >
              <span className={styles.arrowIcon}>›</span>
            </button>

            <div className={styles.carouselWrapper}>
              {!currentLoaded && (
                <div className={styles.loaderWrap} aria-hidden="true">
                  <div className={styles.loader} />
                </div>
              )}

              <div
                className={styles.carousel}
                style={{
                  transform: `translateX(calc(-33.333% + ${dragOffset}px))`,
                  transition:
                    animate && dragOffset === 0
                      ? "transform 0.25s ease-out"
                      : "none",
                }}
              >
                {[-1, 0, 1].map((offset) => {
                  const p = photos[(index + offset + photos.length) % photos.length];
                  const isCurrent = offset === 0;

                  return (
                    <div key={offset} className={styles.carouselSlide}>
                      <Image
                        src={urlFor(p.image).quality(90).url()}
                        alt={p.alt}
                        width={2400}
                        height={1600}
                        sizes="85vw"
                        className={`${styles.image} ${
                          isCurrent && currentLoaded ? styles.imageLoaded : ""
                        }`}
                        priority={isCurrent}
                        onLoad={() => {
                          if (isCurrent) {
                            setLoadedKey(currentImageKey);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
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
              type="button"
            >
              ✕
            </button>

            {!currentLoaded && (
              <div className={styles.loaderWrap} aria-hidden="true">
                <div className={styles.loader} />
              </div>
            )}

            <Image
              src={urlFor(photo.image).quality(90).url()}
              alt={photo.alt}
              width={2400}
              height={1600}
              sizes="100vw"
              className={`${styles.fullscreenImage} ${
                currentLoaded ? styles.imageLoaded : ""
              }`}
              priority
              onLoad={() => setLoadedKey(currentImageKey)}
            />
          </>
        )}
      </div>
    </div>
  );
}