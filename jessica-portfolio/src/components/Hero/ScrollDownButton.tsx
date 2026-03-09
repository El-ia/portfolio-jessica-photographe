"use client";

import { useCallback } from "react";
import type React from "react";

type Props = {
  targetId: string;
  extraOffset?: number;
  className?: string;
  ariaLabel?: string;
  title?: string;
  children?: React.ReactNode;
};

function getHeaderHeightPx() {
  const header =
    document.querySelector("header") ||
    document.querySelector('[role="banner"]');

  if (!header) return 0;
  return Math.round(header.getBoundingClientRect().height);
}

export function ScrollDownButton({
  targetId,
  extraOffset = 10,
  className,
  ariaLabel = "Aller à la galerie",
  title = "Aller à la galerie",
  children = "↓",
}: Props) {
  const onClick = useCallback(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    document.documentElement.classList.add("is-scrolling");

    const headerH = getHeaderHeightPx();
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerH - extraOffset;

    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReduced ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, prefersReduced ? 0 : 800);
    });
  }, [targetId, extraOffset]);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
}