import { defineType, defineField, defineArrayMember } from "sanity";

const heroField = defineField({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "titleLine1", title: "Title Line 1", type: "string" }),
    defineField({ name: "titleLine2", title: "Title Line 2", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    heroField,
    defineField({
      name: "model",
      title: "Model",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "sublabel", title: "Sublabel", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "event", title: "Event", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "year", subtitle: "event" } },
        }),
      ],
    }),
  ],
});
