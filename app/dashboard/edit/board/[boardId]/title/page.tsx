import { fetchBoardTitleById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/dashboard/edit/board/editTitle";

type Params = Promise<{ boardId: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const boardId = params.boardId;
  const title = await fetchBoardTitleById(boardId);
  if (!title) notFound();

  return <EditForm boardId={boardId} title={title} />;
}
