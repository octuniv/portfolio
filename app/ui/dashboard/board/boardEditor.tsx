"use client";

import { HistoryPropertyDiv, Board } from "@/app/lib/definition";
import {
  EditHistoryLink,
  EditTitleLink,
} from "@/app/ui/dashboard/board/boardButtons";
import {
  AddHistory,
  AlignRightButtons,
  DeleteHistory,
} from "@/app/ui/dashboard/buttons";
import { addKeysInBoardProperty } from "@/app/lib/util";
import Link from "next/link";
import { Fragment } from "react";

function BoardDiv({
  histProperty,
  boardId,
}: {
  histProperty: HistoryPropertyDiv;
  boardId: string;
}) {
  const { subtitle, intros, contents, id: histId } = histProperty;
  return (
    <Background key={histId}>
      <h3 className="pb-2 mb-3 mt-0 text-2xl font-medium leading-tight border-b-2 border-lime-950 border-dashed">
        {subtitle}
      </h3>
      <p className="mb-4 leading-tight text-sm">
        {intros.map((it) => (
          <Fragment key={it.key}>
            {it.value}
            <br />
          </Fragment>
        ))}
      </p>
      <p className="mb-4 leading-loose text-xl">
        {contents.map((ct) => (
          <Fragment key={ct.key}>
            {ct.value}
            <br />
          </Fragment>
        ))}
      </p>
      <AlignRightButtons>
        <EditHistoryLink boardId={boardId} historyId={histId} />
        <DeleteHistory boardId={boardId} historyId={histId} />
      </AlignRightButtons>
    </Background>
  );
}

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full realtive bg-slate-50 rounded-3xl p-5 border-2 border-indigo-500">
      {children}
    </div>
  );
}

export default function BoardEditor({ board }: { board: Board }) {
  const historys = addKeysInBoardProperty(board.historys);

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12 pt-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Board Detail
        </h2>
        <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
          This informations create and display the components that you want to
          display.
        </p>
        <Background>
          <h2 className="pb-2 mb-6 mt-0 text-3xl font-medium leading-tight border-b-2 border-lime-950 border-dashed">
            TITLE
          </h2>
          <p className="text-xl font-light">{board.title}</p>
          <AlignRightButtons>
            <EditTitleLink boardId={board.id} />
          </AlignRightButtons>
        </Background>
      </div>
      {historys.map((hist) => (
        <BoardDiv histProperty={hist} boardId={board.id} key={hist.id} />
      ))}
      <AlignRightButtons>
        <AddHistory id={board.id} />
      </AlignRightButtons>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          return
        </Link>
      </div>
    </div>
  );
}
