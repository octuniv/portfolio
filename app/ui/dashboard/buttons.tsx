import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export function EditParagraph({ id }: { id : string}) {
    const href = `/dashboard/edit/paragraph/${id}`;
    return (
        <Link
            href={href}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilSquareIcon className="w-5" />
        </Link>
    )
}

export function EditPortfolio({ id }: { id : string}) {
    return (
        <Link
            href={`/dashboard/edit/portfolio/${id}`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilSquareIcon className="w-5" />
        </Link>
    )
}