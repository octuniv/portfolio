import { fetchBoardTitleById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/dashboard/edit/board/editTitle";

export default async function Page({
  params,
}: {
  params: { boardId: string };
}) {
  const boardId = params.boardId;
  const title = await fetchBoardTitleById(boardId);
  if (!title) notFound();

  return <EditForm boardId={boardId} title={title} />;
}
