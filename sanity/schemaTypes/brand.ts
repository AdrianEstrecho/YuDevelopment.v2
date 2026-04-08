import { defineType, defineField } from "sanity";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "namePart1", title: "Name Part 1", type: "string" }),
    defineField({ name: "namePart2", title: "Name Part 2", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "copyright", title: "Copyright", type: "string" }),
  ],
  preview: {
    select: { title: "namePart1", subtitle: "namePart2" },
  },
});
