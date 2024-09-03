"use client";

import { Paragraph } from "@/app/lib/definition";
import { Button } from "@/app/ui/buttonComponent";
import { ParagraphState as ErrorState } from "@/app/lib/action";
import { TextAreaInput, ErrorElem, LineInput } from "@/app/ui/elemInEditor";
import Link from "next/link";
import {
  makeAddClick,
  makeInitState,
  makeInputBlur,
  makeRemoveClick,
} from "@/app/lib/eventFactory";

export default function ParagraphEditor({
  paragraph,
  state,
  formAction,
}: {
  paragraph: Paragraph;
  state: ErrorState;
  formAction: (payload: FormData) => void;
}) {
  const [posts, setPosts] = makeInitState(paragraph.posts);
  const handleInputBlur = makeInputBlur<HTMLTextAreaElement>(posts, setPosts);
  const handleRemoveClick = makeRemoveClick(setPosts);
  const handleAddClick = makeAddClick(posts, setPosts);

  return (
    <form action={formAction}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile Detail
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information creates and displays the components that you want
            to display.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <LineInput
                elemName="title"
                defValue={paragraph.title}
                placeholder="Enter your title"
              />
            </div>
          </div>
          <ErrorElem elemName="title" errors={state?.errors?.title} />
        </div>
      </div>
      <div className="space-y-12">
        {posts.map((post, ind) => (
          <div key={post["key"]}>
            <TextAreaInput
              elemName="post"
              defValue={post["value"]}
              placeholder="Enter your post"
              onBlur={handleInputBlur(ind)}
            />
            <Button type="button" onClick={handleRemoveClick(ind)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddClick}>
          Add
        </Button>
        <ErrorElem elemName="content" errors={state?.errors?.posts} />
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
