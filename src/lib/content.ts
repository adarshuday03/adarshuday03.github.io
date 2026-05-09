import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type InstitutionKey = "bachelors" | "masters";

export interface SiteNavigationItem {
  label: string;
  href: string;
}

export interface SiteMetric {
  label: string;
  value: string;
}

export interface SiteHighlightSection {
  title: string;
  href: string;
  summary: string;
}

export interface SiteTimelineEntry {
  year: string;
  label: string;
  description: string;
}

export interface ResumeEntry {
  title: string;
  period: string;
  subtitle: string;
  summary: string;
  bullets: string[];
  tags: string[];
  href?: string;
}

export interface InstitutionSummary {
  headline: string;
  summary: string[];
  stats: SiteMetric[];
  focusAreas: string[];
  buildNote?: string;
}

export interface SiteAchievement {
  title: string;
  value: string;
  detail: string;
}

export interface SchoolingEntry {
  institution: string;
  credential: string;
  year: string;
  score: string;
}

export interface SiteAboutSection {
  title: string;
  body: string[];
}

export interface SiteLink {
  label: string;
  href: string;
  note?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SiteData {
  navigation: SiteNavigationItem[];
  person: {
    name: string;
    title: string;
    location: string;
    intro: string[];
    currentMindset: string;
    currentFocus: string[];
  };
  home: {
    featuredProjectSlug?: string;
    highlightSections: SiteHighlightSection[];
    timelinePreview: SiteTimelineEntry[];
  };
  institutions: {
    masters: InstitutionSummary;
    bachelors: InstitutionSummary;
  };
  achievements: SiteAchievement[];
  schooling: SchoolingEntry[];
  about: {
    sections: SiteAboutSection[];
  };
  resume: {
    leadership: ResumeEntry[];
    extracurriculars: ResumeEntry[];
    skills: SkillGroup[];
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    links: SiteLink[];
  };
}

export interface ProjectAsset {
  file: string;
  kind: "video" | "document" | "download";
  label: string;
  description: string;
  featured?: boolean;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface ProjectExternalLink {
  label: string;
  href: string;
}

export interface ProjectManifest {
  id: string;
  slug: string;
  title: string;
  summary: string;
  institution: InstitutionKey;
  institutionLabel: string;
  year: number;
  order: number;
  semester: string;
  timeline: {
    start: string;
    end: string;
    label: string;
  };
  course: {
    name: string;
    mentor?: string;
  };
  tags: string[];
  highlights: string[];
  sections: ProjectSection[];
  externalLinks?: ProjectExternalLink[];
  assets: ProjectAsset[];
}

export interface LoadedProjectAsset extends ProjectAsset {
  extension: string;
  publicPath: string;
}

export interface LoadedProject extends Omit<ProjectManifest, "assets"> {
  assets: LoadedProjectAsset[];
  href: string;
  relativeDirectory: string;
}

const rootDir = fileURLToPath(new URL("../../", import.meta.url));
const contentRoots = ["btech_iitm", "ms_gatech", "achievements"];

let siteDataCache: SiteData | undefined;
let projectCache: LoadedProject[] | undefined;

function readJsonFile<T>(relativePath: string): T {
  const absolutePath = path.join(rootDir, relativePath);
  return JSON.parse(readFileSync(absolutePath, "utf8")) as T;
}

function walkForProjectManifests(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });
  const manifests: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      manifests.push(...walkForProjectManifests(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name === "project.json") {
      manifests.push(fullPath);
    }
  }

  return manifests;
}

function normalizeWebPath(...segments: string[]): string {
  return `/${segments.join("/").replace(/\\/g, "/")}`;
}

function loadProjectManifest(manifestPath: string): LoadedProject {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as ProjectManifest;
  const manifestDirectory = path.dirname(manifestPath);
  const relativeDirectory = path.relative(rootDir, manifestDirectory);

  return {
    ...manifest,
    assets: manifest.assets.map((asset) => ({
      ...asset,
      extension: path.extname(asset.file).replace(".", "").toLowerCase(),
      publicPath: normalizeWebPath("content", relativeDirectory, asset.file)
    })),
    href: `/projects/${manifest.slug}/`,
    relativeDirectory
  };
}

export function loadSiteData(): SiteData {
  if (!siteDataCache) {
    siteDataCache = readJsonFile<SiteData>(path.join("site-content", "site.json"));
  }

  return siteDataCache;
}

export function loadProjects(): LoadedProject[] {
  if (!projectCache) {
    const manifestPaths = contentRoots.flatMap((folder) => walkForProjectManifests(path.join(rootDir, folder)));

    projectCache = manifestPaths
      .map((manifestPath) => loadProjectManifest(manifestPath))
      .sort((left, right) => {
        const leftTime = new Date(left.timeline.start).getTime();
        const rightTime = new Date(right.timeline.start).getTime();

        if (rightTime !== leftTime) {
          return rightTime - leftTime;
        }

        return right.order - left.order;
      });
  }

  return projectCache;
}

export function getProjectsByInstitution(institution: InstitutionKey): LoadedProject[] {
  return loadProjects().filter((project) => project.institution === institution);
}

export function getProjectBySlug(slug: string): LoadedProject | undefined {
  return loadProjects().find((project) => project.slug === slug);
}