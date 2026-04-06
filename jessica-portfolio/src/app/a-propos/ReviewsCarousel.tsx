"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ReviewsCarousel.module.css";
import type { Review } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

type ViewMode = "desktop" | "tablet" | "mobile";

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const touchStartX = useRef<number | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [current, setCurrent] = useState(3);
  const [dragOffset, setDragOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 640px)");
    const tabletMedia = window.matchMedia("(max-width: 900px)");

    const update = () => {
      if (mobileMedia.matches) {
        setViewMode("mobile");
      } else if (tabletMedia.matches) {
        setViewMode("tablet");
      } else {
        setViewMode("desktop");
      }
    };

    update();

    mobileMedia.addEventListener("change", update);
    tabletMedia.addEventListener("change", update);

    return () => {
      mobileMedia.removeEventListener("change", update);
      tabletMedia.removeEventListener("change", update);
    };
  }, []);

  const visibleCount =
    viewMode === "mobile" ? 1 : viewMode === "tablet" ? 2 : 3;

  const cloneCount = visibleCount;

  const loopedReviews = useMemo(() => {
    if (!reviews.length) return [];

    return [
      ...reviews.slice(-cloneCount),
      ...reviews,
      ...reviews.slice(0, cloneCount),
    ];
  }, [reviews, cloneCount]);

  useEffect(() => {
    setAnimate(false);
    setCurrent(visibleCount);
    setDragOffset(0);
    setIsAnimating(false);
  }, [visibleCount]);

  const prev = () => {
    if (isAnimating || !reviews.length) return;
    setAnimate(true);
    setIsAnimating(true);
    setDragOffset(0);
    setCurrent((c) => c - 1);
  };

  const next = () => {
    if (isAnimating || !reviews.length) return;
    setAnimate(true);
    setIsAnimating(true);
    setDragOffset(0);
    setCurrent((c) => c + 1);
  };

  const handleTransitionEnd = () => {
    if (!reviews.length) return;

    if (current < cloneCount) {
      setAnimate(false);
      setCurrent(current + reviews.length);
      setIsAnimating(false);
      return;
    }

    if (current >= reviews.length + cloneCount) {
      setAnimate(false);
      setCurrent(current - reviews.length);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  };

  const handleTouchEnd = () => {
    if (viewMode !== "mobile") return;

    if (dragOffset > 50) {
      prev();
    } else if (dragOffset < -50) {
      next();
    } else {
      setAnimate(true);
      setDragOffset(0);
    }

    touchStartX.current = null;
  };

  if (!reviews.length) return null;

  const slidePercent = 100 / visibleCount;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.viewport}
        onTouchStart={(e) => {
          if (viewMode !== "mobile") return;
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          if (viewMode !== "mobile" || touchStartX.current === null) return;
          setDragOffset(e.touches[0].clientX - touchStartX.current);
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${current * slidePercent}% + ${dragOffset}px))`,
            transition:
              animate && dragOffset === 0 ? "transform 0.35s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopedReviews.map((review, i) => (
            <article key={`${review._id}-${i}`} className={styles.card}>
              <Image
                src={urlFor(review.image).width(440).height(520).quality(90).url()}
                alt={review.author}
                width={220}
                height={260}
                className={styles.image}
              />
              <p className={styles.text}>{review.text}</p>
              <p className={styles.author}>{review.author}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.nav}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          aria-label="Avis précédent"
          disabled={isAnimating}
        >
          <span className={styles.arrowIcon}>›</span>
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          aria-label="Avis suivant"
          disabled={isAnimating}
        >
          <span className={styles.arrowIcon}>›</span>
        </button>
      </div>
    </div>
  );
}