import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { client } from "../../sanity/lib/client";

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

export interface HomeHero {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  backgroundImage: string;
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

export interface PortfolioProject {
  name: string;
  location: string;
  type: string;
  scope: string;
  status: string;
  image: string;
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

// ── GROQ queries ────────────────────────────────────────────────────────
// Each query projects image references → plain URLs so the page can render
// either Sanity-uploaded images or fallback URLs/paths uniformly.

const BRAND_QUERY = `*[_type == "brand"][0]{ namePart1, namePart2, tagline, email, copyright }`;

const NAVIGATION_QUERY = `*[_type == "navigation"][0]{ links[]{ href, label } }`;

const HOME_QUERY = `*[_type == "home"][0]{
  hero{
    eyebrow, titleLine1, titleLine2, description, primaryCta, secondaryCta,
    "backgroundImage": backgroundImage.asset->url
  },
  armA{ label, title, description, items },
  armB{ label, title, description, items },
  capabilities{
    label, title, description,
    items[]{ title, description }
  },
  featuredProjects[]{
    name, type, units, status,
    "image": image.asset->url
  },
  cta{ eyebrow, title, description, primaryCta, secondaryCta }
}`;

const ABOUT_QUERY = `*[_type == "about"][0]{
  hero{ eyebrow, titleLine1, titleLine2, description },
  model{ label, title, paragraphs },
  stats[]{ value, label, sublabel },
  values[]{ title, description },
  milestones[]{ year, event }
}`;

const PORTFOLIO_QUERY = `*[_type == "portfolio"][0]{
  title,
  projects[]{
    name, location, type, scope, status,
    "image": image.asset->url
  },
  pipeline{ label, title, description }
}`;

const PEOPLE_QUERY = `*[_type == "people"][0]{
  hero{ eyebrow, titleLine1, titleLine2, description },
  members[]{
    name, title, bio,
    "image": image.asset->url
  },
  culture{ label, title, description, items }
}`;

const INVEST_QUERY = `*[_type == "invest"][0]{
  hero{ eyebrow, titleLine1, titleLine2, description },
  advantages[]{ title, description },
  strategies[]{ name, target, description, risk },
  machineSteps[]{ n, label, description }
}`;

const CONTACT_QUERY = `*[_type == "contact"][0]{
  hero{ eyebrow, titleLine1, titleLine2, description },
  info{ generalEmail, servicesText, investmentText }
}`;

// ── Fallback ────────────────────────────────────────────────────────────
// If Sanity returns null/empty for a section (because the editor hasn't
// created it yet) we fall back to the seed content in src/content/site.json.
// This keeps the site rendering even before the user populates Sanity.

const FALLBACK_PATH = path.join(process.cwd(), "src/content/site.json");

async function getFallback(): Promise<SiteContent> {
  const data = await fs.readFile(FALLBACK_PATH, "utf-8");
  return JSON.parse(data) as SiteContent;
}

/**
 * Deep-merges Sanity content with fallback content.
 * - For null/undefined values, uses the fallback.
 * - For arrays/primitives, uses Sanity if defined.
 * - For nested objects, recurses.
 */
function deepMerge<T>(sanity: unknown, fallback: T): T {
  if (sanity === null || sanity === undefined) return fallback;
  if (typeof sanity !== "object" || Array.isArray(sanity)) return sanity as T;
  if (typeof fallback !== "object" || fallback === null || Array.isArray(fallback)) {
    return sanity as T;
  }

  const result: Record<string, unknown> = {};
  const sanityObj = sanity as Record<string, unknown>;
  const fallbackObj = fallback as Record<string, unknown>;
  const keys = new Set([...Object.keys(sanityObj), ...Object.keys(fallbackObj)]);
  for (const key of keys) {
    result[key] = deepMerge(sanityObj[key], fallbackObj[key]);
  }
  return result as T;
}

export async function getContent(): Promise<SiteContent> {
  noStore();

  const fallback = await getFallback();

  try {
    const [brand, navigation, home, about, portfolio, people, invest, contact] = await Promise.all([
      client.fetch(BRAND_QUERY),
      client.fetch(NAVIGATION_QUERY),
      client.fetch(HOME_QUERY),
      client.fetch(ABOUT_QUERY),
      client.fetch(PORTFOLIO_QUERY),
      client.fetch(PEOPLE_QUERY),
      client.fetch(INVEST_QUERY),
      client.fetch(CONTACT_QUERY),
    ]);

    return {
      brand: deepMerge(brand, fallback.brand),
      navigation: deepMerge(navigation, fallback.navigation),
      home: deepMerge(home, fallback.home),
      about: deepMerge(about, fallback.about),
      portfolio: deepMerge(portfolio, fallback.portfolio),
      people: deepMerge(people, fallback.people),
      invest: deepMerge(invest, fallback.invest),
      contact: deepMerge(contact, fallback.contact),
    };
  } catch (err) {
    console.error("[content] Sanity fetch failed, using fallback content:", err);
    return fallback;
  }
}
