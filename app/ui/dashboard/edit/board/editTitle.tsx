"use client";

import { updateBoardTitle } from "@/app/lib/action";
import { useActionState } from "react";
import BoardTitle from "../../board/boardTitle";

export default function EditTitle({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}) {
  const initialState = { message: "", errors: {} };
  const updateBoardTitleWithId = updateBoardTitle.bind(null, boardId);
  const [state, formAction] = useActionState(
    updateBoardTitleWithId,
    initialState
  );

  return (
    <BoardTitle
      boardId={boardId}
      title={title}
      state={state}
      formAction={formAction}
    />
  );
}
