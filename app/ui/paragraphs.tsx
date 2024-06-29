import { fetchParagraphs } from "../lib/data";
import { Paragraph } from "../lib/definition";

function ParagraphComponent({id, title, content} : Paragraph) {
    return (
        <div>
            <p>title : {title}</p>
            {content.map((c, ind) => (
                <p key={ind}>{c}</p>
            ))}
        </div>
    )
}

export default async function Paragraphs() {
    const paras = await fetchParagraphs();

    if (!paras) {
        return (
            <div>
                <p>NO DATA!</p>
            </div>
        )
    }
    
    return (
        <>
            {paras.map((para) => (
                <ParagraphComponent
                    key={para.id} 
                    id={para.id}
                    title={para.title}
                    content={para.content}
                />
            ))}
        </>
    );
}