import { PencilSquareIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

function MakeEdit({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border p-2 block w-10 hover:bg-gray-100"
    >
      <PencilSquareIcon className="w-5" />
    </Link>
  );
}

export function EditTitleLink({ boardId }: { boardId: string }) {
  const href = `/dashboard/edit/board/${boardId}/title`;
  return <MakeEdit href={href} />;
}

export function EditHistoryLink({
  boardId,
  historyId,
}: {
  boardId: string;
  historyId: number;
}) {
  const href = `/dashboard/edit/board/${boardId}/history/${historyId}`;
  return <MakeEdit href={href} />;
}
