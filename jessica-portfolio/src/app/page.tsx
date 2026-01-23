import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Accueil</h1>
      <ul>
        <li><Link href="/evenementiel">Événementiel</Link></li>
        <li><Link href="/plateau">Plateau</Link></li>
        <li><Link href="/social">Social</Link></li>
        <li><Link href="/a-propos">À propos</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </main>
  );
}