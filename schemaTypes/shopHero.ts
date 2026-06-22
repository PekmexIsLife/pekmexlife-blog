import { defineField, defineType } from "sanity";

export const shopHeroSchema = defineType({
  name:  "shopHero",
  title: "Hero — Tienda (singleton)",
  type:  "document",
  fields: [
    defineField({
      name:       "headline",
      title:      "Titular principal",
      type:       "string",
      validation: R => R.required(),
      initialValue: "Lo que comes te define. Para ellos, también.",
    }),
    defineField({
      name:  "subhead",
      title: "Subtítulo",
      type:  "text",
      rows:  2,
      initialValue: "Productos naturales seleccionados con criterio veterinario — para darle a tu mascota más años, más energía y más calidad de vida.",
    }),
    defineField({
      name:    "image",
      title:   "Imagen hero (opcional)",
      type:    "image",
      options: { hotspot: true },
      fields:  [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name:         "cta_text",
      title:        "Texto del botón CTA",
      type:         "string",
      initialValue: "Explorar productos",
      validation:   R => R.required(),
    }),
  ],
  preview: {
    select: { title: "headline" },
  },
  __experimental_actions: ["update", "publish"],
});
