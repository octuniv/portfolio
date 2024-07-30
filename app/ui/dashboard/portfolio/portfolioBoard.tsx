"use client";

import { PfParagState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import Link from "next/link";
import { ParagraphBoard } from "@/app/lib/definition";
import { ErrorElem, LineInput, TextAreaInput } from "@/app/ui/elemInEditor";
import {
  makeAddClick,
  makeInitState,
  makeInputBlur,
  makeRemoveClick,
} from "@/app/lib/eventFactory";

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
      <div className="space-y-12">
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <LineInput
              elemName="subtitle"
              defValue={subtitle}
              placeholder="Enter Subtitle"
            />
            <ErrorElem elemName="subtitle" errors={state?.errors?.subtitle} />
          </div>
        </div>

        {inputIntro.map((elem, ind) => (
          <div key={elem.key}>
            <TextAreaInput
              elemName="intro"
              defValue={elem.value}
              placeholder="Enter Introduction"
              onBlur={introInputBlur(ind)}
            />
            <Button type="button" onClick={removeIntroClick(ind)}>
              Remove
            </Button>
          </div>
        ))}
        <ErrorElem elemName="intro" errors={state?.errors?.intro} />
        <Button type="button" onClick={addIntroClick}>
          Add
        </Button>
        {inputCt.map((elem, ind) => (
          <div key={elem.key}>
            <TextAreaInput
              elemName="content"
              defValue={elem.value}
              placeholder="Enter Your Content"
              onBlur={contentInputBlur(ind)}
            />
            <Button type="button" onClick={removeContentClick(ind)}>
              Remove
            </Button>
          </div>
        ))}
        <ErrorElem elemName="content" errors={state?.errors?.content} />
        <Button type="button" onClick={addContentClick}>
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
      </div>
    </form>
  );
}
