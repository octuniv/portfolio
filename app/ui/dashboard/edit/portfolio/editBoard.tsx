"use client";

import { updatePfParag } from "@/app/lib/action";
import { useActionState } from "react";
import PortfolioBoard from "../../portfolio/portfolioBoard";

export default function EditBoard({
  pfId,
  pgId,
  intro,
  content,
}: {
  pfId: string;
  pgId: number;
  intro: string[];
  content: string[];
}) {
  const initialState = { message: "", errors: {} };
  const updatePfParagWithId = updatePfParag.bind(null, pfId, pgId);
  const [state, formAction] = useActionState(updatePfParagWithId, initialState);

  return (
    <PortfolioBoard
      pfId={pfId}
      pgId={pgId}
      intro={intro}
      content={content}
      state={state}
      formAction={formAction}
    />
  );
}
