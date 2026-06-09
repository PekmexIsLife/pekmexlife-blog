import { defineField, defineType } from "sanity";

export const historiaAdopcionSchema = defineType({
  name:  "historiaAdopcion",
  title: "Historia de Adopción",
  type:  "document",
  fields: [
    defineField({ name: "nombrePerro", title: "Nombre del perro", type: "string", validation: R => R.required() }),
    defineField({ name: "foto", title: "Foto del perro", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "mes", title: "Mes de la historia", type: "string", description: 'Ej: "Enero 2025"', validation: R => R.required() }),
    defineField({ name: "resumen", title: "Resumen", type: "text", rows: 2, validation: R => R.required().max(200) }),
    defineField({ name: "historia", title: "Historia completa", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "refugio", title: "Refugio aliado", type: "reference", to: [{ type: "refugio" }] }),
    defineField({ name: "publicado", title: "¿Publicar este mes?", type: "boolean", initialValue: false }),
    defineField({ name: "fechaAdopcion", title: "Fecha de adopción", type: "date" }),
  ],
  preview: {
    select: { title: "nombrePerro", subtitle: "mes", media: "foto" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
