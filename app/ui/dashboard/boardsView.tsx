import { HistoryProperty, Board as BoardType } from "@/app/lib/definition";
import {
  AlignRightButtons,
  CreateBoard,
  DeleteBoard,
  EditBoard,
} from "@/app/ui/dashboard/buttons";
import { Title } from "@/app/ui/elemInEditor";

export function BoardSkeleton() {
  return <p>Loading Boards......</p>;
}

function BoardDisplay({
  historyProperty,
}: {
  historyProperty: HistoryProperty;
}) {
  const { subtitle, intros, contents } = historyProperty;
  return (
    <article className="flex flex-col mb-8">
      <p className="text-lg font-bold text-gray-700">{subtitle}</p>
      {intros.map((it, ind) => (
        <p
          key={"intro" + ind}
          className="font-semibold text-sm text-gray-700 mt-2 mb-1"
        >
          {it}
        </p>
      ))}
      <ul className="text-sm list-disc pl-4 space-y-1">
        {contents.map((ct, ind) => (
          <li key={"content" + ind}>{ct}</li>
        ))}
      </ul>
    </article>
  );
}

function BoardBlock({ board }: { board: BoardType }) {
  const { id, title, historys } = board;
  return (
    <div className="bg-slate-50 rounded-3xl py-2 pl-6 mr-2 my-8">
      <Title title={title} />
      <section className="flex flex-col">
        {historys.map((hist, ind) => (
          <BoardDisplay key={ind} historyProperty={hist} />
        ))}
      </section>
      <AlignRightButtons>
        <EditBoard id={id} />
        <DeleteBoard id={id} />
      </AlignRightButtons>
    </div>
  );
}

export default async function Boards({ boards }: { boards: BoardType[] }) {
  return (
    <>
      {boards.map((pf, ind) => (
        <BoardBlock key={ind} board={pf} />
      ))}
      <AlignRightButtons>
        <CreateBoard />
      </AlignRightButtons>
    </>
  );
}
