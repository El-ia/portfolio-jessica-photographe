import styles from "./GalleryGrid.module.css";

type GridSize = "large" | "vertical" | "small";

type GalleryItem = {
  id: string;
  label: string;
  size: GridSize;
};

const ITEMS: GalleryItem[] = [
  // Row 1
  { id: "1", label: "Large image", size: "large" },
  { id: "2", label: "Vertical image", size: "vertical" },

  // Row 2
  { id: "3", label: "Vertical image", size: "vertical" },
  { id: "4", label: "Large image", size: "large" },

  // Row 3
  { id: "5", label: "Small image", size: "small" },
  { id: "6", label: "Small image", size: "small" },
  { id: "7", label: "Small image", size: "small" },
];

export function GalleryGrid() {
  return (
    <section className={styles.grid} aria-label="Photo gallery layout">
      {ITEMS.map((item) => (
        <div key={item.id} className={`${styles.item} ${styles[item.size]}`}>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </section>
  );
}