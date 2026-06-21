import { MetadataRoute } from "next";

const BASE_URL = "https://jessicarozyckaphoto.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/evenementiel",
    "/plateau",
    "/social",
    "/a-propos",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}