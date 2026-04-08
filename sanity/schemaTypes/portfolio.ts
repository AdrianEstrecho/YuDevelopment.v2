import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string" }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "project",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "type", title: "Type", type: "string" }),
            defineField({ name: "scope", title: "Scope", type: "string" }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Coming Soon", value: "Coming Soon" },
                  { title: "Under Construction", value: "Under Construction" },
                  { title: "Completed", value: "Completed" },
                ],
              },
            }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "location", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "pipeline",
      title: "Pipeline Section",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),
  ],
});
