import { fetchParagraphs } from "../lib/data";
import { Paragraph } from "../lib/definition";

export function ParagraphSkeleton() {
    return (
        <p>Loading Paragraphs......</p>
    )
}

function ParagraphComponent({id, title, content} : Paragraph) {
    return (
        <div className="my-6">
            <p>title : {title}</p>
            {content.map((c, ind) => (
                <p key={ind}>{c}</p>
            ))}
        </div>
    )
}

export default async function Paragraphs() {
    const paras = await fetchParagraphs();
    
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