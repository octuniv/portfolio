import { query } from "@/config/db";
import {
  Paragraph,
  ParagraphDB,
  Board,
  UserDto,
  BoardDto,
  HistoryPropertyDto,
  User,
} from "./definition";
import {
  httpServerAddress,
  convertDBToPage,
  getUserFromServer,
  getBoardFromServer,
  getHistoryFromServer,
} from "./util";

export async function fetchUser(): Promise<User> {
  const address = httpServerAddress + "/users";
  const data: UserDto[] = await fetch(address).then((res) => res.json());
  return getUserFromServer(data[0]);
}

export async function fetchParagraphs() {
  const { convParagraph } = convertDBToPage();
  const queryText = `SELECT id, title, content FROM paragraphs ORDER BY sequence ASC`;
  try {
    const queryRes = await query(queryText);

    if (!queryRes?.rows) return [];

    const result: Paragraph[] = queryRes.rows.map((res: ParagraphDB) => {
      return convParagraph(res);
    });
    return result;
  } catch (error) {
    console.error("fetch Paragraphs Error :", Error);
    return [];
  }
}

export async function fetchParagraphById(id: string) {
  const { convParagraph } = convertDBToPage();
  const queryText = `SELECT * from paragraphs WHERE id = $1`;
  try {
    const queryRes = await query(queryText, [id]);
    return convParagraph(queryRes.rows[0]);
  } catch (error) {
    console.error("fetch Paragrah By #%d is Error", id);
    return null;
  }
}

export async function fetchBoards(): Promise<Board[]> {
  const address = httpServerAddress + "/boards";
  const data: BoardDto[] = await fetch(address).then((res) => res.json());
  return data.map((boardElem) => getBoardFromServer(boardElem));
}

export async function fetchBoardById(boardId: string): Promise<Board> {
  const address = httpServerAddress + `/boards/board/${boardId}`;
  const data: BoardDto = await fetch(address).then((res) => res.json());
  return getBoardFromServer(data);
}

export async function fetchBoardTitleById(boardId: string) {
  const board = await fetchBoardById(boardId);
  return board.title;
}

export async function fetchHistoryId(boardId: string, historyId: number) {
  const address = httpServerAddress + `/boards/history/${boardId}/${historyId}`;
  const data: HistoryPropertyDto = await fetch(address).then((res) =>
    res.json()
  );
  return getHistoryFromServer(data);
}
