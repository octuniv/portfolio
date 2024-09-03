export const userKeys = ["name", "email", "phone", "socialSites"] as const;

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialSites: string[];
};

export type UserDto = Omit<User, "socialSites"> & {
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
  createAt: string;
  posts: string[];
};

export type ParagraphDto = Omit<Paragraph, "posts"> & {
  posts: PostDto[];
};

type PostDto = {
  id: number;
  post: string;
  parag_id: string;
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
  createAt: string;
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
