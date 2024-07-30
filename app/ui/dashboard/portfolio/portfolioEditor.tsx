"use client";

import { ParagraphBoardDiv, Portfolio } from "@/app/lib/definition";
import {
  EditParagraph,
  EditTitle,
} from "@/app/ui/dashboard/portfolio/portfolioButtons";
import {
  AddPfParagraph,
  AlignRightButtons,
  DeletePfParagraph,
} from "@/app/ui/dashboard/buttons";
import { convParagBoardsToDivs } from "@/app/lib/util";
import Link from "next/link";
import { Fragment } from "react";

function BoardDiv({
  paragraphInput,
  pfId,
}: {
  paragraphInput: ParagraphBoardDiv;
  pfId: string;
}) {
  const { subtitle, intro, content, id } = paragraphInput;
  return (
    <Background key={id}>
      <h3 className="pb-2 mb-3 mt-0 text-2xl font-medium leading-tight border-b-2 border-lime-950 border-dashed">
        {subtitle}
      </h3>
      <p className="mb-4 leading-tight text-sm">
        {intro.map((it) => (
          <Fragment key={it.key}>
            {it.value}
            <br />
          </Fragment>
        ))}
      </p>
      <p className="mb-4 leading-loose text-xl">
        {content.map((ct) => (
          <Fragment key={ct.key}>
            {ct.value}
            <br />
          </Fragment>
        ))}
      </p>
      <AlignRightButtons>
        <EditParagraph id={pfId} pgId={id} />
        <DeletePfParagraph pfId={pfId} pgId={id} />
      </AlignRightButtons>
    </Background>
  );
}

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full realtive bg-slate-50 rounded-3xl p-5 border-2 border-indigo-500">
      {children}
    </div>
  );
}

export default function PortfolioEditor({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const paragraphs = convParagBoardsToDivs(portfolio.paragraphs);

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12 pt-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Portfolio Detail
        </h2>
        <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
          This informations create and display the components that you want to
          display.
        </p>
        <Background>
          <h2 className="pb-2 mb-6 mt-0 text-3xl font-medium leading-tight border-b-2 border-lime-950 border-dashed">
            TITLE
          </h2>
          <p className="text-xl font-light">{portfolio.title}</p>
          <AlignRightButtons>
            <EditTitle id={portfolio.id} />
          </AlignRightButtons>
        </Background>
      </div>
      {paragraphs.map((pg) => (
        <BoardDiv paragraphInput={pg} pfId={portfolio.id} key={pg.id} />
      ))}
      <AlignRightButtons>
        <AddPfParagraph id={portfolio.id} />
      </AlignRightButtons>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          return
        </Link>
      </div>
    </div>
  );
}
