import { fetchParagraphById } from "@/app/lib/data";
import EditForm from "@/app/ui/dashboard/edit/editParag";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const paragraph = await fetchParagraphById(id);
    if (!paragraph) notFound();

    return (
        <main>
            <EditForm paragraph={paragraph}/>
        </main>
    );
}