"use client";

import { updateUser } from "@/app/lib/action";
import { User } from "@/app/lib/definition";
import { useActionState } from "react";
import UserEditor from "../userEditor";

export default function EditUser({ user }: { user: User }) {
  const initialState = { message: "", errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState);

  return <UserEditor user={user} state={state} formAction={formAction} />;
}
