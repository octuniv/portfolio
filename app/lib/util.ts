import { 
    Paragraph, 
    ParagraphDB, 
    ParagraphInPf, 
    PgInPFDB,
    Portfolio,
    PortfolioDB, 
    sepLetter 
} from "@/app/lib/definition";

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const cyrb53 = (str: String, seed = 0) => {
    // this code is from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export function convertDBToPage() {
    const convParagraph = (data : ParagraphDB): Paragraph => {
        return {
            id: data.id,
            title: data.title,
            content: data.content.split(sepLetter)
        };
    };

    const convPortfolio = (pfData: PortfolioDB, pgDatas: PgInPFDB[]): Portfolio => {
        return {
            id: pfData.id,
            title: pfData.title,
            paragraphs: pgDatas.map(pg => {
                return {
                    id: pg.id,
                    intro: pg.intro.split(sepLetter),
                    content: pg.content.split(sepLetter)
                }
            })
        }
    }

    return { convParagraph, convPortfolio };
}

export function convertPageToDB() { 
    const convParagraph = (data : Paragraph): ParagraphDB => {
        return {
            id: data.id,
            title: data.title,
            content: data.content.join(sepLetter)
        }
    }

    return { convParagraph };
}

export function convertDBToPfParag(
    {
        intro,
        content
    } :
    {
        intro: string,
        content: string
    }
) {
    return {
        intro: intro.split(sepLetter),
        content: content.split(sepLetter)
    };
}

export function convertPfParagToDB(
    {
        intro,
        content
    } :
    {
        intro: string[],
        content: string[]
    }
) {
    return {
        intro: intro.join(sepLetter),
        content: content.join(sepLetter)
    }
}

export const makeKey = (index: number) => String(Date.now() * 10 + index);