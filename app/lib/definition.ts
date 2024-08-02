export const sepLetter = "^|^";

export const userKeys = ["name", "email", "phone", "socialSites"] as const;

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialSites: string[];
};

export type UserDB = {
  id: string;
  name: string;
  email: string;
  phone: string;
  socialsites: string;
};

export type Paragraph = {
  id: string;
  title: string;
  content: string[];
};

export type ParagraphBoard = {
  id: number;
  subtitle: string;
  intro: string[];
  content: string[];
};

type StringHasKey = {
  value: string;
  key: string;
};

export type ParagraphBoardDiv = Omit<ParagraphBoard, "intro" | "content"> & {
  intro: StringHasKey[];
  content: StringHasKey[];
};

export type ParagraphBoardInDB = {
  id: number;
  subtitle: string;
  intro: string;
  content: string;
  portfolio_id: string;
};

export type ParagraphDB = {
  id: string;
  title: string;
  content: string;
};

export type Portfolio = {
  id: string;
  title: string;
  paragraphs: ParagraphBoard[];
};

export type PortfolioDB = {
  id: string;
  title: string;
  sequence: number;
};
