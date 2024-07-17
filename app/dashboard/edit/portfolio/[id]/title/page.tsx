import { fetchPfTitleById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/dashboard/edit/portfolio/editTitle";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const title = await fetchPfTitleById(id);
  if (!title) notFound();

  console.log(title);

  return <EditForm id={id} title={title} />;
}
