import { type SchemaTypeDefinition } from "sanity";
import { photoType } from "./photoType";
import { reviewType } from "./reviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photoType, reviewType],
};