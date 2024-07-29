import { Suspense } from "react";
import Paragraphs, {
  ParagraphSkeleton,
} from "@/app/ui/dashboard/paragraphsView";
import Portfolios, {
  PortfolioSkeleton,
} from "@/app/ui/dashboard/portfoliosView";
import {
  Paragraph as ParagraphType,
  Portfolio as PortfolioType,
} from "@/app/lib/definition";

export default function Dashboard({
  paragraphs,
  portfolios,
}: {
  paragraphs: ParagraphType[];
  portfolios: PortfolioType[];
}) {
  return (
    <>
      <Suspense fallback={<ParagraphSkeleton />}>
        <Paragraphs paragraphs={paragraphs} />
      </Suspense>
      <Suspense fallback={<PortfolioSkeleton />}>
        <Portfolios portfolios={portfolios} />
      </Suspense>
    </>
  );
}
