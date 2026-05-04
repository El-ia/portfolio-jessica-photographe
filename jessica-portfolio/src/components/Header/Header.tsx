"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { EmailIcon } from "@/components/icons/EmailIcon";

const INSTAGRAM_URL = "https://www.instagram.com/rozatelli_images/";
const SITE_URL = "https://jessica-rozycka.com";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const linkClass = (href: string) =>
    `${styles.link} ${pathname === href ? styles.linkActive : ""}`;

  const mobileLinkClass = (href: string) =>
    `${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ""}`;

  const closeMenu = () => setIsMenuOpen(false);
  const closeShare = () => setIsShareOpen(false);
  const openShare = () => setIsShareOpen(true);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(SITE_URL);
    setIsCopied(true);
  
    window.setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isShareOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isShareOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsShareOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              aria-label="Instagram"
            >
              <InstagramIcon size={24} />
            </a>

            <button
              type="button"
              className={styles.iconButton}
              onClick={openShare}
              aria-label="Partager"
            >
              <ShareIcon size={22} />
            </button>
          </div>
        </div>

        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span
              className={`${styles.menuLine} ${
                isMenuOpen ? styles.menuLineTopOpen : ""
              }`}
            />
            <span
              className={`${styles.menuLine} ${
                isMenuOpen ? styles.menuLineMiddleOpen : ""
              }`}
            />
            <span
              className={`${styles.menuLine} ${
                isMenuOpen ? styles.menuLineBottomOpen : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuInner}>
          <Link
            href="/evenementiel"
            className={mobileLinkClass("/evenementiel")}
            onClick={closeMenu}
          >
            Événementiel
          </Link>

          <Link
            href="/plateau"
            className={mobileLinkClass("/plateau")}
            onClick={closeMenu}
          >
            Plateau
          </Link>

          <Link
            href="/social"
            className={mobileLinkClass("/social")}
            onClick={closeMenu}
          >
            Social
          </Link>

          <Link
            href="/a-propos"
            className={mobileLinkClass("/a-propos")}
            onClick={closeMenu}
          >
            À propos
          </Link>

          <Link
            href="/contact"
            className={mobileLinkClass("/contact")}
            onClick={closeMenu}
          >
            Contact
          </Link>

          <div className={styles.mobileMenuIcons}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.mobileIconButton}
              aria-label="Instagram"
            >
              <InstagramIcon size={26} />
            </a>

            <button
              type="button"
              className={styles.mobileIconButton}
              onClick={openShare}
              aria-label="Partager"
            >
              <ShareIcon size={24} />
            </button>
          </div>
        </div>
      </div>

      {isShareOpen && (
        <div className={styles.shareOverlay} onClick={closeShare}>
          <div
            className={styles.shareModal}
            onClick={(event) => event.stopPropagation()}
          >
            <p className={styles.shareTitle}>Partager</p>

            <div className={styles.shareInput}>
              <span className={styles.shareUrl}>{SITE_URL}</span>

              <button
              type="button"
              className={`${styles.copyButton} ${isCopied ? styles.copyButtonCopied : ""}`}
              onClick={handleCopyLink}
              aria-label="Copier le lien"
            >
              {isCopied ? (
                <span className={styles.copyButtonIcon}>✓</span>
              ) : (
                <span className={styles.copyButtonIcon}>⧉</span>
              )}
            </button>
            </div>

            <div className={styles.shareIcons}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  SITE_URL
                )}`}
                target="_blank"
                rel="noreferrer"
                className={styles.shareCircle}
                aria-label="Partager sur Facebook"
              >
                <FacebookIcon className={`${styles.shareCircleIcon} ${styles.shareCircleIconFacebook}`} />
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(SITE_URL)}`}
                target="_blank"
                rel="noreferrer"
                className={styles.shareCircle}
                aria-label="Partager sur WhatsApp"
              >
                <WhatsappIcon className={`${styles.shareCircleIcon} ${styles.shareCircleIconWhatsapp}`} />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.shareCircle}
                aria-label="Voir Instagram"
              >
                <InstagramIcon className={`${styles.shareCircleIcon} ${styles.shareCircleIconInstagram}`} />
              </a>

              <a
              href={`mailto:?subject=${encodeURIComponent(
                "Jessica Rozycka"
              )}&body=${encodeURIComponent(SITE_URL)}`}
              className={styles.shareCircle}
              aria-label="Partager par email"
              >
                <EmailIcon className={`${styles.shareCircleIcon} ${styles.shareCircleIconEmail}`} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}