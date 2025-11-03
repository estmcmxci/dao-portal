import { notFound } from "next/navigation";
import { EnsHeader } from "@/components/ens-header";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx-components";
import { getMDXFileBySlug, getAllMDXFiles } from "@/lib/mdx";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all content pages
export async function generateStaticParams() {
  const files = getAllMDXFiles();
  return files.map((file) => ({
    slug: file.slug,
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const file = getMDXFileBySlug(slug);

  if (!file) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden w-full">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 w-full min-w-0">
        <header className="mb-8 sm:mb-16">
          <EnsHeader />
        </header>

        <div className="prose prose-sm max-w-none min-w-0 w-full break-words [&_p]:overflow-wrap-anywhere [&_*]:max-w-full [&_a]:break-words [&_a]:whitespace-normal">
          <h1 className="text-3xl font-bold mb-6 sm:text-4xl">{file.title}</h1>
          <MDXRemote source={file.content} components={MDXComponents} />
        </div>
      </div>
    </div>
  );
}

