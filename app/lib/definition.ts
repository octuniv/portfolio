export const sepLetter = "^|^";

export const userKeys = ["name", "email", "phone", "socialSites"] as const;

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialSites: string[];
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialSites: SocialSiteDto[];
};

export type SocialSiteDto = {
  id?: number;
  url: string;
  user_id?: string;
};

export type Paragraph = {
  id: string;
  title: string;
  content: string[];
};

export type ParagraphDB = {
  id: string;
  title: string;
  content: string;
};

export type HistoryProperty = {
  id: number;
  board_id: string;
  subtitle: string;
  intros: string[];
  contents: string[];
};

export type HistoryPropertyDto = Omit<
  HistoryProperty,
  "intros" | "contents"
> & {
  intros: (HistoryPropDBInfo & {
    intro: string;
  })[];
  contents: (HistoryPropDBInfo & {
    content: string;
  })[];
};

type HistoryPropDBInfo = {
  id: number;
  history_id: number;
};

export type Board = {
  id: string;
  title: string;
  createdAt: string;
  historys: HistoryProperty[];
};

export type BoardDto = Omit<Board, "historys"> & {
  historys: HistoryPropertyDto[];
};

type ValueWithKey = {
  value: string;
  key: string;
};

export type HistoryPropertyDiv = Omit<
  HistoryProperty,
  "intros" | "contents"
> & {
  intros: ValueWithKey[];
  contents: ValueWithKey[];
};
