import {
  Paragraph,
  ParagraphDto,
  HistoryProperty,
  Board,
  User,
  UserDto,
  HistoryPropertyDiv,
  BoardDto,
  HistoryPropertyDto,
} from "@/app/lib/definition";

import { config } from "dotenv";

config();

export const httpServerAddress = `${process.env.HTTP_SERVER_URL}`;

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getBoardFromServer = (boardElem: BoardDto) => {
  return {
    id: boardElem.id,
    title: boardElem.title,
    createAt: boardElem.createAt,
    historys: boardElem.historys.map((histElem) =>
      getHistoryFromServer(histElem)
    ),
  } satisfies Board;
};

export const getHistoryFromServer = (histElem: HistoryPropertyDto) => {
  return {
    id: histElem.id,
    board_id: histElem.board_id,
    subtitle: histElem.subtitle,
    intros: histElem.intros.map((introElem) => introElem.intro),
    contents: histElem.contents.map((cntElem) => cntElem.content),
  } satisfies HistoryProperty;
};

export const getParagraphFromServer = (paragElem: ParagraphDto) => {
  return {
    ...paragElem,
    posts: paragElem.posts.map((post) => post.post),
  } satisfies Paragraph;
};

export function addKeysInBoardProperty(boards: HistoryProperty[]) {
  return boards.map(
    (board) =>
      ({
        id: board.id,
        subtitle: board.subtitle,
        board_id: board.board_id,
        intros: board.intros.map((int, ind) => ({
          value: int,
          key: `intro${makeKey(ind)}`,
        })),
        contents: board.contents.map((ct, ind) => ({
          value: ct,
          key: `content${makeKey(ind)}`,
        })),
      }) satisfies HistoryPropertyDiv
  );
}

export const makeKey = (index: number) => String(Date.now() * 10 + index);

export function getUserFromServer(userDto: UserDto): User {
  return {
    id: userDto.id,
    name: userDto.name,
    email: userDto.email,
    phone: userDto.phone,
    socialSites: userDto.socialSites.map((site) => site.url),
  };
}
