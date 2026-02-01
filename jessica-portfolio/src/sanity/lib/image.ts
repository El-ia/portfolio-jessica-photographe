import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}