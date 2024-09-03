import {
  Paragraph,
  ParagraphDto,
  Board,
  UserDto,
  BoardDto,
  HistoryPropertyDto,
  User,
} from "./definition";
import {
  httpServerAddress,
  getUserFromServer,
  getBoardFromServer,
  getHistoryFromServer,
  getParagraphFromServer,
  compareByCreateAtTime,
} from "./util";

export async function fetchUser(): Promise<User> {
  const address = httpServerAddress + "/users";
  const data: UserDto[] = await fetch(address).then((res) => res.json());
  return getUserFromServer(data[0]);
}

export async function fetchParagraphs(): Promise<Paragraph[]> {
  const address = httpServerAddress + "/paragraphs";
  const data: ParagraphDto[] = await fetch(address).then((res) => res.json());
  return data.map((paragDto: ParagraphDto) => getParagraphFromServer(paragDto)).sort(compareByCreateAtTime);
}

export async function fetchParagraphById(id: string) {
  const address = httpServerAddress + `/paragraphs/${id}`;
  const data: ParagraphDto = await fetch(address).then((res) => res.json());
  return getParagraphFromServer(data);
}

export async function fetchBoards(): Promise<Board[]> {
  const address = httpServerAddress + "/boards";
  const data: BoardDto[] = await fetch(address).then((res) => res.json());
  return data.map((boardElem) => getBoardFromServer(boardElem)).sort(compareByCreateAtTime);
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
