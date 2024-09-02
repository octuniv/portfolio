import { fetchParagraphs, fetchBoards } from "@/app/lib/data";
import Dashboard from "@/app/ui/dashboard/dashboard";

export default async function Page() {
  const paragraphs = await fetchParagraphs();
  const boards = await fetchBoards();

  return <Dashboard paragraphs={paragraphs} boards={boards} />;
}
