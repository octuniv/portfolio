"use client";

import { makeKey } from "@/app/lib/util";
import { FocusEvent, Fragment } from "react";

export function ErrorElem({
  elemName,
  errors,
}: {
  elemName: string;
  errors: string[] | undefined;
}) {
  if (!errors) return <></>;

  return (
    <>
      {errors.map((err, ind) => (
        <div
          key={makeKey(ind)}
          id={`${elemName}-error`}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 text-sm text-red-500" key={err}>
            {err}
          </p>
        </div>
      ))}
    </>
  );
}

export function TitleInput({
  elemName,
  defValue,
  placeholder,
}: {
  elemName: string;
  defValue: string;
  placeholder: string;
}) {
  return (
    <>
      <label
        htmlFor={elemName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {elemName}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            name={elemName}
            id={elemName}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            defaultValue={defValue}
          />
        </div>
      </div>
    </>
  );
}

export function ContentInput({
  elemName,
  defValue,
  placeholder,
  onBlur,
}: {
  elemName: string;
  defValue: string;
  placeholder: string;
  onBlur: (ev: FocusEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      <label
        htmlFor={elemName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Content
      </label>
      <div className="mt-2">
        <textarea
          id={elemName}
          name={elemName}
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={defValue}
          placeholder={placeholder}
          onBlur={onBlur}
        ></textarea>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Write a few sentences about yourself.
      </p>
    </>
  );
}

export function CrlfLines({ lines }: { lines: string }) {
  return (
    <>
      {lines.split(/(?:\r\n|\r|\n)/g).map((line, ind) => (
        <Fragment key={ind}>
          {line}
          <br />
        </Fragment>
      ))}
    </>
  );
}
