import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const publicContentDir = path.join(rootDir, "public", "content");
const contentRoots = ["btech_iitm", "ms_gatech", "achievements"];
const publishedRootFiles = ["cv.tex"];

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

rmSync(publicContentDir, { recursive: true, force: true });

const manifestPaths = contentRoots.flatMap((folder) => walkForManifests(path.join(rootDir, folder)));

for (const manifestPath of manifestPaths) {
  copyManifestAssets(manifestPath);
}

for (const fileName of publishedRootFiles) {
  const sourcePath = path.join(rootDir, fileName);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing published root file: ${fileName}`);
  }

  mkdirSync(publicContentDir, { recursive: true });
  cpSync(sourcePath, path.join(publicContentDir, fileName));
}

console.log(`Copied assets for ${manifestPaths.length} project manifest(s).`);