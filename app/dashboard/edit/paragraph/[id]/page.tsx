import { fetchParagraphById } from "@/app/lib/data";
import EditForm from "@/app/ui/dashboard/edit/editParag";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const paragraph = await fetchParagraphById(id);
  if (!paragraph) notFound();

  return <EditForm paragraph={paragraph} />;
}
