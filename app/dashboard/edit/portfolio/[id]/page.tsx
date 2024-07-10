import { fetchPortfolioById } from "@/app/lib/data";
import EditForm from "@/app/ui/dashboard/edit/editPortfolio";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const portfolio = await fetchPortfolioById(id);
  if (!portfolio) notFound();

  return (
    <main>
      <EditForm portfolio={portfolio} />
    </main>
  );
}
