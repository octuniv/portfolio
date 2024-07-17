"use client";

import { Portfolio } from "@/app/lib/definition";
import Link from "next/link";
import { EditParagraph, EditTitle } from "./portfolioButtons";
import { AddPfParagraph } from "../buttons";
import { makeKey } from "@/app/lib/util";

type ParagraphDivType = {
  id: number;
  intro: {
    intro: string;
    key: string;
  }[];
  content: {
    content: string;
    key: string;
  }[];
};

function ParagraphDiv({
  paragraphInput,
  pfId,
}: {
  paragraphInput: ParagraphDivType;
  pfId: string;
}) {
  const { intro, content, id } = paragraphInput;
  return (
    <div key={id} className="my-8">
      <p>Introduction</p>
      {intro.map((int) => {
        return <p key={int.key}>{int.intro}</p>;
      })}
      <br />
      <p>Content</p>
      {content.map((ct) => {
        return <p key={ct.key}>{ct.content}</p>;
      })}
      <EditParagraph id={pfId} pgId={id} />
    </div>
  );
}

export default function PortfolioEditor({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const paragraphs = portfolio.paragraphs.map((pg) => {
    return {
      intro: pg.intro.map((intro, i) => {
        return {
          intro: intro,
          key: `intro${makeKey(i)}`,
        };
      }),
      content: pg.content.map((ct, i) => {
        return {
          content: ct,
          key: `content${makeKey(i)}`,
        };
      }),
      id: pg.id,
    };
  });

  return (
    <>
      <label>title</label>
      <p>{portfolio.title}</p>
      <EditTitle id={portfolio.id} />
      <br />
      <label>board</label>
      {paragraphs.map((pg) => (
        <ParagraphDiv paragraphInput={pg} pfId={portfolio.id} key={pg.id} />
      ))}
      <AddPfParagraph id={portfolio.id} />
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          return
        </Link>
      </div>
    </>
  );
}
