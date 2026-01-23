"use client";

import Link from "next/link";

const INSTAGRAM_URL = "https://instagram.com"; // on mettra le vrai lien plus tard

async function shareOrCopy(url: string) {
  if (navigator.share) {
    await navigator.share({ title: document.title, url });
    return;
  }
  await navigator.clipboard.writeText(url);
  alert("Lien copié !");
}

export function Header() {
  return (
    <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 600 }}>
          Jessica Rozycka
        </Link>

        <Link href="/evenementiel">Événementiel</Link>
        <Link href="/plateau">Plateau</Link>
        <Link href="/social">Social</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/contact">Contact</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>

          <button type="button" onClick={() => shareOrCopy(window.location.href)}>
            Partager
          </button>
        </div>
      </nav>
    </header>
  );
}