import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

// Map URL slugs to actual filenames
const slugToFileName: Record<string, string> = {
  "index": "index.mdx",
  "ens-token": "ENS Token.mdx",
  "constitution": "constitution.mdx",
  "voting": "voting.mdx",
  "proposals": "proposals.mdx",
  "working-groups": "working groups.mdx",
};

export interface MDXFile {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  content: string;
  frontmatter: Record<string, any>;
}

export function getAllMDXFiles(): MDXFile[] {
  const fileNames = fs.readdirSync(contentDirectory).filter((name) =>
    name.endsWith(".mdx"),
  );

  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title: data.title || "",
      description: data.description || "",
      icon: data.icon || "",
      content,
      frontmatter: data,
    };
  });

  // Sort to put welcome first
  return allPosts.sort((a, b) => {
    if (a.slug === "welcome") return -1;
    if (b.slug === "welcome") return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getMDXFileBySlug(slug: string): MDXFile | null {
  try {
    // Get the actual filename from the slug mapping, or default to slug.mdx
    const fileName = slugToFileName[slug] || `${slug}.mdx`;
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      icon: data.icon || "",
      content,
      frontmatter: data,
    };
  } catch (error) {
    return null;
  }
}


