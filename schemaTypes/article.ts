// schemas/article.ts
// Instalar en tu proyecto Sanity Studio:
// Copiar este archivo a /schemas/article.ts
// Agregar al array de schemas en sanity.config.ts

import { defineField, defineType } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "Artículo",
  type: "document",
  groups: [
    { name: "content",  title: "Contenido",  default: true },
    { name: "seo",      title: "SEO & Meta" },
    { name: "settings", title: "Configuración" },
  ],
  fields: [

    // ── CONTENIDO PRINCIPAL ────────────────────────────────
    defineField({
      name: "title",
      title: "Título del artículo",
      type: "string",
      group: "content",
      validation: (R) => R.required().max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Resumen corto",
      description: "Aparece en el grid del blog y en redes sociales. Máx. 160 caracteres.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (R) => R.required().max(160),
    }),

    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      description: "Mínimo 1200×630px. Formato JPG o PNG.",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (SEO)",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),

    defineField({
      name: "body",
      title: "Contenido del artículo",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal",     value: "normal" },
            { title: "H2",         value: "h2" },
            { title: "H3",         value: "h3" },
            { title: "H4",         value: "h4" },
            { title: "Cita",       value: "blockquote" },
            { title: "Referencia", value: "reference" },
          ],
          marks: {
            decorators: [
              { title: "Negrita",  value: "strong" },
              { title: "Cursiva",  value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Enlace",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (R) =>
                      R.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Abrir en nueva pestaña",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        // Imagen dentro del artículo
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
            },
            {
              name: "caption",
              type: "string",
              title: "Pie de foto (opcional)",
            },
          ],
        },
        // FAQ Block — preguntas frecuentes + JSON-LD
        {
          name:  "faqBlock",
          title: "Bloque FAQ",
          type:  "object",
          icon:  () => "❓",
          fields: [
            {
              name:        "title",
              type:        "string",
              title:       "Título del bloque",
              description: "Default: 'Algo que Lucy siempre responde'",
            },
            {
              name:  "faqs",
              title: "Preguntas y respuestas",
              type:  "array",
              of: [
                {
                  type:   "object",
                  fields: [
                    {
                      name:       "question",
                      type:       "string",
                      title:      "Pregunta",
                      validation: (R: any) => R.required(),
                    },
                    {
                      name:       "answer",
                      type:       "text",
                      title:      "Respuesta",
                      validation: (R: any) => R.required(),
                    },
                  ],
                  preview: {
                    select: { title: "question" },
                  },
                },
              ],
            },
          ],
        },
        // PullQuote — cita destacada
        {
          name: "pullQuote",
          title: "Cita destacada",
          type: "object",
          icon: () => "💬",
          fields: [
            { name: "quote",  type: "text",   title: "Cita" },
            { name: "author", type: "string", title: "Autor (opcional)" },
          ],
        },
        // StatNumber — estadística
        {
          name: "statNumber",
          title: "Estadística",
          type: "object",
          icon: () => "📊",
          fields: [
            { name: "number", type: "string", title: "Número o cifra" },
            { name: "label",  type: "text",   title: "Descripción" },
          ],
        },
        // SectionDivider — separador visual sin campos configurables
        {
          name: "sectionDivider",
          title: "Separador de sección",
          type: "object",
          icon: () => "➖",
          fields: [
            {
              name:         "_style",
              title:        "Estilo",
              type:         "string",
              initialValue: "default",
              hidden:       true,
            },
          ],
        },
        // Caja de CTA integrada
        {
          name: "ctaBox",
          title: "Caja CTA",
          type: "object",
          icon: () => "📣",
          fields: [
            { name: "titulo",    type: "string", title: "Título" },
            { name: "texto",     type: "text",   title: "Descripción" },
            { name: "btnTexto",  type: "string", title: "Texto del botón" },
            { name: "btnUrl",    type: "url",    title: "URL del botón" },
            {
              name: "tipo",
              type: "string",
              title: "Tipo",
              options: {
                list: [
                  { title: "Cheto (dorado)",  value: "cheto" },
                  { title: "Mila (rosa)",     value: "mila" },
                  { title: "Tabo (verde)",    value: "tabo" },
                  { title: "Newsletter",      value: "newsletter" },
                ],
                layout: "radio",
              },
            },
          ],
        },
      ],
    }),

    // ── CONFIGURACIÓN ──────────────────────────────────────
    defineField({
      name: "personaje",
      title: "Personaje",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Cheto — Cuidado & Bienestar", value: "cheto" },
          { title: "Mila — Duelo & Acompañamiento", value: "mila" },
          { title: "Tabo — Viajes & Aventura", value: "tabo" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Ciencia Suave",  value: "ciencia-suave" },
          { title: "Vida diaria",    value: "vida-diaria" },
          { title: "Viajes",         value: "viajes" },
          { title: "Duelo",          value: "duelo" },
          { title: "Familia",        value: "familia" },
          { title: "Nutrición",      value: "nutricion" },
          { title: "Prevención",     value: "prevencion" },
          { title: "Senior",         value: "senior" },
        ],
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "tiempoDeLectura",
      title: "Tiempo de lectura (minutos)",
      type: "number",
      group: "settings",
      validation: (R) => R.required().min(1).max(30),
    }),

    defineField({
      name: "esPillar",
      title: "¿Es artículo pillar?",
      description: "Los artículos pillar son los de mayor profundidad SEO.",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),

    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
    }),

    // Ebook relacionado (CTA de conversión al final del artículo)
    defineField({
      name: "ebookRelacionado",
      title: "Ebook relacionado (CTA de conversión)",
      type: "object",
      group: "settings",
      fields: [
        { name: "titulo",     type: "string", title: "Nombre del ebook" },
        { name: "descripcion",type: "text",   title: "Descripción corta" },
        { name: "precio",     type: "string", title: "Precio (ej: $4.99 USD)" },
        { name: "stripeUrl",  type: "url",    title: "Payment Link de Stripe" },
        { name: "portada",    type: "image",  title: "Portada del ebook" },
      ],
    }),

    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      description: "Si está vacío, usa el título del artículo. Máx. 60 caracteres.",
      type: "string",
      group: "seo",
      validation: (R) => R.max(60),
    }),

    defineField({
      name: "seoDescription",
      title: "Meta descripción",
      description: "Máx. 160 caracteres. Aparece en Google.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (R) => R.max(160),
    }),

    defineField({
      name: "keywords",
      title: "Palabras clave",
      description: "Separadas por coma. Ej: duelo mascotas, pérdida perro, apoyo emocional",
      type: "string",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title:    "title",
      personaje:"personaje",
      esPillar: "esPillar",
      media:    "coverImage",
    },
    prepare({ title, personaje, esPillar, media }) {
      const emoji =
        personaje === "cheto" ? "🐕" :
        personaje === "mila"  ? "🐶" :
        personaje === "tabo"  ? "🐕‍🦺" : "📄";
      return {
        title:    `${esPillar ? "⭐ " : ""}${title}`,
        subtitle: `${emoji} ${personaje?.charAt(0).toUpperCase()}${personaje?.slice(1) ?? ""}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Fecha (más reciente)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Personaje",
      name: "personajeAsc",
      by: [{ field: "personaje", direction: "asc" }],
    },
  ],
});
