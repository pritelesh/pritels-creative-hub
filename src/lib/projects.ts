import projectsData from "@/data/projects.json";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  image?: string;
  link?: string;
  description?: string;
  files: string[];
  galleryFolder: string;
}

const importedGalleryAssets = import.meta.glob("../../public/Gallery/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

interface ProjectMetadata {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  image?: string;
  link?: string;
  description?: string;
  galleryFolder?: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeGalleryKey = (value?: string) =>
  value
    ?.toLowerCase()
    .trim()
    .replace(/[’'&\s]+/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .replace(/(^-|-$)/g, "") ?? "";

const getGalleryFolderNameFromPath = (imagePath?: string) => {
  if (!imagePath) return undefined;

  const segments = imagePath.split("/").filter(Boolean);
  const galleryIndex = segments.findIndex((segment) => segment.toLowerCase() === "gallery");

  if (galleryIndex === -1 || !segments[galleryIndex + 1]) {
    return undefined;
  }

  return decodeURIComponent(segments[galleryIndex + 1]);
};

const getGalleryFilesByFolder = () => {
  const filesByFolder = new Map<string, string[]>();
  const foldersByKey = new Map<string, string>();

  Object.entries(importedGalleryAssets).forEach(([importPath, assetUrl]) => {
    const normalizedImportPath = importPath.replace(/\\/g, "/");
    const segments = normalizedImportPath.split("/").filter(Boolean);
    const galleryIndex = segments.findIndex((segment) => segment.toLowerCase() === "gallery");

    if (galleryIndex === -1 || !segments[galleryIndex + 1]) {
      return;
    }

    const folderName = decodeURIComponent(segments[galleryIndex + 1]);
    const folderKey = normalizeGalleryKey(folderName);

    if (folderKey && !foldersByKey.has(folderKey)) {
      foldersByKey.set(folderKey, folderName);
    }

    const folderFiles = filesByFolder.get(folderName) ?? [];
    folderFiles.push(assetUrl);
    filesByFolder.set(folderName, folderFiles);
  });

  return { filesByFolder, foldersByKey };
};

const galleryData = getGalleryFilesByFolder();
const galleryFilesByFolder = galleryData.filesByFolder;
const galleryFoldersByKey = galleryData.foldersByKey;

export const resolveGalleryFolderName = (
  project: Pick<PortfolioProject, "title" | "image" | "galleryFolder" | "slug"> | ProjectMetadata,
) => {
  const imageFolder = getGalleryFolderNameFromPath(project?.image);
  if (imageFolder) {
    const normalizedImageFolder = normalizeGalleryKey(imageFolder);
    if (normalizedImageFolder && galleryFoldersByKey.has(normalizedImageFolder)) {
      return imageFolder;
    }

    if (!normalizedImageFolder || !galleryFoldersByKey.size) {
      return imageFolder;
    }
  }

  const candidates = [project?.galleryFolder, project?.title, project?.slug];

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeGalleryKey(candidate);
    if (!normalizedCandidate) continue;

    const matchedFolder = galleryFoldersByKey.get(normalizedCandidate);
    if (matchedFolder) {
      return matchedFolder;
    }
  }

  return undefined;
};

export const portfolioProjects: PortfolioProject[] = (projectsData as ProjectMetadata[])
  .map((project, index) => {
    const title = project.title ?? `Project ${index + 1}`;
    const slug = project.slug ?? slugify(title);
    const resolvedGalleryFolder = resolveGalleryFolderName(project);
    const files = resolvedGalleryFolder ? galleryFilesByFolder.get(resolvedGalleryFolder) ?? [] : [];
    const fallbackDescription =
      project.category === "Web"
        ? "Premium web application with a focus on user experience and performance."
        : "A modern digital experience crafted with cutting-edge technologies.";

    return {
      id: project.id ?? slug,
      slug,
      title,
      category: project.category ?? "Web",
      image: files[0] ?? "/placeholder.svg",
      link: project.link ?? "",
      description: project.description ?? fallbackDescription,
      files,
      galleryFolder: resolvedGalleryFolder ?? project.galleryFolder ?? title,
    };
  })
  .filter((project) => project.files.length > 0);

export const getProjectBySlug = (slug?: string | null) =>
  portfolioProjects.find((project) => project.slug === slug);
