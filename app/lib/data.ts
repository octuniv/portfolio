import { query } from '@/config/db';
import { 
    Paragraph,
    ParagraphDB,
    sepLetter, 
    ParagraphInPf,
    Portfolio, 
    PortfolioDB, 
    PgInPFDB,
    UserDB
} from './definition';
import { convertDBToPage, convertDBToPfParag, getUserFromDB, sleep } from './util';

export async function fetchUser() {
    const queryText = `SELECT id, name, email, socialsites FROM users`;
    try {
        const user = await query(queryText);
        
        if (!user?.rows) throw Error(`You can't find user information!`);

        return getUserFromDB(user.rows[0] satisfies UserDB);
    } catch (error) {
        console.error('fetch User Error :', Error);
        throw Error;
    }
}

export async function fetchParagraphs() {
    const { convParagraph } = convertDBToPage(); 
    const queryText = `SELECT id, title, content FROM paragraphs ORDER BY sequence ASC`;
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
        portfolios: `SELECT id, title, sequence FROM portfolios ORDER BY id`,
        paragraphs: `SELECT * FROM paragraphsinportfolio ORDER BY portfolio_id, id`
    };
    
    try {
        const pfQuery = await query(queryTexts['portfolios']);

        if (!pfQuery?.rows) return [];

        const pgQuery = await query(queryTexts['paragraphs']);

        const portfolios: PortfolioDB[] = pfQuery.rows;

        const mapIdToSeq: Map<string, number> = portfolios.reduce((acc, cur) => {
            acc.set(cur.id, cur.sequence);
            return acc;
        }, new Map());

        const paragraphs: PgInPFDB[] = pgQuery.rows;

        const result: Portfolio[] = [];

        let rIdx = 0;

        for (const pf of portfolios) {
            // if (rIdx >= paragraphs.length) break;
            const pgInPf: ParagraphInPf[] = [];
            while (rIdx < paragraphs.length) {
                const pg = paragraphs[rIdx];
                if (pg['portfolio_id'] !== pf['id']) break;
                pgInPf.push({
                    id: pg.id,
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

        result.sort((r1, r2) => {
            const sr1 = mapIdToSeq.get(r1.id);
            const sr2 = mapIdToSeq.get(r2.id);
            if (typeof sr1 == 'undefined' || typeof sr2 == 'undefined') {
                throw Error('DB Error...... find undefined Id');
            }
            return sr1 - sr2;
        })

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

export async function fetchPortfolioById(id: string) {
    const pfQuery = `SELECT id, title from portfolios WHERE id = $1`;
    const pgQuery = `SELECT id, intro, content from paragraphsinportfolio WHERE portfolio_id = $1 ORDER BY id`;
    const { convPortfolio } = convertDBToPage();
    try {
        const pfById = await query(pfQuery, [id]);
        if (!pfById) return null;
        const pgById = await query(pgQuery, [id]);
        return convPortfolio(pfById.rows[0], pgById.rows);

    } catch (error) {
        console.error(`fetch Portfolio By #%d is Error`, id);
        return null;
    }
}

export async function fetchPfTitleById(id: string) {
    const queryText = `SELECT title from portfolios WHERE id = $1`;
    try {
        const ret = await query(queryText, [id]);
        if (!ret) return null;
        return ret.rows[0]['title'];
    } catch (error) {
        console.error(`fetch PfTitle By #%d is Error`, id);
        return null;
    }
}

export async function fetchPfParagById(pfId: string, pgId: number) {
    const queryText = `SELECT intro, content from paragraphsinportfolio WHERE portfolio_id = $1 AND id = $2`;

    try {
        const ret = await query(queryText, [pfId, pgId]);
        if (!ret) return null;
        return convertDBToPfParag(ret.rows[0]);
    } catch (error) {
        console.error(`fetch Portfolio paragraph By #%d and #%d is Error`, pfId, pgId);
        return null;
    }
}