import { defineField, defineType } from "sanity";

export const productLandingSchema = defineType({
  name:  "productLanding",
  title: "Landing de Producto",
  type:  "document",
  fields: [
    // ── REFERENCIA AL PRODUCTO ────────────────────────────────
    defineField({
      name:       "product",
      title:      "Producto",
      type:       "reference",
      to:         [{ type: "productCard" }],
      validation: R => R.required(),
    }),

    // ── STRIPE ────────────────────────────────────────────────
    defineField({
      name:  "stripeUrl",
      title: "URL de pago Stripe",
      type:  "url",
      validation: R => R.required(),
    }),
    defineField({
      name:  "stripeId",
      title: "Stripe Price ID",
      description: "ID del precio en Stripe (price_xxx).",
      type:  "string",
    }),

    // ── SECCIÓN 1 — HERO ─────────────────────────────────────
    defineField({
      name:  "heroPersonaLabel",
      title: "Label del personaje",
      description: "Ej: 'Cheto recomienda'",
      type:  "string",
    }),
    defineField({
      name:  "heroProblem",
      title: "Pregunta del problema",
      description: "Ej: '¿Tu perro tiene articulaciones rígidas?'",
      type:  "string",
    }),
    defineField({
      name:  "heroSubhead",
      title: "Subtítulo del hero",
      type:  "text",
      rows:  3,
    }),
    defineField({
      name:    "heroImage",
      title:   "Imagen hero",
      type:    "image",
      options: { hotspot: true },
      fields:  [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name:  "heroCtaPrimary",
      title: "CTA principal",
      description: "Ej: 'Quiero el Omega 3'",
      type:  "string",
    }),
    defineField({
      name:  "heroCtaSecondary",
      title: "CTA secundario (guía gratuita)",
      type:  "string",
    }),
    defineField({
      name:  "heroCtaSecondaryUrl",
      title: "URL del CTA secundario",
      type:  "url",
    }),

    // ── SECCIÓN 2 — BLOQUE DE CONFIANZA ──────────────────────
    defineField({
      name:  "trustTitle",
      title: "Título del bloque de confianza",
      type:  "string",
    }),
    defineField({
      name:  "trustPoints",
      title: "Puntos de confianza",
      type:  "array",
      of:    [{ type: "string" }],
    }),

    // ── SECCIÓN 3 — HISTORIA DEL PERSONAJE ───────────────────
    defineField({
      name:  "personaStoryTitle",
      title: "Título de la historia",
      type:  "string",
    }),
    defineField({
      name:  "personaStoryBody",
      title: "Historia del personaje",
      type:  "text",
      rows:  6,
    }),
    defineField({
      name:    "personaImage",
      title:   "Imagen del personaje",
      type:    "image",
      options: { hotspot: true },
      fields:  [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),

    // ── SECCIÓN 4 — BENEFICIOS VISUALES ──────────────────────
    defineField({
      name:  "benefits",
      title: "Beneficios (máx 4)",
      type:  "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon",  title: "Emoji o ícono", type: "string" }),
          defineField({ name: "label", title: "Beneficio",     type: "string" }),
        ],
        preview: {
          select: { title: "label", subtitle: "icon" },
          prepare({ title, subtitle }) {
            return { title: `${subtitle} ${title}` };
          },
        },
      }],
      validation: R => R.max(4),
    }),

    // ── SECCIÓN 5 — EVIDENCIA CIENTÍFICA ─────────────────────
    defineField({
      name:  "evidenceTitle",
      title: "Título de evidencia",
      type:  "string",
    }),
    defineField({
      name:  "evidencePoints",
      title: "Puntos de evidencia",
      type:  "array",
      of:    [{ type: "string" }],
    }),
    defineField({
      name:  "evidenceSource",
      title: "Fuente",
      description: "Ej: WSAVA · AAHA · Journal of Veterinary Internal Medicine",
      type:  "string",
    }),

    // ── SECCIÓN 6 — ¿ES PARA MI MASCOTA? ─────────────────────
    defineField({
      name:  "idealFor",
      title: "Perfecto para",
      type:  "array",
      of:    [{ type: "string" }],
    }),
    defineField({
      name:  "notFor",
      title: "No recomendado si",
      type:  "array",
      of:    [{ type: "string" }],
    }),

    // ── SECCIÓN 7 — BUNDLE ────────────────────────────────────
    defineField({
      name:  "bundleTitle",
      title: "Título del bundle",
      type:  "string",
    }),
    defineField({
      name:  "bundleItems",
      title: "Items del bundle",
      type:  "array",
      of:    [{ type: "string" }],
    }),
    defineField({
      name:  "bundlePrice",
      title: "Precio del bundle MXN",
      type:  "number",
    }),
    defineField({
      name:  "bundleStripeUrl",
      title: "URL de pago Stripe — bundle",
      type:  "url",
    }),
    defineField({
      name:  "bundleStripeId",
      title: "Stripe Price ID — bundle",
      type:  "string",
    }),

    // ── SECCIÓN 8 — CONTENIDO RELACIONADO ────────────────────
    defineField({
      name:  "relatedPosts",
      title: "Artículos relacionados",
      type:  "array",
      of:    [{ type: "reference", to: [{ type: "article" }] }],
    }),

    // ── SECCIÓN 9 — FAQs ──────────────────────────────────────
    defineField({
      name:  "faqs",
      title: "Preguntas frecuentes (máx 10)",
      type:  "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Pregunta",   type: "string" }),
          defineField({ name: "answer",   title: "Respuesta",  type: "text", rows: 3 }),
        ],
        preview: {
          select: { title: "question" },
        },
      }],
      validation: R => R.max(10),
    }),

    // ── SECCIÓN 10 — CTA EMOCIONAL FINAL ─────────────────────
    defineField({
      name:  "finalCtaQuote",
      title: "Frase final del personaje",
      type:  "text",
      rows:  2,
    }),
    defineField({
      name:  "finalCtaButton",
      title: "Texto del botón final",
      description: "Ej: 'Dale a tu perro lo que merece'",
      type:  "string",
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name:       "seoTitle",
      title:      "SEO Title",
      type:       "string",
      validation: R => R.max(60),
    }),
    defineField({
      name:       "seoDescription",
      title:      "SEO Description",
      type:       "text",
      rows:       2,
      validation: R => R.max(160),
    }),
  ],

  preview: {
    select: {
      title:    "product.name",
      subtitle: "product.brand",
      media:    "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return { title: title ?? "Sin producto", subtitle, media };
    },
  },
});
