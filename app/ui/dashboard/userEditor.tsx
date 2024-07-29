"use client";
import { User, userKeys } from "@/app/lib/definition";
import { UserState as ErrorState } from "@/app/lib/action";
import { Button } from "@/app/ui/buttonComponent";
import { makeKey } from "@/app/lib/util";
import { ErrorElem } from "@/app/ui/elemInEditor";
import React, { useState, FocusEvent, MouseEvent } from "react";
import Link from "next/link";

function EditElem({
  elemName,
  defValue,
  blurFunc,
}: {
  elemName: string;
  defValue: string;
  blurFunc?: (event: FocusEvent<HTMLInputElement>) => void;
}) {
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (blurFunc) {
      blurFunc(event);
    }
  };
  return (
    <div key={elemName} className="my-2">
      <label>{elemName} : </label>
      <input
        id={elemName}
        name={elemName}
        defaultValue={defValue}
        onBlur={onBlur}
        placeholder={`enter ${elemName}`}
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
  const { name, email, socialSites: defSites } = user;
  const [socialSites, setSocialSites] = useState(
    defSites.map((ds, i) => {
      return { value: ds, key: makeKey(i) };
    })
  );

  const handleBlur =
    (index: number) => (event: FocusEvent<HTMLInputElement>) => {
      const { value: target } = event.target;
      const nextSites = [...socialSites];
      nextSites[index]["value"] = target;
      setSocialSites(nextSites);
    };

  const handleRemoveClick = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setSocialSites((oldValues) => oldValues.filter((_, i) => i !== index));
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSocialSites([
      ...socialSites,
      { value: "", key: makeKey(socialSites.length) },
    ]);
  };

  const returnAddress = "/dashboard";
  return (
    <form action={formAction}>
      <EditElem elemName={"name"} defValue={name} />
      <ErrorElem elemName={"name"} errors={state?.errors?.name} />
      <EditElem elemName={"email"} defValue={email} />
      <ErrorElem elemName={"email"} errors={state?.errors?.email} />
      {socialSites.map((site, ind) => (
        <div key={site.key}>
          <EditElem
            elemName={"socialSites"}
            defValue={site.value}
            blurFunc={handleBlur(ind)}
          />
          <Button type="button" onClick={(e) => handleRemoveClick(ind, e)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={(e) => handleAddClick(e)}>
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
