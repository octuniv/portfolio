import { Suspense } from "react";
import Paragraphs, {
  ParagraphSkeleton,
} from "@/app/ui/dashboard/paragraphsView";
import Boards, { BoardSkeleton } from "@/app/ui/dashboard/boardsView";
import {
  Paragraph as ParagraphType,
  Board as BoardType,
} from "@/app/lib/definition";

export default function Dashboard({
  paragraphs,
  boards,
}: {
  paragraphs: ParagraphType[];
  boards: BoardType[];
}) {
  return (
    <>
      <Suspense fallback={<ParagraphSkeleton />}>
        <Paragraphs paragraphs={paragraphs} />
      </Suspense>
      <Suspense fallback={<BoardSkeleton />}>
        <Boards boards={boards} />
      </Suspense>
    </>
  );
}
