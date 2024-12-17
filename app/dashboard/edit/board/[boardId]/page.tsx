import { fetchBoardById } from "@/app/lib/data";
import BoardEditor from "@/app/ui/dashboard/board/boardEditor";
import { notFound } from "next/navigation";

type Params = Promise<{ boardId: string }>;
export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const boardId = params.boardId;
  const board = await fetchBoardById(boardId);
  if (!board) notFound();

  return <BoardEditor board={board} />;
}
