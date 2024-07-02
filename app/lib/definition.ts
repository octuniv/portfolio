export const sepLetter = '^|^';

export type User = {
    id: string,
    name: string,
    email: string,
    address: string,
    phone: string
};

export type Paragraph = {
    id: string,
    title: string,
    content: string[]
};

export type ParagraphInPf = {
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
    title: string
}

export type PgInPFDB = {
    id: number,
    intro: string,
    content: string,
    portfolio_id: string
}