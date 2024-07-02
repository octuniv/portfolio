import { 
    Paragraph, 
    ParagraphDB, 
    ParagraphInPf, 
    PgInPFDB, 
    sepLetter 
} from "@/app/lib/definition";

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function convertDBToPage() {
    const convParagraph = (data : ParagraphDB): Paragraph => {
        return {
            id: data.id,
            title: data.title,
            content: data.content.split(sepLetter)
        };
    };

    return { convParagraph };
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