'use server';

import { z } from "zod";
import { convertPageToDB } from "./util";
import { query } from "@/config/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

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

export type ParagraphState = {
    errors?: {
        title?: string[];
        content?: string[];
    };
    message?: string | null;
};

const EditParagraph = paragraphSchema.omit({ id: true });

export async function updateParagraph(id: string, prevState: ParagraphState, formData: FormData) {
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

export async function createParagraph(prevState: ParagraphState, formData: FormData) {
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

const writing = z.object({
    intro: z.array(
        z.coerce.string()
    ).nonempty({message: `Don't empty intro`}),
    content: z.array(
        z.coerce.string()
    ).nonempty({message: `Don't empty content`}),
    portfolio_id: z.string().min(1)
});

const PortfolioSchema = z.object({
    id: z.string(),
    title: z.coerce
    .string()
    .min(1, { message: `Don't empty title.`}),
    portfolios: z.array(writing)
    .nonempty({message : `Don't you enter your contents?`})
});

export type PortfolioState = {
    errors?: {
        title?: string[];
        paragraphs?: {
            intro?: string[],
            content?: string[]
        };
    };
    message?: string | null;
};

const EditPortfolio = PortfolioSchema.omit({ id: true });

export async function createPortfolio(prevState: PortfolioState, formData: FormData) {
    console.log(formData);
    return { message: 'Incomplete' };
    // const validatedFields = EditPortfolio.safeParse({
    //     title: formData.get('title'),
    //     content: formData.getAll('content').filter((ct) => typeof ct === 'string' && ct.length > 0),
    // });

    // if (!validatedFields.success) {
    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //         message: 'Missing Fields. Failed to create Portfolio.',
    //     }
    // }

    // const id = ''; // Database make id on this paragraph.
    // const { title, content } = validatedFields.data;
    // const { convParagraph } = convertPageToDB();
    // const params = convParagraph({ id, title, content });

    // const queryText = `
    //     INSERT INTO paragraphs (title, content)
    //     VALUES ($1, $2)
    // `;

    // try {
    //     await query(queryText, [params.title, params.content]);
    // } catch (error) {
    //     return { message: 'Database Error: Failed to create paragraph' };
    // }

    // revalidatePath(`/dashboard`);
    // redirect(`/dashboard`);
}