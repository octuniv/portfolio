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
  const { id, title, content: contents } = paragraph;
  return (
    <div className="relative rounded-3xl bg-emerald-50">
      <dt>
        <p className="font-heading mt-2 ml-8 text-lg leading-6 font-bold text-gray-700">
          {title}
        </p>
      </dt>
      {contents.map((content, ind) => (
        <dd className="mt-2 ml-12 text-base text-zinc-700" key={ind}>
          {content}
        </dd>
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
      <div className="mt-10 mr-2">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {paragraphs.map((para) => (
            <ParagraphComponent key={para.id} paragraph={para} />
          ))}
        </dl>
      </div>
      <AlignRightButtons>
        <CreateParagraph />
      </AlignRightButtons>
    </>
  );
}
