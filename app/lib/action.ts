'use server';

import { z } from "zod";
import { convertPageToDB } from "./util";
import { query, Client } from "@/config/db";
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

export async function deletePortfolio(id: string) {
    const queryParags = `DELETE FROM paragraphsinportfolio WHERE portfolio_id = $1`
    const queryPf= `DELETE FROM portfolios WHERE id = $1`;
    const params = [id];

    const client = Client();

    try {
        await client.connect();
        await client.query('BEGIN');
        await client.query(queryParags, params);
        await client.query(queryPf, params);
        await client.query('COMMIT');
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
    revalidatePath(`/dashboard`);
}



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

export async function createPortfolio() {
    const queryText = `INSERT INTO portfolios (title) values ('NEW')`;

    try {
        await query(queryText);
    } catch (error) {
        console.error('You can`t create portfolio because of db errors' );
        throw error;
    }
    revalidatePath(`/dashboard`);
}

export async function updatePortfolio(id: string, prevState: PortfolioState, formData: FormData) {
    return { message: 'not defined'};
}