"use client";

import { ParagraphInPf, Portfolio } from "@/app/lib/definition";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { Button } from "@/app/ui/button";
import { PortfolioState as ErrorState } from "@/app/lib/action";

const makeKey = (index: number) => String(Date.now() * 100 + index);

type ParagraphDivType = {
  key: string;
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
  index,
}: {
  paragraphInput: ParagraphDivType;
  index: number;
}) {
  const { intro, content, key } = paragraphInput;
  console.log(key);
  return (
    <div key={key} className="my-8">
      <p>Introduction</p>
      {intro.map((int, i) => {
        return (
          <div key={int.key}>
            <input
              id={`paragraphIntro${i}`}
              name={`paragraphIntro${i}`}
              defaultValue={int.intro}
              placeholder="enter introduction"
            />
          </div>
        );
      })}
      <p>Content</p>
      {content.map((ct, i) => {
        return (
          <div key={ct.key}>
            <input
              id={`paragraphContent${i}`}
              name={`paragraphContent${i}`}
              defaultValue={ct.content}
              placeholder="enter content"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioEditor({
  portfolio,
  state,
  formAction,
}: {
  portfolio: Portfolio;
  state: ErrorState;
  formAction: (payload: FormData) => void;
}) {
  const [paragraphs, setParagraphs] = useState<ParagraphDivType[]>(
    portfolio.paragraphs.map((pg) => {
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
        key: makeKey(pg.id),
      };
    })
  );

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setParagraphs([
      ...paragraphs,
      {
        intro: [
          {
            intro: "",
            key: `intro${makeKey(0)}`,
          },
        ],
        content: [
          {
            content: "",
            key: `content${makeKey(0)}`,
          },
        ],
        key: `Added${makeKey(paragraphs.length)}`,
      },
    ]);
  };

  return (
    <form action={formAction}>
      <div>
        <label>title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={portfolio.title}
          placeholder="Enter your title"
        />
        <div id="portfolio-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.title?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label>paragraph</label>
        {paragraphs.map((pg, i) => (
          <ParagraphDiv paragraphInput={pg} index={i} />
        ))}
        <Button onClick={(e) => handleAddClick(e)}>Add</Button>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
