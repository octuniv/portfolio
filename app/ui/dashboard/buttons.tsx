import {
  addPfParagraph,
  createParagraph,
  createPortfolio,
  deleteParagraph,
  deletePfParagraph,
  deletePortfolio,
} from "@/app/lib/action";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function MakeEditButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border p-2 block w-[2.375rem] hover:bg-gray-100"
    >
      <PencilSquareIcon className="w-5" />
    </Link>
  );
}

function MakeFormButton({
  action,
  ButtonShape,
}: {
  action: () => Promise<void>;
  ButtonShape: () => JSX.Element;
}) {
  return (
    <form action={action}>
      <ButtonShape />
    </form>
  );
}

function MakeCreateButton({ action }: { action: () => Promise<void> }) {
  const createButton = () => (
    <button className="size-[2.375rem] rounded-md border p-2 transition-colors hover:bg-gray-100">
      <PlusIcon className="w-5" />
    </button>
  );
  return <MakeFormButton action={action} ButtonShape={createButton} />;
}

function DeleteButtonShape() {
  return (
    <button className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}

export function EditParagraph({ id }: { id: string }) {
  const href = `/dashboard/edit/paragraph/${id}`;
  return <MakeEditButton href={href} />;
}

export function CreateParagraph() {
  return <MakeCreateButton action={createParagraph} />;
}

export function DeleteParagraph({ id }: { id: string }) {
  const deleteParagraphWithId = deleteParagraph.bind(null, id);
  return (
    <MakeFormButton
      action={deleteParagraphWithId}
      ButtonShape={DeleteButtonShape}
    />
  );
}

export function EditPortfolio({ id }: { id: string }) {
  const href = `/dashboard/edit/portfolio/${id}`;
  return <MakeEditButton href={href} />;
}

export function CreatePortfolio() {
  return <MakeCreateButton action={createPortfolio} />;
}

export function DeletePortfolio({ id }: { id: string }) {
  const deletePortfolioWithId = deletePortfolio.bind(null, id);
  return (
    <MakeFormButton
      action={deletePortfolioWithId}
      ButtonShape={DeleteButtonShape}
    />
  );
}

export function AddPfParagraph({ id }: { id: string }) {
  const AddPfParagraphWithId = addPfParagraph.bind(null, id);
  const addButton = () => (
    <button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Add Board</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </button>
  );
  return (
    <MakeFormButton action={AddPfParagraphWithId} ButtonShape={addButton} />
  );
}

export function DeletePfParagraph({
  pfId,
  pgId,
}: {
  pfId: string;
  pgId: number;
}) {
  const deletePfParagraphWithId = deletePfParagraph.bind(null, pfId, pgId);
  return (
    <MakeFormButton
      action={deletePfParagraphWithId}
      ButtonShape={DeleteButtonShape}
    />
  );
}

export function EditUser() {
  const href = `/dashboard/edit/user`;
  return <MakeEditButton href={href} />;
}

export function AlignRightButtons({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-6 p-2 mr-2">{children}</div>;
}
