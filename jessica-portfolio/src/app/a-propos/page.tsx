import Image from "next/image";
import styles from "./page.module.css";
import {
  Instagram,
  ArrowRight,
  Smile,
  Lightbulb,
  Gift,
  ShieldCheck,
} from "lucide-react";
import ReviewsCarousel from "./ReviewsCarousel";
import { client } from "@/sanity/lib/client";
import { reviewsQuery } from "@/sanity/queries";
import type { Review } from "@/sanity/types";

const values = [
  { icon: Smile, label: "Good Vibes" },
  { icon: Lightbulb, label: "Créative" },
  { icon: Gift, label: "Généreuse" },
  { icon: ShieldCheck, label: "Fiable" },
];

const clientLogos = [
  { src: "/images/a-propos/clients/tiktok.svg", alt: "TikTok" },
  { src: "/images/a-propos/clients/linkedin.svg", alt: "LinkedIn" },
  { src: "/images/a-propos/clients/snapchat.svg", alt: "Snapchat" },
  { src: "/images/a-propos/clients/indeed.svg", alt: "Indeed" },
  { src: "/images/a-propos/clients/decathlon.svg", alt: "Decathlon" },
  { src: "/images/a-propos/clients/pinterest.svg", alt: "Pinterest" },
];

const instagramImages = [
  "/images/a-propos/instagram/1.jpg",
  "/images/a-propos/instagram/2.jpg",
  "/images/a-propos/instagram/3.jpg",
  "/images/a-propos/instagram/4.jpg",
  "/images/a-propos/instagram/5.jpg",
  "/images/a-propos/instagram/6.jpg",
  "/images/a-propos/instagram/7.jpg",
  "/images/a-propos/instagram/8.jpg",
];

export default async function AboutPage() {
  const reviews: Review[] = await client.fetch(reviewsQuery);

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.portraitWrap}>
          <Image
            src="/images/a-propos/photo-jess.jpg"
            alt="Portrait de Jessica"
            width={420}
            height={560}
            className={styles.portrait}
            priority
          />
        </div>

        <div className={styles.heroText}>
          <h1 className={styles.title}>Salut, moi c&apos;est Jessica&nbsp;!</h1>

          <div className={styles.copy}>
            <p>
              Ma passion pour l&apos;image a commencé à l&apos;âge de 10 ans, le jour où
              mon père m&apos;a offert mon tout premier appareil photo. Depuis, les
              modèles ont changé, les clics se sont enchaînés, mais une chose
              est restée intacte : ma passion.
            </p>
            <p>
              Ce qui me fait vibrer en tant que photographe, c&apos;est capturer de
              vraies émotions, de la sincérité, et de l&apos;humain.
            </p>
            <p>
              Toujours de bonne humeur et à l&apos;écoute, je m&apos;adapte à toutes les
              situations. Que vous ayez une idée précise ou non, pas de stress :
              on construit le projet ensemble, à votre rythme et selon vos
              envies.
            </p>
            <p>
              Je suis basée en Île-de-France, et je bouge facilement partout où
              l&apos;histoire vaut la peine d&apos;être racontée ! Un projet, une envie,
              ou juste une idée floue, je suis là pour en parler !
            </p>
          </div>

          <div className={styles.valuesBlock}>
            <p className={styles.valuesTitle}>Ce qui me définit le mieux :</p>
            <div className={styles.values}>
              {values.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.valueItem}>
                  <Icon size={30} strokeWidth={0.8} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="/contact" className={styles.contactButton}>
            CONTACT
          </a>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className={styles.clientsSection}>
        <h2 className={styles.sectionTitle}>Quelques clients</h2>

        <div className={styles.logoMarquee}>
          <div className={styles.logoTrack}>
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className={styles.logoItem}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={48}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Et leurs avis qui comptent</h2>
        <ReviewsCarousel reviews={reviews} />
      </section>


    {/* ── INSTAGRAM ── */}
      {/*
      <section className={styles.instagramSection}>
        <a
          href="https://www.instagram.com/rozatelli_images/"
          target="_blank"
          rel="noreferrer"
          className={styles.instagramOverlay}
          aria-label="View Jessica's Instagram profile"
        >
          <Instagram size={34} strokeWidth={1.8} />
          <span className={styles.instagramHandle}>@rozatelli_images</span>
          <ArrowRight size={22} strokeWidth={1.8} />
        </a>

        <div className={styles.instagramGrid}>
          {instagramImages.map((src, index) => (
            <div key={src} className={styles.instagramItem}>
              <Image
                src={src}
                alt={`Instagram post ${index + 1}`}
                width={400}
                height={400}
                className={styles.instagramImage}
              />
            </div>
          ))}
        </div>
      </section>
      */}
    </main>
  );
}