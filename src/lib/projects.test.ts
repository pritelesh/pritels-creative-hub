import { describe, it, expect } from "vitest";
import { resolveGalleryFolderName } from "./projects";

describe("resolveGalleryFolderName", () => {
  it("derives the gallery folder from an image path when the folder exists in the public gallery tree", () => {
    expect(
      resolveGalleryFolderName({
        title: "Example Project",
        image: "/Gallery/B/Screenshot 2026-03-30 222247.png",
      })
    ).toBe("B");
  });

  it("matches a project to a folder even when the folder names differ only by punctuation or casing", () => {
    expect(
      resolveGalleryFolderName({
        title: "Cap'splace",
        image: "/Gallery/capsplace/Screenshot 2026-03-30 220815.png",
      })
    ).toBe("capsplace");
  });
});
