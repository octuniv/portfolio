import { deleteParagraph } from "@/app/lib/action";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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

export function CreateParagraph() {
    const href = `/dashboard/create/paragraph`;
    return (
        <Link
            href={href}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Paragraph</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    )
}

export function DeleteParagraph({ id } : { id : string } ) {
    const deleteParagraphWithId = deleteParagraph.bind(null, id);
    return (
        <form action={deleteParagraphWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function EditPortfolio({ id }: { id : string}) {
    const href = `/dashboard/edit/portfolio/${id}`;
    return (
        <Link
            href={href}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilSquareIcon className="w-5" />
        </Link>
    )
}