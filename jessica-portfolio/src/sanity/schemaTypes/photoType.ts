import { defineField, defineType } from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre (optionnel)",
      type: "string",
    }),

    defineField({
      name: "alt",
      title: "Texte alternatif (alt) — obligatoire",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Événementiel", value: "evenementiel" },
          { title: "Plateau", value: "plateau" },
          { title: "Social", value: "social" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Where to display
    defineField({
      name: "showOnHome",
      title: "Afficher sur l’accueil",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "showInSlideshow",
      title: "Afficher dans le slideshow",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "slideshowOrder",
      title: "Ordre dans le slideshow (optionnel)",
      type: "number",
      description: "Plus petit = plus tôt dans le slideshow",
      hidden: ({ document }) => !document?.showInSlideshow,
    }),

    defineField({
      name: "mosaicSize",
      title: "Taille dans la mosaïque",
      type: "string",
      options: {
        list: [
          { title: "Large (2 colonnes)", value: "large" },
          { title: "Verticale", value: "vertical" },
          { title: "Small", value: "small" },
        ],
        layout: "radio",
      },
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
      title: "Ordre (optionnel)",
      type: "number",
      description: "Plus petit = plus tôt dans la galerie",
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      media: "image",
      showOnHome: "showOnHome",
      showInSlideshow: "showInSlideshow",
    },
    prepare(selection) {
      const { title, category, media, showOnHome, showInSlideshow } = selection;

      const flags = [
        showOnHome ? "Home" : null,
        showInSlideshow ? "Slideshow" : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        title: title || "Photo",
        subtitle: `${category ? `Catégorie: ${category}` : ""}${flags ? ` — ${flags}` : ""}`,
        media,
      };
    },
  },
});

