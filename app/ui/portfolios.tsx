import { fetchPortfolios } from "../lib/data";
import { ParagraphInPf, Portfolio as PortfolioType } from "../lib/definition";
import EmptyData from "./emptyData";

export function PortfolioSkeleton() {
    return <p>Loading Portfolios......</p>
};

function Paragraph({intro, content}: ParagraphInPf) {
    return (
        <>
            {intro.map((it, ind) => <p key={'intro' + ind}>{it}</p>)}
            {content.map((ct, ind) => <p key={'content' + ind}>{ct}</p>)}
        </>
    );
}

function Portfolio({id, title, paragraphs}: PortfolioType) {
    return (
        <div>
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

    if (!Array.isArray(pfs) || !pfs.length) return <EmptyData />;

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