import React from "react";
import Link from "next/link";
import { Accordion } from "./mdx-accordion";
import { ArrowRight } from "lucide-react";

// Placeholder components for MDX custom elements
export const MDXComponents = {
  Accordion,
  Info: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900 sm:my-6 sm:p-4 sm:text-sm max-w-full w-full min-w-0 break-words overflow-wrap-anywhere [&_a]:break-words [&_a]:whitespace-normal">
      {children}
    </div>
  ),
  Note: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-900 sm:my-6 sm:p-4 sm:text-sm max-w-full w-full min-w-0 break-words overflow-wrap-anywhere [&_a]:break-words [&_a]:whitespace-normal">
      {children}
    </div>
  ),
  Card: ({
    title,
    icon,
    href,
    children,
  }: {
    title: string;
    icon?: string;
    href?: string;
    children: React.ReactNode;
  }) => {
    const CardContent = (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 h-full flex flex-col not-prose">
        <h3 className="mb-2 text-sm font-semibold text-gray-900 sm:text-base">{title}</h3>
        <div className="text-xs text-gray-600 sm:text-sm flex-grow">{children}</div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block cursor-pointer no-underline not-prose h-full">
          {CardContent}
        </Link>
      );
    }

    return CardContent;
  },
  CardGroup: ({
    cols = 3,
    children,
  }: {
    cols?: number;
    children: React.ReactNode;
  }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 not-prose">
      {children}
    </div>
  ),
  Button: ({
    href,
    variant = "primary",
    icon,
    children,
  }: {
    href: string;
    variant?: "primary" | "secondary";
    icon?: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:px-6 sm:py-3 ${
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
      }`}
    >
      {icon === "arrow-right" && <ArrowRight className="h-4 w-4" />}
      {children}
    </a>
  ),
  Tooltip: ({
    tip,
    cta,
    href,
    children,
  }: {
    tip: string;
    cta?: string;
    href?: string;
    children: React.ReactNode;
  }) => (
    <span className="inline break-words">
      <span className="inline">{children}</span>
      <span
        title={tip}
        className="ml-1 inline cursor-help text-blue-600 underline decoration-dotted underline-offset-2 hover:text-blue-700 whitespace-nowrap"
      >
        {cta || "(?)"}
      </span>
    </span>
  ),
  Tabs: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6">{children}</div>
  ),
  Tab: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <div className="ml-4">{children}</div>
    </div>
  ),
  Frame: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6">{children}</div>
  ),
};

export function useMDXComponents(components: any) {
  return { ...MDXComponents, ...components };
}

