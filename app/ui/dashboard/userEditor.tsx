import { User, userKeys } from "@/app/lib/definition";
import { UserState as ErrorState } from "@/app/lib/action";
import { Button } from "@/app/ui/button";
import Link from "next/link";

export default function UserEditor({
  user,
  state,
  formAction,
}: {
  user: User;
  state: ErrorState;
  formAction: (payload: FormData) => void;
}) {
  const returnAddress = "/dashboard";
  return (
    <form action={formAction}>
      {userKeys.map((key) => (
        <>
          <label>{key} : </label>
          <input
            id={key}
            name={key}
            defaultValue={user[key]}
            placeholder={`enter ${key}`}
          />
          <div id={`${key}-error`} aria-live="polite" aria-atomic="true">
            {state?.errors?.[key]?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
          <br />
        </>
      ))}
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
