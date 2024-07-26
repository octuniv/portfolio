import { 
    Paragraph, 
    ParagraphDB, 
    ParagraphBoard, 
    ParagraphBoardInDB,
    Portfolio,
    PortfolioDB, 
    sepLetter, 
    User, 
    UserDB,
    ParagraphBoardDiv
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

    const convPortfolio = (pfData: PortfolioDB, pgDatas: ParagraphBoardInDB[]): Portfolio => {
        return {
            id: pfData.id,
            title: pfData.title,
            paragraphs: pgDatas.map(pg => {
                return {
                    id: pg.id,
                    subtitle: pg.subtitle,
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

export function convParagBoardsToDivs(paragBoards : ParagraphBoard[]) {
    return paragBoards.map((pgBoard) => (
        {
            id: pgBoard.id,
            subtitle: pgBoard.subtitle,
            intro: pgBoard.intro.map((int, ind) => (
                {
                    value : int,
                    key: `intro${makeKey(ind)}`,
                }
            )),
            content: pgBoard.content.map((ct, ind) => (
                {
                    value: ct,
                    key: `content${makeKey(ind)}`,
                }
            ))
        } satisfies ParagraphBoardDiv
    ));
}

export function convPgBoardDBToRaw(boardInDB: Omit<ParagraphBoardInDB, "portfolio_id">) {
    const { id, subtitle, intro, content} = boardInDB;
    return {
        id: id,
        subtitle: subtitle,
        intro: intro.split(sepLetter),
        content: content.split(sepLetter)
    } satisfies ParagraphBoard;
}

export function convPgBoardRawToDB(board: Omit<ParagraphBoard, "id">) {
    const { subtitle, intro, content } = board;
    return {
        subtitle: subtitle,
        intro: intro.join(sepLetter),
        content: content.join(sepLetter)
    } satisfies Omit<ParagraphBoardInDB, "portfolio_id" | "id">
}

export const makeKey = (index: number) => String(Date.now() * 10 + index);

export function getUserFromDB(userDB: UserDB) : User {
    return {
        id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        socialSites : userDB.socialsites.split(sepLetter)
    };
}

export function sendUserToDB(user: Omit<User, "id">) : Omit<UserDB, "id"> {
    return {
        name: user.name,
        email: user.email,
        socialsites: user.socialSites.join(sepLetter) || ''
    }
}