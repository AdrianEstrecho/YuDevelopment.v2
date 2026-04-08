import type { Metadata } from "next";
import { Geist, Chakra_Petch } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "YuDevelopment | YGCCC",
    template: "%s | YuDevelopment",
  },
  description:
    "Development services, multifamily investment, and long-term equity building. YuDevelopment is the golden goose of YGCCC.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html lang="en" className={`${geistSans.variable} ${chakraPetch.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation
          namePart1={content.brand.namePart1}
          namePart2={content.brand.namePart2}
          links={content.navigation.links}
        />
        <main className="flex-1">{children}</main>
        <Footer brand={content.brand} navigation={content.navigation.links} />
      </body>
    </html>
  );
}
