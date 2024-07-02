import { fetchParagraphById } from "@/app/lib/data";
import { Paragraph } from "@/app/lib/definition";
import Form from "@/app/ui/dashboard/edit/edit-parag";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const paragraph = await fetchParagraphById(id);
    if (!paragraph) notFound();

    return (
        <main>
            <Form paragraph={paragraph}/>
        </main>
    );
}