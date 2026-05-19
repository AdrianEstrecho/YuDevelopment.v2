import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { getSanityClient } from "./sanity";

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export interface BrandContent {
  name: string;
  tagline: string;
  email: string;
  copyright: string;
  logo: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationContent {
  links: NavLink[];
}

export type HeroBackgroundType = "none" | "image" | "video";

export interface HomeHero {
  descriptionLine1: string;
  descriptionLine2: string;
  backgroundType: HeroBackgroundType;
  backgroundImage: string;
  backgroundVideo: string;
}

export interface HomeArm {
  label: string;
  title: string;
  description: string;
  items: string[];
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface HomeCapabilities {
  label: string;
  title: string;
  description: string;
  items: CapabilityItem[];
}

export interface HomeCta {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface HomeContent {
  hero: HomeHero;
  armA: HomeArm;
  armB: HomeArm;
  capabilities: HomeCapabilities;
  cta: HomeCta;
}

export interface PageHero {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
}

export interface AboutModel {
  label: string;
  title: string;
  paragraphs: string[];
}

export interface AboutStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutMilestone {
  year: string;
  event: string;
}

export interface AboutContent {
  hero: PageHero;
  model: AboutModel;
  stats: AboutStat[];
  values: AboutValue[];
  milestones: AboutMilestone[];
}

export interface TimelineEntry {
  label: string;
  date: string;
}

export interface PortfolioProject {
  name: string;
  slug: string;
  location: string;
  type: string;
  scope: string;
  status: string;
  description: string;
  image: string;
  gallery: string[];
  timeline: TimelineEntry[];
  coordinates: [number, number];
  projectType: string;
}

export interface PortfolioPipeline {
  label: string;
  title: string;
  description: string;
}

export interface PortfolioContent {
  title: string;
  projects: PortfolioProject[];
  pipeline: PortfolioPipeline;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface PeopleCulture {
  label: string;
  title: string;
  description: string;
  items: string[];
}

export interface PeopleContent {
  hero: PageHero;
  members: TeamMember[];
  culture: PeopleCulture;
}

export interface InvestAdvantage {
  title: string;
  description: string;
}

export interface InvestStrategy {
  name: string;
  target: string;
  description: string;
  risk: string;
}

export interface InvestMachineStep {
  n: string;
  label: string;
  description: string;
}

export interface InvestContent {
  hero: PageHero;
  advantages: InvestAdvantage[];
  strategies: InvestStrategy[];
  machineSteps: InvestMachineStep[];
}

export interface ContactInfo {
  generalEmail: string;
  servicesText: string;
  investmentText: string;
}

export interface ContactContent {
  hero: PageHero;
  info: ContactInfo;
}

export interface SiteContent {
  brand: BrandContent;
  navigation: NavigationContent;
  home: HomeContent;
  about: AboutContent;
  portfolio: PortfolioContent;
  people: PeopleContent;
  invest: InvestContent;
  contact: ContactContent;
}

const SANITY_DOC_ID = "siteContent";

const contentPath = path.join(process.cwd(), "src/content/site.json");

/** Read content from local JSON file (fallback) */
async function getLocalContent(): Promise<SiteContent> {
  const data = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(data) as SiteContent;
}

/** Strip Sanity internal fields (_id, _type, _rev, _createdAt, _updatedAt) */
function stripSanityMeta(doc: Record<string, unknown>): SiteContent {
  const { _id, _type, _rev, _createdAt, _updatedAt, ...content } = doc;
  return content as unknown as SiteContent;
}

/** Ensure every project has a slug and the newer optional fields */
function normalizeProjects(content: SiteContent): SiteContent {
  const rawHero = (content.home?.hero ?? {}) as unknown as Record<string, unknown>;
  const {
    eyebrow: _legacyEyebrow,
    titleLine1: _legacyTitleLine1,
    titleLine2: _legacyTitleLine2,
    primaryCta: _legacyPrimaryCta,
    secondaryCta: _legacySecondaryCta,
    description: legacyDescription,
    descriptionLine1: storedLine1,
    descriptionLine2: storedLine2,
    ...heroRest
  } = rawHero;
  void _legacyEyebrow;
  void _legacyTitleLine1;
  void _legacyTitleLine2;
  void _legacyPrimaryCta;
  void _legacySecondaryCta;
  let descriptionLine1 = typeof storedLine1 === "string" ? storedLine1 : "";
  let descriptionLine2 = typeof storedLine2 === "string" ? storedLine2 : "";
  if (!descriptionLine1 && !descriptionLine2 && typeof legacyDescription === "string") {
    const parts = legacyDescription.split(/\r?\n/);
    descriptionLine1 = parts[0] ?? "";
    descriptionLine2 = parts.slice(1).join(" ").trim();
  }
  const heroImg = typeof heroRest.backgroundImage === "string" ? heroRest.backgroundImage : "";
  const heroVid = typeof heroRest.backgroundVideo === "string" ? heroRest.backgroundVideo : "";
  const storedType = heroRest.backgroundType as HeroBackgroundType | undefined;
  const validTypes: HeroBackgroundType[] = ["none", "image", "video"];
  const inferredType: HeroBackgroundType = heroVid
    ? "video"
    : heroImg
      ? "image"
      : "none";
  const backgroundType: HeroBackgroundType =
    storedType && validTypes.includes(storedType) ? storedType : inferredType;
  const rawBrand = (content.brand ?? {}) as unknown as Record<string, unknown>;
  const { namePart1, namePart2, ...brandRest } = rawBrand as {
    namePart1?: string;
    namePart2?: string;
    [k: string]: unknown;
  };
  const mergedName =
    (typeof brandRest.name === "string" && brandRest.name) ||
    [namePart1, namePart2].filter(Boolean).join("") ||
    "";
  const rawHome = (content.home ?? {}) as unknown as Record<string, unknown>;
  const { featuredProjects: _legacyFeatured, ...homeRest } = rawHome as {
    featuredProjects?: unknown;
    [k: string]: unknown;
  };
  void _legacyFeatured;
  return {
    ...content,
    brand: {
      ...(brandRest as unknown as BrandContent),
      name: mergedName,
      logo: typeof brandRest.logo === "string" ? (brandRest.logo as string) : "",
    },
    home: {
      ...(homeRest as unknown as HomeContent),
      hero: {
        descriptionLine1,
        descriptionLine2,
        backgroundType,
        backgroundImage: heroImg,
        backgroundVideo: heroVid,
      },
    },
    portfolio: {
      ...content.portfolio,
      projects: content.portfolio.projects.map((p) => ({
        ...p,
        slug:
          p.slug ||
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        description: p.description || "",
        gallery: p.gallery || [],
        timeline: p.timeline || [],
      })),
    },
  };
}

export async function getContent(): Promise<SiteContent> {
  noStore();
  try {
    const doc = await getSanityClient().fetch(
      `*[_id == $id][0]`,
      { id: SANITY_DOC_ID }
    );
    if (doc) return normalizeProjects(stripSanityMeta(doc));
  } catch {
    // Sanity unavailable — fall through to local
  }
  return normalizeProjects(await getLocalContent());
}

export async function saveContent(content: unknown): Promise<void> {
  await getSanityClient().createOrReplace({
    _id: SANITY_DOC_ID,
    _type: "siteContent",
    ...(content as Record<string, unknown>),
  });
}
