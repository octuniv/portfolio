import Paragraphs from "./ui/paragraphs";
import { ParagraphSkeleton } from "./ui/skeletons";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<ParagraphSkeleton />}>
        <Paragraphs /> 
      </Suspense>
    </>
  );
}
