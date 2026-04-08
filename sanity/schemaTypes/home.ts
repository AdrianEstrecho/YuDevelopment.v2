import { defineType, defineField, defineArrayMember } from "sanity";

const armFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  defineField({
    name: "items",
    title: "Items",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
];

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "arms", title: "Two Arms" },
    { name: "capabilities", title: "Capabilities" },
    { name: "featured", title: "Featured Projects" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titleLine1", title: "Title Line 1", type: "string" }),
        defineField({ name: "titleLine2", title: "Title Line 2", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA Label", type: "string" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA Label", type: "string" }),
        defineField({ name: "backgroundImage", title: "Background Image", type: "image", options: { hotspot: true } }),
      ],
    }),

    // Arm A
    defineField({
      name: "armA",
      title: "Arm A — Services",
      type: "object",
      group: "arms",
      fields: armFields,
    }),

    // Arm B
    defineField({
      name: "armB",
      title: "Arm B — Equity",
      type: "object",
      group: "arms",
      fields: armFields,
    }),

    // Capabilities
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "object",
      group: "capabilities",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "capability",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            }),
          ],
        }),
      ],
    }),

    // Featured Projects
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      group: "featured",
      of: [
        defineArrayMember({
          type: "object",
          name: "featuredProject",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "type", title: "Type", type: "string" }),
            defineField({ name: "units", title: "Units", type: "string" }),
            defineField({ name: "status", title: "Status", type: "string" }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "type", media: "image" } },
        }),
      ],
    }),

    // CTA
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA Label", type: "string" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA Label", type: "string" }),
      ],
    }),
  ],
});
