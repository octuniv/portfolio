import { makeKey } from "../lib/util";

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
