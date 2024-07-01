import { ParagraphInPf, PgInDB, sepLetter } from "./definition";

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function pgDBToPg(pg: PgInDB): ParagraphInPf {
    return {
        intro: pg['intro'].split(sepLetter),
        content: pg['content'].split(sepLetter)
    }
}