"use client";
import { User, userKeys } from "@/app/lib/definition";
import { UserState as ErrorState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import { ErrorElem, LineInput } from "@/app/ui/elemInEditor";
import { FocusEvent } from "react";
import Link from "next/link";
import {
  makeAddClick,
  makeInitState,
  makeInputBlur,
  makeRemoveClick,
} from "@/app/lib/eventFactory";

function EditElem({
  elemName,
  defValue,
  onBlur,
}: {
  elemName: string;
  defValue: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div key={elemName} className="my-2">
      <LineInput
        elemName={elemName}
        defValue={defValue}
        placeholder={`enter ${elemName}`}
        onBlur={onBlur}
      />
    </div>
  );
}

export default function UserEditor({
  user,
  state,
  formAction,
}: {
  user: User;
  state: ErrorState;
  formAction: (payload: FormData) => void;
}) {
  const { name, email, phone, socialSites: defSites } = user;

  const [socialSites, setSocialSites] = makeInitState(defSites);
  const handleBlur = makeInputBlur<HTMLInputElement>(
    socialSites,
    setSocialSites
  );
  const handleRemoveClick = makeRemoveClick(setSocialSites);
  const handleAddClick = makeAddClick(socialSites, setSocialSites);

  const returnAddress = "/dashboard";
  return (
    <form action={formAction}>
      <EditElem elemName={"name"} defValue={name} />
      <ErrorElem elemName={"name"} errors={state?.errors?.name} />
      <EditElem elemName={"phone"} defValue={phone} />
      <ErrorElem elemName={"phone"} errors={state?.errors?.phone} />
      <EditElem elemName={"email"} defValue={email} />
      <ErrorElem elemName={"email"} errors={state?.errors?.email} />
      {socialSites.map((site, ind) => (
        <div key={site.key}>
          <EditElem
            elemName={"socialSites"}
            defValue={site.value}
            onBlur={handleBlur(ind)}
          />
          <Button type="button" onClick={handleRemoveClick(ind)}>
            Remove
          </Button>
        </div>
      ))}
      <Button className="my-4" type="button" onClick={handleAddClick}>
        Add
      </Button>
      <ErrorElem elemName={"socialSites"} errors={state?.errors?.socialSites} />
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
