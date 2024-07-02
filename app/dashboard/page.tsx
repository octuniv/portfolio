import Paragraphs from "@/app/ui/paragraphs";
import { ParagraphSkeleton } from "@/app/ui/paragraphs";
import Portfolios, { PortfolioSkeleton } from "@/app/ui/portfolios";
import { Suspense } from "react";

export default function Home() {
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
