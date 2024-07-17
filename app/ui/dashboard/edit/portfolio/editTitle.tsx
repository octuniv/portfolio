"use client";

import { updatePfTitle } from "@/app/lib/action";
import { useActionState } from "react";
import PortfolioTitle from "../../portfolio/portfolioTitle";

export default function EditTitle({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const initialState = { message: "", errors: {} };
  const updatePfTitleWithId = updatePfTitle.bind(null, id);
  const [state, formAction] = useActionState(updatePfTitleWithId, initialState);

  return (
    <PortfolioTitle
      id={id}
      title={title}
      state={state}
      formAction={formAction}
    />
  );
}
