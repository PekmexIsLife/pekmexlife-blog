import { defineField, defineType } from "sanity";

export const shopFaqSchema = defineType({
  name:  "shopFaq",
  title: "Preguntas Frecuentes — Tienda",
  type:  "document",
  fields: [
    defineField({
      name:       "question",
      title:      "Pregunta",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:       "answer",
      title:      "Respuesta",
      type:       "text",
      rows:       4,
      validation: R => R.required(),
    }),
    defineField({
      name:  "shipping_time",
      title: "Tiempo de envío (reemplaza el placeholder en la respuesta)",
      description: "Ej: 3 a 5 días hábiles para CDMX · 5 a 8 días para el resto del país.",
      type:  "string",
    }),
    defineField({
      name:  "return_policy",
      title: "Política de devolución",
      description: "Pendiente de definir. Cuando esté lista, reemplaza el texto 'Próximamente'.",
      type:  "text",
      rows:  3,
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
    select: { title: "question" },
  },
});
