'use server';

import { z } from "zod";
import { convertPageToDB, convertPfParagToDB, sendUserToDB } from "./util";
import { query, Client } from "@/config/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User, userKeys } from "./definition";

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

export async function createParagraph() {
    const queryText = `INSERT INTO paragraphs (title, content) values ('NEW', 'NEW')`;

    try {
        await query(queryText);
    } catch (error) {
        console.error('You can`t create paragraph because of db errors' );
        throw error;
    }
    revalidatePath(`/dashboard`);
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

export async function addPfParagraph(id : string) {
    const queryText = `INSERT INTO paragraphsinportfolio (intro, content, portfolio_id) values ('NEW', 'NEW', $1)`;

    try {
        await query(queryText, [id]);
    } catch (error) {
        console.error('You can`t Add PfParagraph because of db errors' );
        throw error;
    }
    revalidatePath(`/dashboard/edit/portfolio/${id}`);
}

export type PfTitleState = {
    errors?: {
        title?: string[];
    };
    message?: string | null;
};

const PfTitleSchema = z.object({
    id: z.string(),
    title: z.coerce.
    string().
    min(1, { message: `Don't empty title.`}),
});

const EditPfTitle = PfTitleSchema.omit({ id: true });

export async function updatePfTitle(pfId: string, prevState: PfTitleState, formData: FormData) {
    const validatedFields = EditPfTitle.safeParse({
        title: formData.get('title'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update PfTitle.',
        }
    }

    const { title } = validatedFields.data;

    const queryText = `
        UPDATE portfolios
        SET title = $1
        WHERE id = $2
    `;

    try {
        await query(queryText, [title, pfId]);
    } catch (error) {
        return { message: 'Database Error: Failed to update PfTitle' };
    }

    const returnAddress = `/dashboard/edit/portfolio/${pfId}`;

    revalidatePath(returnAddress);
    redirect(returnAddress);
    
}

export type PfParagState = {
    errors?: {
        intro?: string[];
        content?: string[];
    };
    message?: string | null;
}

const PfParagSchema = z.object({
    pfId: z.string(),
    pgId: z.number(),
    intro: z.array(
        z.coerce.
        string()
    )
    .nonempty({message : `Don't you enter your intro?`}),
    content: z.array(
        z.coerce.
        string()
    )
    .nonempty({message : `Don't you enter your content?`})
});

const EditPfParag = PfParagSchema.omit({ pfId: true, pgId: true });

export async function updatePfParag(pfId: string, pgId: number, prevState: PfParagState, formData : FormData) {
    const validatedFields = EditPfParag.safeParse({
        intro: formData.getAll('intro').filter((i) => typeof i === 'string' && i.length > 0),
        content: formData.getAll('content').filter((ct) => typeof ct === 'string' && ct.length > 0),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update PfParagraph.',
        }
    }

    const params = convertPfParagToDB(validatedFields.data);

    const queryText = `
        UPDATE paragraphsinportfolio
        SET intro = $1, content = $2
        WHERE id = $3 AND portfolio_id = $4
    `;

    try {
        await query(queryText, [params.intro, params.content, pgId, pfId]);
    } catch (error) {
        return { message: 'Database Error: Failed to update PfParag' };
    }

    const returnAddress = `/dashboard/edit/portfolio/${pfId}`;

    revalidatePath(returnAddress);
    redirect(returnAddress);
}

export async function deletePfParagraph(pfId: string, pgId: number) {
    const queryText = `DELETE FROM paragraphsinportfolio WHERE portfolio_id = $1 AND id = $2`;
    try {
        await query(queryText, [pfId, pgId]);
    } catch (error) {
        console.error('Error deleting paragraph in portfolio:', error);
        throw error;
    }
    const returnAddress = `/dashboard/edit/portfolio/${pfId}`;
    revalidatePath(returnAddress);
}

type UserOmitId = Omit<User, "id">;

export type UserState = {
    errors?: {
        [key in keyof UserOmitId]?: string[];
    };
    message?: string | null;
}

const UserSchema = z.object({
    name: z.coerce.string().min(1, { message : "Do not empty your name"}),
    email : z.coerce.string().email({ message : "Keep the email format"}),
    socialSites : z.array(z.coerce.string()).nonempty({ message: "Enter your socialSites."})
});

export async function updateUser(id: string, prevState: UserState, formData: FormData) {
    const validatedFields = UserSchema.safeParse({
        name : formData.get('name'),
        email : formData.get('email'),
        socialSites : formData.getAll('socialSites')?.filter((site) => 
        typeof site === "string" && site.length > 0)
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update userinfo.',
        }
    }

    const params = sendUserToDB(validatedFields.data);
    
    const queryText = `UPDATE users
        SET name = $1, email = $2, socialsites = $3
        WHERE id = $4`;

    try {
        await query(queryText, [params.name, params.email, params.socialsites, id]);
    } catch (error) {
        return { message : "DB Error : Fail to update userinfo"};
    }

    revalidatePath(`/dashboard`);
    redirect(`/dashboard`);
}