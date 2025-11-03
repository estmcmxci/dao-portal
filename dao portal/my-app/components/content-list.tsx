"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/mdx-components";
import { MDXFile } from "@/lib/mdx";

interface ContentListProps {
  files: MDXFile[];
}

// Define categories and their files
const CATEGORIES = {
  "Getting Started": ["index", "ENS Token", "constitution", "wallets"],
  "Voting": ["delegating", "voting", "proposals"],
  "Working Groups": ["working groups", "meta-governance", "ecosystem", "public goods"],
  "Organization": ["foundation", "endowment", "security council"],
};

export function ContentList({ files }: ContentListProps) {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [serializedContents, setSerializedContents] = useState<Map<string, any>>(new Map());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Group files by category
  const categorizedFiles = useMemo(() => {
    const result: { category: string; files: MDXFile[] }[] = [];
    
    Object.entries(CATEGORIES).forEach(([categoryName, slugs]) => {
      // Filter files and sort them according to the order in the slugs array
      const categoryFiles = files
        .filter((file) => slugs.includes(file.slug))
        .sort((a, b) => {
          const indexA = slugs.indexOf(a.slug);
          const indexB = slugs.indexOf(b.slug);
          return indexA - indexB;
        });
      if (categoryFiles.length > 0) {
        result.push({
          category: categoryName,
          files: categoryFiles,
        });
      }
    });
    
    return result;
  }, [files]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleFile = async (slug: string) => {
    const isExpanding = !expandedFiles.has(slug);
    
    setExpandedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });

    // Serialize MDX content when expanding if not already serialized
    if (isExpanding && !serializedContents.has(slug)) {
      const file = files.find((f) => f.slug === slug);
      if (file && file.content) {
        // Use dynamic import for serialize to avoid loading it on initial page load
        try {
          const { serialize } = await import("next-mdx-remote/serialize");
          const serialized = await serialize(file.content);
          setSerializedContents((prev) => {
            const next = new Map(prev);
            next.set(slug, serialized);
            return next;
          });
        } catch (error) {
          console.error("Failed to serialize MDX:", error);
        }
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse min-w-0">
        <thead>
          <tr className="border-b border-gray-200" style={{ backgroundColor: '#C5DDCC' }}>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
              Category
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold text-gray-600 sm:table-cell sm:px-6 sm:py-4 sm:text-sm">
              Description
            </th>
            <th className="w-12 px-4 py-3 text-right text-xs font-semibold text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
              {/* Chevron column */}
            </th>
          </tr>
        </thead>
        <tbody>
          {categorizedFiles.map((categoryData, categoryIndex) => (
            <React.Fragment key={categoryData.category}>
              {/* Category Header Row */}
              {(() => {
                const isCategoryExpanded = expandedCategories.has(categoryData.category);
                return (
                  <tr
                    className="cursor-pointer border-b border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
                    onClick={() => toggleCategory(categoryData.category)}
                  >
                    <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 sm:px-6">
                      <div className="flex items-center justify-between">
                        <span>{categoryData.category}</span>
                        {isCategoryExpanded ? (
                          <ChevronDown className="inline h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="inline h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })()}
              {/* Category Files */}
              {expandedCategories.has(categoryData.category) && categoryData.files.map((file, fileIndex) => {
                const serialized = serializedContents.get(file.slug);
                const isExpanded = expandedFiles.has(file.slug);
                const isLastFile = fileIndex === categoryData.files.length - 1;
                const isLastCategory = categoryIndex === categorizedFiles.length - 1;
                return (
                  <React.Fragment key={file.slug}>
                    <tr
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
                      onClick={() => toggleFile(file.slug)}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 min-w-0 max-w-[200px] sm:max-w-none">
                        <span className="truncate block">{file.title}</span>
                      </td>
                      <td className="hidden px-4 py-4 text-sm text-gray-600 sm:table-cell sm:px-6 min-w-0">
                        <span className="truncate block">{file.description || ""}</span>
                      </td>
                      <td className="px-4 py-4 text-right sm:px-6 shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="inline h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="inline h-4 w-4 text-gray-400" />
                        )}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={3} className="border-b border-gray-100 bg-gray-50 px-4 py-6 sm:px-6 min-w-0">
                          <div className="prose prose-sm max-w-none min-w-0 w-full break-words [&_p]:overflow-wrap-anywhere [&_*]:max-w-full [&_a]:break-words [&_a]:whitespace-normal [&_pre]:overflow-x-auto [&_code]:break-words">
                            {serialized ? (
                              <MDXRemote {...serialized} components={MDXComponents} />
                            ) : (
                              <p className="text-gray-500">Loading content...</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}


