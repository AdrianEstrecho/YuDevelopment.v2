import type { Metadata } from "next";
import { Geist, Chakra_Petch, Orbitron } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminShortcut from "@/components/AdminShortcut";
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

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${geistSans.variable} ${chakraPetch.variable} ${orbitron.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation
          namePart1={content.brand.namePart1}
          namePart2={content.brand.namePart2}
          logo={content.brand.logo}
          links={content.navigation.links}
        />
        <main className="flex-1">{children}</main>
        <Footer brand={content.brand} navigation={content.navigation.links} />
        <AdminShortcut />
      </body>
    </html>
  );
}
