"use client";

import { PfTitleState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import Link from "next/link";

export default function PortfolioTitle({
  id,
  title,
  state,
  formAction,
}: {
  id: string;
  title: string;
  state: PfTitleState;
  formAction: (payload: FormData) => void;
}) {
  const returnAddress = `/dashboard/edit/portfolio/${id}`;
  return (
    <form action={formAction}>
      <label>title</label>
      <input id="title" name="title" defaultValue={title} />
      <div id="pfTitle-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.title?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
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
