import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name:  "productCard",
  title: "Producto — Tienda",
  type:  "document",
  fields: [
    // ── IDENTIDAD ─────────────────────────────────────────────
    defineField({
      name:       "name",
      title:      "Nombre del producto",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "slug",
      title: "Slug (URL)",
      type:  "slug",
      description: "Se genera desde el nombre. Ej: omega-3-nordic-naturals → /shop/omega-3-nordic-naturals",
      options: {
        source:    "name",
        maxLength: 96,
        slugify:   (input: string) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
      },
      validation: R => R.required(),
    }),
    defineField({
      name:       "brand",
      title:      "Marca",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:    "persona",
      title:   "Personaje que recomienda",
      type:    "string",
      options: {
        list: [
          { title: "Cheto — Salud & Nutrición",      value: "cheto"      },
          { title: "Mila — Calma & Bienestar",       value: "mila"       },
          { title: "Tabo — Aventura & Viaje",        value: "tabo"       },
          { title: "Lucy y Marco — Premios & Juego", value: "lucy-marco" },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),
    defineField({
      name:    "category",
      title:   "Categoría",
      type:    "string",
      options: {
        list: [
          { title: "Salud general",     value: "salud"     },
          { title: "Nutrición",         value: "nutricion" },
          { title: "Salud dental",      value: "dental"    },
          { title: "Calma & bienestar", value: "calma"     },
          { title: "Aventura & viaje",  value: "aventura"  },
          { title: "Premios & juego",   value: "premio"    },
        ],
      },
      validation: R => R.required(),
    }),

    // ── CARD (grid de /shop) ───────────────────────────────────
    defineField({
      name:    "cardImage",
      title:   "Imagen del producto",
      type:    "image",
      options: { hotspot: true },
      fields:  [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name:       "cardBenefit",
      title:      "Beneficio principal (card)",
      description:"Una línea que describe el beneficio clave — aparece debajo del nombre en la card.",
      type:       "string",
      validation: R => R.max(120),
    }),
    defineField({
      name:  "priceMxn",
      title: "Precio MXN",
      type:  "number",
    }),
    defineField({
      name:         "isNew",
      title:        "¿Es novedad?",
      type:         "boolean",
      initialValue: false,
      description:  "Aparece en la sección Novedades. Desactivar cuando deje de ser nuevo.",
    }),
    defineField({
      name:         "inStock",
      title:        "¿En stock?",
      type:         "boolean",
      initialValue: true,
      description:  "Desactivar para mostrar como agotado sin borrar el producto.",
    }),
    defineField({
      name:  "lucyMarcoNote",
      title: "Micro-reseña Lucy/Marco (opcional)",
      description: "Solo para productos de Lucy y Marco. Voz en primera persona plural.",
      type:  "string",
    }),

    // ── PET MARKT ─────────────────────────────────────────────
    defineField({
      name:  "sku",
      title: "SKU — Pet Markt",
      description: "Código para conectar con el inventario de Pet Markt.",
      type:  "string",
    }),
    defineField({
      name:  "quantity",
      title: "Stock Pet Markt",
      description: "Unidades disponibles. Se actualiza desde Pet Markt.",
      type:  "number",
    }),
  ],

  preview: {
    select: {
      title:    "name",
      subtitle: "brand",
      media:    "cardImage",
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
  orderings: [
    {
      title: "Personaje · Nombre",
      name:  "personaNombre",
      by: [
        { field: "persona", direction: "asc" },
        { field: "name",    direction: "asc" },
      ],
    },
  ],
});
