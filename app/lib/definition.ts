export const sepLetter = '^|^';

export const userKeys =  ['name', 'email', 'socialSites'] as const;

export type User = {
    id : string,
    name: string,
    email: string,
    socialSites: string[]
};

export type UserDB = {
    id: string,
    name: string,
    email: string,
    socialsites: string
}

export type Paragraph = {
    id: string,
    title: string,
    content: string[]
};

export type ParagraphInPf = {
    id: number,
    subtitle: string,
    intro: string[],
    content: string[]
};

export type ParagraphDB = {
    id: string,
    title: string,
    content: string
}

export type Portfolio = {
    id: string,
    title: string,
    paragraphs: ParagraphInPf[]
};

export type PortfolioDB = {
    id: string,
    title: string,
    sequence: number
}

export type PgInPFDB = {
    id: number,
    subtitle: string,
    intro: string,
    content: string,
    portfolio_id: string
}