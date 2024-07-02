'use server';

import { z } from "zod";
import { convertPageToDB } from "./util";
import { query } from "@/config/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const paragraphSchema = z.object({
    id: z.string(),
    title: z.coerce
    .string()
    .min(1, { message: 'Please enter title.'}),
    content: z.array(
        z.coerce.
        string().
        min(1, { message: `Don't empty content space.`})
    )
    .nonempty({message : `Don't you enter your content?`})
});

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
    };
    message?: string | null;
};

const EditParagraph = paragraphSchema.omit({ id: true });

export async function updateParagraph(id: string, prevState: State, formData: FormData) {
    const validatedFields = EditParagraph.safeParse({
        title: formData.get('title'),
        content: formData.getAll('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Paragraph.',
        }
    }

    const { title, content } = validatedFields.data;
    const { convParagraph } = convertPageToDB();
    const params = convParagraph({ id, title, content });

    const queryText = `
        UPDATE paragraphs
        SET title = $1, content = $2
        WHERE id = $3
    `;

    try {
        await query(queryText, [params.title, params.content, params.id]);
    } catch (error) {
        return { message: 'Database Error: Failed to update paragraph' };
    }

    revalidatePath(`/dashboard`);
    redirect(`/dashboard`);
}