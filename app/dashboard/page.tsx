import { fetchParagraphs, fetchPortfolios } from "@/app/lib/data";
import Dashboard from "@/app/ui/dashboard/dashboard";

export default async function Page() {
  const paragraphs = await fetchParagraphs();
  const portfolios = await fetchPortfolios();

  return <Dashboard paragraphs={paragraphs} portfolios={portfolios} />;
}
