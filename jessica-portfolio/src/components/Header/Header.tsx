"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `${styles.link} ${pathname === href ? styles.linkActive : ""}`;

  const mobileLinkClass = (href: string) =>
    `${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ""}`;

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Jessica Rozycka, photographe"
          onClick={closeMenu}
        >
          <span className={styles.brandName}>JESSICA ROZYCKA</span>
          <span className={styles.brandRole}>Photographe</span>
        </Link>

        {/* Desktop */}
        <div className={styles.desktopNav}>
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
            >
              <InstagramIcon size={24} />
            </a>

            <button
              type="button"
              className={styles.iconButton}
              onClick={() => shareOrCopy(window.location.href)}
            >
              <ShareIcon size={22} />
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineTopOpen : ""}`} />
            <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineMiddleOpen : ""}`} />
            <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineBottomOpen : ""}`} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuInner}>
          <Link href="/evenementiel" className={mobileLinkClass("/evenementiel")} onClick={closeMenu}>
            Événementiel
          </Link>

          <Link href="/plateau" className={mobileLinkClass("/plateau")} onClick={closeMenu}>
            Plateau
          </Link>

          <Link href="/social" className={mobileLinkClass("/social")} onClick={closeMenu}>
            Social
          </Link>

          <Link href="/a-propos" className={mobileLinkClass("/a-propos")} onClick={closeMenu}>
            À propos
          </Link>

          <Link href="/contact" className={mobileLinkClass("/contact")} onClick={closeMenu}>
            Contact
          </Link>

          <div className={styles.mobileMenuIcons}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={styles.mobileIconButton}>
              <InstagramIcon size={26} />
            </a>

            <button
              type="button"
              className={styles.mobileIconButton}
              onClick={() => shareOrCopy(window.location.href)}
            >
              <ShareIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}