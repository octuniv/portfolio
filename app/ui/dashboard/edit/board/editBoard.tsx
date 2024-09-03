"use client";

import { updateHistory } from "@/app/lib/action";
import { useActionState } from "react";
import History from "../../board/history";
import { HistoryProperty } from "@/app/lib/definition";

export default function EditBoard({
  boardId,
  historyId,
  historyProperty,
}: {
  boardId: string;
  historyId: number;
  historyProperty: HistoryProperty;
}) {
  const initialState = { message: "", errors: {} };
  const updateHistoryWithId = updateHistory.bind(null, boardId, historyId);
  const [state, formAction] = useActionState(updateHistoryWithId, initialState);

  return (
    <History
      boardId={boardId}
      historyProperty={historyProperty}
      state={state}
      formAction={formAction}
    />
  );
}
