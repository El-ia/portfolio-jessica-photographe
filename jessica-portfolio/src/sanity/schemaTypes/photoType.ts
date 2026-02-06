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
      title: "Texte alternatif (alt)",
      description: "Description de l’image pour l’accessibilité et le SEO",
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
      title: "Ordre dans le slideshow",
      description: "Plus petit = plus tôt dans le slideshow",
      type: "number",
      hidden: ({ document }) => !document?.showInSlideshow,
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
      title: "Ordre global (optionnel)",
      description: "Utilisé pour trier la galerie si nécessaire",
      type: "number",
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
    prepare({ title, category, media, showOnHome, showInSlideshow }) {
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