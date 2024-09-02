"use client";

import { BoardTitleState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import { ErrorElem, LineInput } from "@/app/ui/elemInEditor";
import Link from "next/link";

export default function BoardTitle({
  boardId,
  title,
  state,
  formAction,
}: {
  boardId: string;
  title: string;
  state: BoardTitleState;
  formAction: (payload: FormData) => void;
}) {
  const returnAddress = `/dashboard/edit/board/${boardId}`;
  return (
    <form action={formAction}>
      <LineInput elemName="title" defValue={title} placeholder="Enter title" />
      <ErrorElem elemName="pfTitle" errors={state?.errors?.title} />
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
