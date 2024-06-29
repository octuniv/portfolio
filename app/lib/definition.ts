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