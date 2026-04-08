import type { StructureResolver } from "sanity/structure";

// A custom structure that lists each singleton document directly,
// instead of showing collections (since each section has only one document).
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Site Content")
    .items([
      S.listItem()
        .title("Brand")
        .id("brand")
        .child(S.document().schemaType("brand").documentId("brand")),
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      S.listItem()
        .title("Home")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Portfolio")
        .id("portfolio")
        .child(S.document().schemaType("portfolio").documentId("portfolio")),
      S.listItem()
        .title("People")
        .id("people")
        .child(S.document().schemaType("people").documentId("people")),
      S.listItem()
        .title("Invest")
        .id("invest")
        .child(S.document().schemaType("invest").documentId("invest")),
      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),
    ]);
