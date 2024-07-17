import { fetchPfParagById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/dashboard/edit/portfolio/editBoard";

export default async function Page({
  params,
}: {
  params: { id: string; pgId: number };
}) {
  const id = params.id;
  const pgId = params.pgId;
  const parag = await fetchPfParagById(id, pgId);
  if (!parag) notFound();

  return (
    <EditForm
      pfId={id}
      pgId={pgId}
      intro={parag.intro}
      content={parag.content}
    />
  );
}
