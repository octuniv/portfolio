"use client";

import { Paragraph } from "@/app/lib/definition";
import { Button } from "@/app/ui/buttonComponent";
import { ParagraphState as ErrorState } from "@/app/lib/action";
import { makeKey } from "@/app/lib/util";
import { ErrorElem } from "@/app/ui/elemInEditor";
import Link from "next/link";
import { FocusEvent, MouseEvent, useState } from "react";

export default function ParagraphEditor({
  paragraph,
  state,
  formAction,
}: {
  paragraph: Paragraph;
  state: ErrorState;
  formAction: (payload: FormData) => void;
}) {
  const [content, setContent] = useState(
    paragraph.content.map((ct, i) => {
      return {
        content: ct,
        key: makeKey(i),
      };
    })
  );

  const handleInputBlur = (
    index: number,
    event: FocusEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { value } = event.target;
    const nextCt = [...content];
    nextCt[index]["content"] = value;
    setContent(nextCt);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setContent([...content, { content: "", key: makeKey(content.length) }]);
  };

  const handleRemoveClick = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setContent((oldValues) => oldValues.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction}>
      <div>
        <label>title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={paragraph.title}
          placeholder="Enter your title"
        />
        <ErrorElem elemName="title" errors={state?.errors?.title} />
      </div>
      <div>
        <label>content</label>
        {content.map((ct, i) => (
          <div key={ct["key"]}>
            <input
              id="content"
              name="content"
              defaultValue={ct["content"]}
              onBlur={(e) => handleInputBlur(i, e)}
              placeholder="enter content"
            />
            <Button type="button" onClick={(e) => handleRemoveClick(i, e)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={(e) => handleAddClick(e)}>
          Add
        </Button>
        <ErrorElem elemName="content" errors={state?.errors?.content} />
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
