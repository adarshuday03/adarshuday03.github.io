import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const publicContentDir = path.join(rootDir, "public", "content");
const contentRoots = ["btech_iitm", "ms_gatech", "achievements"];
const publishedRootFiles = ["cv.tex"];
const siteContentPath = path.join(rootDir, "site-content", "site.json");

function walkForManifests(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });
  const manifests = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      manifests.push(...walkForManifests(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name === "project.json") {
      manifests.push(fullPath);
    }
  }

  return manifests;
}

function loadManifest(manifestPath) {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function copyManifestAssets(manifestPath) {
  const manifest = loadManifest(manifestPath);
  const manifestDir = path.dirname(manifestPath);
  const relativeDir = path.relative(rootDir, manifestDir);
  const destinationDir = path.join(publicContentDir, relativeDir);

  mkdirSync(destinationDir, { recursive: true });

  for (const asset of manifest.assets ?? []) {
    const sourcePath = path.join(manifestDir, asset.file);

    if (!existsSync(sourcePath)) {
      throw new Error(`Missing asset referenced in ${manifestPath}: ${asset.file}`);
    }

    cpSync(sourcePath, path.join(destinationDir, asset.file));
  }
}

function collectSiteAssetPaths(siteData) {
  const assetPaths = [];

  for (const institution of Object.values(siteData.institutions ?? {})) {
    if (institution.logo?.path) {
      assetPaths.push(institution.logo.path);
    }

    for (const media of institution.heroMedia ?? []) {
      if (media.path) {
        assetPaths.push(media.path);
      }
    }
  }

  return [...new Set(assetPaths)];
}

function resolveRepoRelativePath(relativePath) {
  const normalizedPath = path.normalize(relativePath);
  const absolutePath = path.join(rootDir, normalizedPath);
  const resolvedRelativePath = path.relative(rootDir, absolutePath);

  if (resolvedRelativePath.startsWith("..") || path.isAbsolute(resolvedRelativePath)) {
    throw new Error(`Invalid site asset path outside repository root: ${relativePath}`);
  }

  return {
    sourcePath: absolutePath,
    relativePath: resolvedRelativePath
  };
}

function copySiteAsset(relativePath) {
  const { sourcePath, relativePath: resolvedRelativePath } = resolveRepoRelativePath(relativePath);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing site asset referenced in site-content/site.json: ${relativePath}`);
  }

  const destinationPath = path.join(publicContentDir, resolvedRelativePath);
  mkdirSync(path.dirname(destinationPath), { recursive: true });
  cpSync(sourcePath, destinationPath);
}

rmSync(publicContentDir, { recursive: true, force: true });

const manifestPaths = contentRoots.flatMap((folder) => walkForManifests(path.join(rootDir, folder)));
const siteData = loadManifest(siteContentPath);
const siteAssetPaths = collectSiteAssetPaths(siteData);

for (const manifestPath of manifestPaths) {
  copyManifestAssets(manifestPath);
}

for (const assetPath of siteAssetPaths) {
  copySiteAsset(assetPath);
}

for (const fileName of publishedRootFiles) {
  const sourcePath = path.join(rootDir, fileName);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing published root file: ${fileName}`);
  }

  mkdirSync(publicContentDir, { recursive: true });
  cpSync(sourcePath, path.join(publicContentDir, fileName));
}

console.log(`Copied assets for ${manifestPaths.length} project manifest(s) and ${siteAssetPaths.length} site asset(s).`);