export type MosaicSize = "large" | "vertical" | "small";
export type PhotoCategory = "evenementiel" | "plateau" | "social";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type?: "reference";
  };
  crop?: unknown;
  hotspot?: unknown;
};

export type Photo = {
  _id: string;

  title?: string;
  alt: string;
  category?: PhotoCategory;
  showOnHome?: boolean;
  showInSlideshow?: boolean;

  slideshowOrder?: number;
  order?: number;

  mosaicSize: MosaicSize;
  image: SanityImage;
};