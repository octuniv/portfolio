import { Paragraph as ParagraphType } from "@/app/lib/definition";
import {
  AlignRightButtons,
  CreateParagraph,
  DeleteParagraph,
  EditParagraph,
} from "@/app/ui/dashboard/buttons";

export function ParagraphSkeleton() {
  return <p>Loading Paragraphs......</p>;
}

function ParagraphComponent({ paragraph }: { paragraph: ParagraphType }) {
  const { id, title, content } = paragraph;
  return (
    <div className="my-6">
      <p>title : {title}</p>
      {content.map((c, ind) => (
        <p key={ind}>{c}</p>
      ))}
      <AlignRightButtons>
        <EditParagraph id={id} />
        <DeleteParagraph id={id} />
      </AlignRightButtons>
    </div>
  );
}

export default async function Paragraphs({
  paragraphs,
}: {
  paragraphs: ParagraphType[];
}) {
  return (
    <>
      {paragraphs.map((para) => (
        <ParagraphComponent key={para.id} paragraph={para} />
      ))}
      <AlignRightButtons>
        <CreateParagraph />
      </AlignRightButtons>
    </>
  );
}
