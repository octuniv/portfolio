"use client";

import { updatePfParag } from "@/app/lib/action";
import { useActionState } from "react";
import PortfolioBoard from "../../portfolio/portfolioBoard";
import { ParagraphBoard } from "@/app/lib/definition";

export default function EditBoard({
  pfId,
  pgId,
  paragraphBoard,
}: {
  pfId: string;
  pgId: number;
  paragraphBoard: ParagraphBoard;
}) {
  const initialState = { message: "", errors: {} };
  const updatePfParagWithId = updatePfParag.bind(null, pfId, pgId);
  const [state, formAction] = useActionState(updatePfParagWithId, initialState);

  return (
    <PortfolioBoard
      pfId={pfId}
      pgId={pgId}
      paragraphBoard={paragraphBoard}
      state={state}
      formAction={formAction}
    />
  );
}
