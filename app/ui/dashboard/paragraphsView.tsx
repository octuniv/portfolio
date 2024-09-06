import { Paragraph as ParagraphType } from "@/app/lib/definition";
import {
  AlignRightButtons,
  CreateParagraph,
  DeleteParagraph,
  EditParagraph,
} from "@/app/ui/dashboard/buttons";
import { CrlfLines, Title } from "@/app/ui/elemInEditor";

export function ParagraphSkeleton() {
  return <p>Loading Paragraphs......</p>;
}

function ParagraphComponent({ paragraph }: { paragraph: ParagraphType }) {
  const { id, title, posts } = paragraph;

  return (
    <div className="relative rounded-3xl bg-emerald-50 pl-8 py-2">
      <Title title={title} />
      {posts.map((post, ind) => (
        <article className="mt-2 mb-4 mr-3 text-sm text-zinc-700" key={ind}>
          <CrlfLines lines={post} key={ind} />
        </article>
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
        <section className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {paragraphs.map((para) => (
            <ParagraphComponent key={para.id} paragraph={para} />
          ))}
        </section>
      </div>
      <AlignRightButtons>
        <CreateParagraph />
      </AlignRightButtons>
    </>
  );
}
