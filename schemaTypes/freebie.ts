import { defineField, defineType } from "sanity";

export const freebieSchema = defineType({
  name:  "freebie",
  title: "Recurso Gratuito",
  type:  "document",
  fields: [
    defineField({
      name:       "title",
      title:      "Título",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "persona",
      title: "Personaje",
      type:  "string",
      options: {
        list: [
          { value: "cheto",          title: "Cheto"          },
          { value: "mila",           title: "Mila"           },
          { value: "tabo",           title: "Tabo"           },
          { value: "toda-la-manada", title: "Toda la Manada" },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name:  "description",
      title: "Descripción corta (resultado para el lector)",
      type:  "string",
    }),
    defineField({
      name:    "cover_image",
      title:   "Portada",
      type:    "image",
      options: { hotspot: true },
    }),
    defineField({
      name:       "download_url",
      title:      "URL de descarga (PDF)",
      type:       "url",
      validation: R => R.required(),
    }),
    defineField({
      name:         "is_new",
      title:        "¿Es nuevo?",
      type:         "boolean",
      initialValue: false,
    }),
    defineField({
      name:         "is_featured",
      title:        "¿Es el destacado?",
      type:         "boolean",
      initialValue: false,
    }),
    defineField({
      name:  "published_date",
      title: "Fecha de publicación",
      type:  "date",
    }),
    defineField({
      name:  "orden",
      title: "Orden de aparición",
      type:  "number",
    }),
  ],
  preview: {
    select: {
      title:    "title",
      subtitle: "persona",
      media:    "cover_image",
    },
  },
});
