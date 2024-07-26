"use client";
import { useContext } from "react";
import { ButtonVisibleContext } from "@/app/context/ButtonVisibleContext";
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

export function HiddenableButtons({ children }: { children: React.ReactNode }) {
  const { visible } = useContext(ButtonVisibleContext);
  if (visible) return <>{children}</>;
  else return <></>;
}

export function VisibleToggleButton() {
  const { visible, toggleVisible } = useContext(ButtonVisibleContext);
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={visible}
            onChange={toggleVisible}
            className="sr-only"
          />
          <div className="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
          <div className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition">
            <span className="active hidden">
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
            <span className="inactive text-body-color">
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </label>
    </>
  );
}
