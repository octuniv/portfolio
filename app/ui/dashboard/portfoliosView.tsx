import {
  ParagraphBoard,
  Portfolio as PortfolioType,
} from "@/app/lib/definition";
import {
  AlignRightButtons,
  CreatePortfolio,
  DeletePortfolio,
  EditPortfolio,
} from "@/app/ui/dashboard/buttons";
import { Title } from "@/app/ui/elemInEditor";

export function PortfolioSkeleton() {
  return <p>Loading Portfolios......</p>;
}

function Paragraph({ ParagraphBoard }: { ParagraphBoard: ParagraphBoard }) {
  const { subtitle, intro, content } = ParagraphBoard;
  return (
    <article className="flex flex-col mb-8">
      <p className="text-lg font-bold text-gray-700">{subtitle}</p>
      {intro.map((it, ind) => (
        <p
          key={"intro" + ind}
          className="font-semibold text-sm text-gray-700 mt-2 mb-1"
        >
          {it}
        </p>
      ))}
      <ul className="text-sm list-disc pl-4 space-y-1">
        {content.map((ct, ind) => (
          <li key={"content" + ind}>{ct}</li>
        ))}
      </ul>
    </article>
  );
}

function Portfolio({ portfolio }: { portfolio: PortfolioType }) {
  const { id, title, paragraphs } = portfolio;
  return (
    <div className="bg-slate-50 rounded-3xl py-2 pl-6 mr-2 my-8">
      <Title title={title} />
      <section className="flex flex-col">
        {paragraphs.map((pg, ind) => (
          <Paragraph key={ind} ParagraphBoard={pg} />
        ))}
      </section>
      <AlignRightButtons>
        <EditPortfolio id={id} />
        <DeletePortfolio id={id} />
      </AlignRightButtons>
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
      <AlignRightButtons>
        <CreatePortfolio />
      </AlignRightButtons>
    </>
  );
}
