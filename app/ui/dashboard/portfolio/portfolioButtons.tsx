import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

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

export function EditTitle({ id }: { id: string }) {
  const href = `/dashboard/edit/portfolio/${id}/title`;
  return <MakeEdit href={href} />;
}

export function EditParagraph({ id, pgId }: { id: string; pgId: number }) {
  const href = `/dashboard/edit/portfolio/${id}/paragraph/${pgId}`;
  return <MakeEdit href={href} />;
}
