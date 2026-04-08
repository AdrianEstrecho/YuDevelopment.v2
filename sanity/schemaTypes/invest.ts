import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "invest",
  title: "Invest",
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
      name: "advantages",
      title: "Advantages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "advantage",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "strategies",
      title: "Strategies",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "strategy",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "target", title: "Target", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "risk",
              title: "Risk",
              type: "string",
              options: {
                list: [
                  { title: "Lower Risk", value: "Lower Risk" },
                  { title: "Moderate Risk", value: "Moderate Risk" },
                  { title: "Higher Risk", value: "Higher Risk" },
                ],
              },
            }),
          ],
          preview: { select: { title: "name", subtitle: "risk" } },
        }),
      ],
    }),
    defineField({
      name: "machineSteps",
      title: "Machine Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "n", title: "Number", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "label", subtitle: "n" } },
        }),
      ],
    }),
  ],
});
