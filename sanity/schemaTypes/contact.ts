import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titleLine1", title: "Title Line 1", type: "string" }),
        defineField({ name: "titleLine2", title: "Title Line 2", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "info",
      title: "Info Sidebar",
      type: "object",
      fields: [
        defineField({ name: "generalEmail", title: "General Email", type: "string" }),
        defineField({ name: "servicesText", title: "Services Text", type: "text", rows: 3 }),
        defineField({ name: "investmentText", title: "Investment Text", type: "text", rows: 3 }),
      ],
    }),
  ],
});
