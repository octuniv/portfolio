import {
  ParagraphInPf,
  Portfolio as PortfolioType,
} from "@/app/lib/definition";
import { CreatePortfolio, DeletePortfolio, EditPortfolio } from "./buttons";

export function PortfolioSkeleton() {
  return <p>Loading Portfolios......</p>;
}

function Paragraph({ intro, content }: Omit<ParagraphInPf, "id">) {
  return (
    <div className="my-6">
      {intro.map((it, ind) => (
        <p key={"intro" + ind}>{it}</p>
      ))}
      {content.map((ct, ind) => (
        <p key={"content" + ind}>{ct}</p>
      ))}
    </div>
  );
}

function Portfolio({ portfolio }: { portfolio: PortfolioType }) {
  const { id, title, paragraphs } = portfolio;
  return (
    <div className="my-6">
      <p>title:{title}</p>
      {paragraphs.map((pg, ind) => (
        <Paragraph key={ind} intro={pg["intro"]} content={pg["content"]} />
      ))}
      <div className="flex justify-end, gap-2">
        <EditPortfolio id={id} />
        <DeletePortfolio id={id} />
      </div>
    </div>
  );
}

export default async function Portfolios({
  portfolios,
}: {
  portfolios: PortfolioType[];
}) {
  return (
    <>
      {portfolios.map((pf, ind) => (
        <Portfolio key={ind} portfolio={pf} />
      ))}
      <CreatePortfolio />
    </>
  );
}
