import { query } from '@/config/db';
import { Paragraph, sepLetter } from './definition';
import { sleep } from './util';

export async function fetchUser() {
    const queryText = `SELECT * FROM users`;
    try {
        const user = await query(queryText);
        return user.rows[0];
    } catch (error) {
        console.error('fetch User Error :', Error);
    }
}

export async function fetchParagraphs() {
    const queryText = `SELECT * FROM paragraphs`;
    try {
        const queryRes = await query(queryText);
        const result: Paragraph[] = queryRes.rows.map(
            (res: { id: string; title: string; content: string; }) => {
            return {
                id: res.id,
                title: res.title,
                content: res.content.split(sepLetter)
            }
        });
        return result;
    } catch (error) {
        console.error('fetch Paragraphs Error :', Error);
    }
}