"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";

const INSTAGRAM_URL = "https://www.instagram.com/rozatelli_images/";

async function shareOrCopy(url: string) {
  if (navigator.share) {
    await navigator.share({ title: document.title, url });
    return;
  }
  await navigator.clipboard.writeText(url);
  alert("Lien copié !");
}

export function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `${styles.link} ${pathname === href ? styles.linkActive : ""}`;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Jessica Rozycka, photographe"
        >
          <span className={styles.brandName}>JESSICA ROZYCKA</span>
          <span className={styles.brandRole}>Photographe</span>
        </Link>

        <Link href="/evenementiel" className={linkClass("/evenementiel")}>
          Événementiel
        </Link>
        <span className={styles.dot}>•</span>

        <Link href="/plateau" className={linkClass("/plateau")}>
          Plateau
        </Link>
        <span className={styles.dot}>•</span>

        <Link href="/social" className={linkClass("/social")}>
          Social
        </Link>
        <span className={styles.dot}>•</span>

        <Link href="/a-propos" className={linkClass("/a-propos")}>
          À propos
        </Link>
        <span className={styles.dot}>•</span>

        <Link href="/contact" className={linkClass("/contact")}>
          Contact
        </Link>

        <div className={styles.actions}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.iconButton}
            aria-label="Instagram"
          >
            <InstagramIcon size={24} />
          </a>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => shareOrCopy(window.location.href)}
            aria-label="Partager"
          >
            <ShareIcon size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}