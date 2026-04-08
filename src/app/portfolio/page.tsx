import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function PortfolioPage() {
  const { portfolio } = await getContent();
  return <PortfolioClient content={portfolio} />;
}
