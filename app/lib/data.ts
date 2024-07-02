import { query } from '@/config/db';
import { 
    Paragraph,
    ParagraphDB,
    sepLetter, 
    ParagraphInPf,
    Portfolio, 
    PortfolioDB, 
    PgInPFDB 
} from './definition';
import { convertDBToPage, sleep } from './util';

export async function fetchUser() {
    const queryText = `SELECT * FROM users`;
    try {
        const user = await query(queryText);

        if (!user?.rows) return {};

        return user.rows[0];
    } catch (error) {
        console.error('fetch User Error :', Error);
        return {};
    }
}

export async function fetchParagraphs() {
    const { convParagraph } = convertDBToPage(); 
    const queryText = `SELECT * FROM paragraphs`;
    try {
        const queryRes = await query(queryText);

        if (!queryRes?.rows) return [];

        const result: Paragraph[] = queryRes.rows.map(
            (res: ParagraphDB) => {
            return convParagraph(res)
        });
        return result;
    } catch (error) {
        console.error('fetch Paragraphs Error :', Error);
        return [];
    }
}

export async function fetchPortfolios() {
    const queryTexts = {
        portfolios: `SELECT * FROM portfolios ORDER BY id`,
        paragraphs: `SELECT * FROM paragraphsinportfolio ORDER BY portfolio_id, id`
    };
    
    try {
        const pfQuery = await query(queryTexts['portfolios']);

        if (!pfQuery?.rows) return [];

        const pgQuery = await query(queryTexts['paragraphs']);

        const portfolios: PortfolioDB[] = pfQuery.rows;

        const paragraphs: PgInPFDB[] = pgQuery.rows;

        const result: Portfolio[] = [];

        let rIdx = 0;

        for (const pf of portfolios) {
            if (rIdx >= paragraphs.length) break;
            const pgInPf: ParagraphInPf[] = [];
            while (rIdx < paragraphs.length) {
                const pg = paragraphs[rIdx];
                if (pg['portfolio_id'] !== pf['id']) break;
                pgInPf.push({
                    intro: pg.intro.split(sepLetter),
                    content: pg.content.split(sepLetter)
                });
                rIdx += 1;
            }
            result.push({
                id: pf['id'],
                title: pf['title'],
                paragraphs: pgInPf
            });
        }

        return result;

    } catch (error) {
        console.error('fetch Portfolios Error :', Error);
        return [];
    }
}

export async function fetchParagraphById(id : string) {
    const { convParagraph } = convertDBToPage(); 
    const queryText = `SELECT * from paragraphs WHERE id = $1`;
    try {
        const queryRes = await query(queryText, [id]);
        return convParagraph(queryRes.rows[0]);
    } catch (error) {
        console.error('fetch Paragrah By #%d is Error', id);
        return null;
    }
}