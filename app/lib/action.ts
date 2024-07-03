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
    .min(1, { message: `Don't empty title.`}),
    content: z.array(
        z.coerce.
        string()
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
        content: formData.getAll('content').filter((ct) => typeof ct === 'string' && ct.length > 0),
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

export async function createParagraph(prevState: State, formData: FormData) {
    const validatedFields = EditParagraph.safeParse({
        title: formData.get('title'),
        content: formData.getAll('content').filter((ct) => typeof ct === 'string' && ct.length > 0),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Paragraph.',
        }
    }

    const id = ''; // Database make id on this paragraph.
    const { title, content } = validatedFields.data;
    const { convParagraph } = convertPageToDB();
    const params = convParagraph({ id, title, content });

    const queryText = `
        INSERT INTO paragraphs (title, content)
        VALUES ($1, $2)
    `;

    try {
        await query(queryText, [params.title, params.content]);
    } catch (error) {
        return { message: 'Database Error: Failed to create paragraph' };
    }

    revalidatePath(`/dashboard`);
    redirect(`/dashboard`);
}

export async function deleteParagraph(id: string) {
    const queryText = `DELETE FROM paragraphs WHERE id = $1`;
    const params = [id];

    try {
        await query(queryText, params);
    } catch (error) {
        console.error('Database Error : Failed to delete paragraph');
        throw Error;
    }
    revalidatePath(`/dashboard`);
}