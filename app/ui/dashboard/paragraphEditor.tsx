"use client";

import { Paragraph } from "@/app/lib/definition";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useState, useCallback } from "react";
import { Button } from "@/app/ui/button";
import { State as paragraphState } from "@/app/lib/action";
import { cyrb53 as hasher } from "@/app/lib/util";
import { debounce } from "lodash";

const makeKey = (content: string, index: number) =>
  hasher(`${content}-${index}`);

export default function ParagraphEditor({
  paragraph,
  state,
  formAction,
}: {
  paragraph: Paragraph;
  state: paragraphState;
  formAction: (payload: FormData) => void;
}) {
  const [content, setContent] = useState(paragraph.content);

  console.log(content);

  const handleInputChange = debounce(
    (index: number, event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { value } = event.target;
      const nextCt = [...content];
      nextCt[index] = value;
      setContent(nextCt);
    },
    200
  );

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setContent([...content, ""]);
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
        <div id="paragraph-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.title?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label>content</label>
        {content.map((ct, i) => (
          <div key={makeKey(ct, i)}>
            <input
              id="content"
              name="content"
              defaultValue={ct}
              onChange={(event) => handleInputChange(i, event)}
              placeholder="enter content"
            />
            <Button onClick={(e) => handleRemoveClick(i, e)}>Remove</Button>
          </div>
        ))}
        <Button onClick={(e) => handleAddClick(e)}>Add</Button>
        <div id="paragraph-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.content?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
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
