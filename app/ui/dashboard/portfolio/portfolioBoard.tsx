"use client";

import { PfParagState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import Link from "next/link";
import {
  useState,
  MouseEvent,
  FocusEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { makeKey } from "@/app/lib/util";
import { ParagraphBoard } from "@/app/lib/definition";
import { ErrorElem } from "@/app/ui/elemInEditor";

type Input = {
  value: string;
  key: string;
}[];

type Setter = Dispatch<SetStateAction<Input>>;

const makeInitState = (values: string[]) => {
  return useState(
    values.map((v, i) => {
      return { value: v, key: makeKey(i) };
    })
  );
};

const makeAddClick =
  (values: Input, setter: Setter) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter([...values, { value: "", key: makeKey(values.length) }]);
  };

const makeRemoveClick =
  (setter: Setter) => (index: number, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter((oldValues) => oldValues.filter((_, i) => i !== index));
  };

const makeInputBlur =
  (values: Input, setter: Setter) =>
  (index: number, event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value: target } = event.target;
    const nextCt = [...values];
    nextCt[index]["value"] = target;
    setter(nextCt);
  };

export default function PortfolioBoard({
  pfId,
  pgId,
  paragraphBoard,
  state,
  formAction,
}: {
  pfId: string;
  pgId: number;
  paragraphBoard: ParagraphBoard;
  state: PfParagState;
  formAction: (payload: FormData) => void;
}) {
  const returnAddress = `/dashboard/edit/portfolio/${pfId}`;
  const { subtitle, intro, content } = paragraphBoard;
  const [inputIntro, setInputIntro] = makeInitState(intro);
  const [inputCt, setInputCt] = makeInitState(content);

  const addIntroClick = makeAddClick(inputIntro, setInputIntro);
  const addContentClick = makeAddClick(inputCt, setInputCt);

  const removeIntroClick = makeRemoveClick(setInputIntro);
  const removeContentClick = makeRemoveClick(setInputCt);

  const introInputBlur = makeInputBlur(inputIntro, setInputIntro);
  const contentInputBlur = makeInputBlur(inputCt, setInputCt);

  return (
    <form action={formAction}>
      <p>title</p>
      <input
        id="subtitle"
        name="subtitle"
        defaultValue={subtitle}
        placeholder="enter subtitle"
      />
      <ErrorElem elemName="subtitle" errors={state?.errors?.subtitle} />
      <p>intro</p>
      {inputIntro.map((elem, ind) => (
        <div key={elem.key}>
          <input
            id="intro"
            name="intro"
            defaultValue={elem.value}
            onBlur={(e) => introInputBlur(ind, e)}
            placeholder="enter intro"
          />
          <Button type="button" onClick={(e) => removeIntroClick(ind, e)}>
            Remove
          </Button>
        </div>
      ))}
      <ErrorElem elemName="intro" errors={state?.errors?.intro} />
      <Button type="button" onClick={(e) => addIntroClick(e)}>
        Add
      </Button>
      <br />
      <p>content</p>
      {inputCt.map((elem, ind) => (
        <div key={elem.key}>
          <input
            id="content"
            name="content"
            defaultValue={elem.value}
            onBlur={(e) => contentInputBlur(ind, e)}
            placeholder="enter content"
          />
          <Button type="button" onClick={(e) => removeContentClick(ind, e)}>
            Remove
          </Button>
        </div>
      ))}
      <ErrorElem elemName="content" errors={state?.errors?.content} />
      <Button type="button" onClick={(e) => addContentClick(e)}>
        Add
      </Button>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={returnAddress}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
