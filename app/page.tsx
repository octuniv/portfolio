import Paragraphs from "./ui/paragraphs";
import { ParagraphSkeleton } from "./ui/paragraphs";
import { Suspense } from "react";
import Portfolios, { PortfolioSkeleton } from "./ui/portfolios";

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
