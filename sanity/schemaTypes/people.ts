import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "people",
  title: "People",
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
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "member",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
            defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "title", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "culture",
      title: "Culture Section",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
  ],
});
