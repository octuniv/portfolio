import { fetchPortfolioById } from "@/app/lib/data";
import PortfolioEditor from "@/app/ui/dashboard/portfolio/portfolioEditor";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const portfolio = await fetchPortfolioById(id);
  if (!portfolio) notFound();

  return <PortfolioEditor portfolio={portfolio} />;
}
