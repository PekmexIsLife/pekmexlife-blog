import { defineField, defineType } from "sanity";

export const recomendacionSchema = defineType({
  name:  "recomendacion",
  title: "Recomendación / Promo",
  type:  "document",
  fields: [
    defineField({
      name:       "nombre",
      title:      "Nombre del producto o promoción",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:       "marca",
      title:      "Marca",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:       "descripcion",
      title:      "Descripción corta",
      type:       "text",
      rows:       2,
      validation: R => R.required().max(180),
    }),
    defineField({
      name:    "imagen",
      title:   "Imagen del producto",
      type:    "image",
      options: { hotspot: true },
      fields:  [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name:       "enlaceAfiliado",
      title:      "Enlace de afiliado",
      type:       "url",
      validation: R => R.required(),
    }),
    defineField({
      name:  "codigoDescuento",
      title: "Código de descuento (opcional)",
      type:  "string",
    }),
    defineField({
      name:    "tipo",
      title:   "Tipo",
      type:    "string",
      options: {
        list: [
          { title: "Código / Promo",        value: "promo"    },
          { title: "Producto recomendado",  value: "producto" },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),
    defineField({
      name:    "personaje",
      title:   "Personaje (solo para productos)",
      type:    "string",
      options: {
        list: [
          { title: "Cheto — Salud & Cuidado",    value: "cheto" },
          { title: "Mila — Vínculo & Emoción",   value: "mila"  },
          { title: "Tabo — Aventura & Viajes",   value: "tabo"  },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name:         "activo",
      title:        "¿Activo?",
      type:         "boolean",
      initialValue: true,
    }),
    defineField({
      name:  "orden",
      title: "Orden (menor = primero)",
      type:  "number",
    }),
  ],
  preview: {
    select: {
      title:    "nombre",
      subtitle: "marca",
      media:    "imagen",
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
