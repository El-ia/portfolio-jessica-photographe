import { type SchemaTypeDefinition } from "sanity";
import { photoType } from "./photoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photoType],
};