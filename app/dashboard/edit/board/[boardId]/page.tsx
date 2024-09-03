import { fetchBoardById } from "@/app/lib/data";
import BoardEditor from "@/app/ui/dashboard/board/boardEditor";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { boardId: string };
}) {
  const boardId = params.boardId;
  const board = await fetchBoardById(boardId);
  if (!board) notFound();

  return <BoardEditor board={board} />;
}
