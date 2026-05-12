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
  namePart1: string;
  namePart2: string;
  tagline: string;
  email: string;
  copyright: string;
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
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
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

export interface HomeFeaturedProject {
  name: string;
  type: string;
  units: string;
  status: string;
  image: string;
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
  featuredProjects: HomeFeaturedProject[];
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
  const heroImg = content.home.hero.backgroundImage ?? "";
  const heroVid = content.home.hero.backgroundVideo ?? "";
  const storedType = content.home.hero.backgroundType;
  const validTypes: HeroBackgroundType[] = ["none", "image", "video"];
  const inferredType: HeroBackgroundType = heroVid
    ? "video"
    : heroImg
      ? "image"
      : "none";
  const backgroundType: HeroBackgroundType =
    storedType && validTypes.includes(storedType) ? storedType : inferredType;
  return {
    ...content,
    home: {
      ...content.home,
      hero: {
        ...content.home.hero,
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
