import Paragraphs from "@/app/ui/dashboard/paragraphs";
import { ParagraphSkeleton } from "@/app/ui/dashboard/paragraphs";
import Portfolios, { PortfolioSkeleton } from "@/app/ui/dashboard/portfolios";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<ParagraphSkeleton />}>
        <Paragraphs />
      </Suspense>
      <Suspense fallback={<PortfolioSkeleton />}>
        <Portfolios />
      </Suspense>
    </>
  );
}
