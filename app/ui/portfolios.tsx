import { fetchPortfolios } from "../lib/data";
import { ParagraphInPf, Portfolio as PortfolioType } from "../lib/definition";

export function PortfolioSkeleton() {
    return <p>Loading Portfolios......</p>
};

function Paragraph({intro, content}: ParagraphInPf) {
    return (
        <div className="my-6">
            {intro.map((it, ind) => <p key={'intro' + ind}>{it}</p>)}
            {content.map((ct, ind) => <p key={'content' + ind}>{ct}</p>)}
        </div>
    );
}

function Portfolio({id, title, paragraphs}: PortfolioType) {
    return (
        <div className="my-6">
            <p>title:{title}</p>
            {paragraphs.map((pg, ind) => (
                <Paragraph 
                    key={ind}
                    intro={pg['intro']}
                    content={pg['content']}
                />
            ))}
        </div>
    )
}

export default async function Portfolios() {
    const pfs = await fetchPortfolios();

    return (
        <>
            {pfs.map((pf, ind) => (
                <Portfolio 
                    key={ind}
                    id={pf['id']}
                    title={pf['title']}
                    paragraphs={pf['paragraphs']}
                />
            ))}
        </>
    );
}