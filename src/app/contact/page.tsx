import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const { contact } = await getContent();
  return <ContactClient content={contact} />;
}
