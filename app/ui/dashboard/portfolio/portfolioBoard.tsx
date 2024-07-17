"use client";

import { PfParagState } from "@/app/lib/action";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import {
  useState,
  MouseEvent,
  FocusEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { makeKey } from "@/app/lib/util";

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
  intro,
  content,
  state,
  formAction,
}: {
  pfId: string;
  pgId: number;
  intro: string[];
  content: string[];
  state: PfParagState;
  formAction: (payload: FormData) => void;
}) {
  const returnAddress = `/dashboard/edit/portfolio/${pfId}/paragraph/${pgId}`;
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
      <div id="intro-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.intro?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
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
      <div id="content-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.content?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
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
