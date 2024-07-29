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

export function PortfolioSkeleton() {
  return <p>Loading Portfolios......</p>;
}

function Paragraph({ ParagraphBoard }: { ParagraphBoard: ParagraphBoard }) {
  const { subtitle, intro, content } = ParagraphBoard;
  return (
    <div className="flex flex-col mb-8">
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
    </div>
  );
}

function Portfolio({ portfolio }: { portfolio: PortfolioType }) {
  const { id, title, paragraphs } = portfolio;
  return (
    <div className="bg-slate-50 rounded-3xl py-3 pl-6 my-8">
      <h2 className="text-lg font-mono font-bold text-top-color">{title}</h2>
      <div className="border-2 w-20 border-t-stone-500 my-3"></div>
      <div className="flex flex-col">
        {paragraphs.map((pg, ind) => (
          <Paragraph key={ind} ParagraphBoard={pg} />
        ))}
      </div>
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
