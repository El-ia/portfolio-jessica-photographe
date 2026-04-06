import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Avis",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "text",
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      description: "Plus petit = plus tôt dans la liste",
    }),
  ],

  preview: {
    select: {
      title: "author",
      subtitle: "text",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Avis",
        subtitle: subtitle ? String(subtitle).slice(0, 80) : "",
        media,
      };
    },
  },
});