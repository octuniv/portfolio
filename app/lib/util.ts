import {
  Paragraph,
  ParagraphDB,
  HistoryProperty,
  Board,
  sepLetter,
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
    createdAt: boardElem.createdAt,
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

export function convertDBToPage() {
  const convParagraph = (data: ParagraphDB): Paragraph => {
    return {
      id: data.id,
      title: data.title,
      content: data.content.split(sepLetter),
    };
  };

  // const convPortfolio = (
  //   pfData: PortfolioDB,
  //   pgDatas: HistoryPropertyInDB[]
  // ): Board => {
  //   return {
  //     id: pfData.id,
  //     title: pfData.title,
  //     historys: pgDatas.map((pg) => {
  //       return {
  //         id: pg.id,
  //         subtitle: pg.subtitle,
  //         intro: pg.intro.split(sepLetter),
  //         content: pg.content.split(sepLetter),
  //       };
  //     }),
  //   };
  // };

  // return { convParagraph, convPortfolio };
  return { convParagraph };
}

export function convertPageToDB() {
  const convParagraph = (data: Paragraph): ParagraphDB => {
    return {
      id: data.id,
      title: data.title,
      content: data.content.join(sepLetter),
    };
  };

  return { convParagraph };
}

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

// export function convPgBoardDBToRaw(
//   boardInDB: Omit<HistoryPropertyInDB, "portfolio_id">
// ) {
//   const { id, subtitle, intro, content } = boardInDB;
//   return {
//     id: id,
//     subtitle: subtitle,
//     intro: intro.split(sepLetter),
//     content: content.split(sepLetter),
//   } satisfies HistoryProperty;
// }

// export function convPgBoardRawToDB(board: Omit<HistoryProperty, "id">) {
//   const { subtitle, intro, content } = board;
//   return {
//     subtitle: subtitle,
//     intro: intro.join(sepLetter),
//     content: content.join(sepLetter),
//   } satisfies Omit<HistoryPropertyInDB, "portfolio_id" | "id">;
// }

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
