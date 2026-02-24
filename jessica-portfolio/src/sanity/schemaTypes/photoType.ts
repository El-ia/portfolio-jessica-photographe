import { defineField, defineType } from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre (optionnel)", type: "string" }),

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
      title: "Image (source)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Recadrages par page (on cache ce qui ne sert pas)
    defineField({
      name: "crops",
      title: "Recadrages par page (optionnel)",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "home",
          title: "Home",
          type: "image",
          options: { hotspot: true },
          hidden: ({ document }) => !document?.showOnHome,
        }),
        defineField({
          name: "plateau",
          title: "Plateau",
          type: "image",
          options: { hotspot: true },
          hidden: ({ document }) => document?.category !== "plateau",
        }),
        defineField({
          name: "social",
          title: "Social",
          type: "image",
          options: { hotspot: true },
          hidden: ({ document }) => document?.category !== "social",
        }),
        defineField({
          name: "evenementiel",
          title: "Événementiel",
          type: "image",
          options: { hotspot: true },
          hidden: ({ document }) => document?.category !== "evenementiel",
        }),
      ],
    }),

    // ✅ NOUVEAU : ordre par page (clair + efficace)
    defineField({
      name: "orderByPage",
      title: "Ordre d’affichage par page (optionnel)",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "home",
          title: "Ordre Home",
          type: "number",
          description: "Plus petit = plus tôt sur la Home",
          hidden: ({ document }) => !document?.showOnHome,
        }),
        defineField({
          name: "plateau",
          title: "Ordre Plateau",
          type: "number",
          description: "Plus petit = plus tôt sur Plateau",
          hidden: ({ document }) => document?.category !== "plateau",
        }),
        defineField({
          name: "social",
          title: "Ordre Social",
          type: "number",
          description: "Plus petit = plus tôt sur Social",
          hidden: ({ document }) => document?.category !== "social",
        }),
        defineField({
          name: "evenementiel",
          title: "Ordre Événementiel",
          type: "number",
          description: "Plus petit = plus tôt sur Événementiel",
          hidden: ({ document }) => document?.category !== "evenementiel",
        }),
      ],
    }),

    // (optionnel) fallback si aucun ordre par page n’est rempli
    defineField({
      name: "orderFallback",
      title: "Ordre (fallback)",
      description: "Utilisé si aucun ordre spécifique n’est défini",
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
      const flags = [showOnHome ? "Home" : null, showInSlideshow ? "Slideshow" : null]
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