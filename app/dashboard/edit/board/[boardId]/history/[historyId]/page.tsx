import { fetchHistoryId } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/dashboard/edit/board/editBoard";

type Params = Promise<{ boardId: string; historyId: number }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const boardId = params.boardId;
  const historyId = params.historyId;
  const histProperty = await fetchHistoryId(boardId, historyId);
  if (!histProperty) notFound();

  return (
    <EditForm
      boardId={boardId}
      historyId={historyId}
      historyProperty={histProperty}
    />
  );
}
