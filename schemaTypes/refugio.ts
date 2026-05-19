import { defineField, defineType } from "sanity";

export const refugioSchema = defineType({
  name:  "refugio",
  title: "Refugio Aliado",
  type:  "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre del refugio", type: "string", validation: R => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "nombre" }, validation: R => R.required() }),
    defineField({ name: "ubicacion", title: "Ciudad, Estado", type: "string", validation: R => R.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: false } }),
    defineField({ name: "fotoPrincipal", title: "Foto principal", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({ name: "historia", title: "Historia corta", type: "text", rows: 3, validation: R => R.required().max(300) }),
    defineField({ name: "descripcion", title: "Descripción completa", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "sitioWeb", title: "Sitio web", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "string" }),
    defineField({ name: "contacto",  title: "Email de contacto",    type: "string" }),
    defineField({ name: "telefono1", title: "Teléfono principal",    type: "string" }),
    defineField({ name: "telefono2", title: "Teléfono secundario",   type: "string" }),
    defineField({ name: "datos_donacion", title: "Datos para donación directa", type: "text", rows: 6,
      description: "Banco, CLABE, tarjeta, PayPal u otros métodos de donación directa al refugio." }),
    defineField({ name: "acepta_via_pekmex", title: "¿Acepta donaciones vía Pekmex?", type: "boolean", initialValue: false }),
    defineField({ name: "verificado", title: "¿Verificado y activo?", type: "boolean", initialValue: false }),
    defineField({ name: "fechaIngreso", title: "Fecha de ingreso", type: "date" }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "ubicacion", media: "logo" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
