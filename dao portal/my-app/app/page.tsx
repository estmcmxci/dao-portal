import { EnsHeader } from "@/components/ens-header";
import { ContentList } from "@/components/content-list";
import { getAllMDXFiles } from "@/lib/mdx";

export default function Home() {
  const files = getAllMDXFiles();
  
  // Filter out welcome from accordion
  const excludedFromAccordion = ["welcome"];
  const otherFiles = files.filter((f) => !excludedFromAccordion.includes(f.slug));

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden w-full">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 w-full min-w-0">
        <header className="mb-8 sm:mb-16">
          <EnsHeader />
        </header>

        {/* Documentation - Accordion */}
        <ContentList files={otherFiles} />
      </div>
    </div>
  );
}
