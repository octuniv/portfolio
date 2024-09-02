"use server";

import { z } from "zod";
import { convertPageToDB, httpServerAddress, sendUserToDB } from "./util";
import { query, Client } from "@/config/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Board, HistoryProperty, User, userKeys } from "./definition";

const paragraphSchema = z.object({
  id: z.string(),
  title: z.coerce.string().min(1, { message: `Don't empty title.` }),
  content: z
    .array(z.coerce.string())
    .nonempty({ message: `Don't you enter your content?` }),
});

export type ParagraphState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

const EditParagraph = paragraphSchema.omit({ id: true });

export async function updateParagraph(
  id: string,
  prevState: ParagraphState,
  formData: FormData
) {
  const validatedFields = EditParagraph.safeParse({
    title: formData.get("title"),
    content: formData
      .getAll("content")
      .filter((ct) => typeof ct === "string" && ct.length > 0),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Paragraph.",
    };
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
    return { message: "Database Error: Failed to update paragraph" };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

export async function createParagraph() {
  const queryText = `INSERT INTO paragraphs (title, content) values ('NEW', 'NEW')`;

  try {
    await query(queryText);
  } catch (error) {
    console.error("You can`t create paragraph because of db errors");
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
    console.error("Database Error : Failed to delete paragraph");
    throw Error;
  }
  revalidatePath(`/dashboard`);
}

export async function deleteBoard(id: string) {
  const reqAddress = httpServerAddress + `boards/${id}`;
  const res = await fetch(reqAddress, {
    method: "DELETE",
  });
  const result = await res.json();
  if (result?.error) {
    if (result?.statusCode === 404 || result?.error === "Not Found") {
      throw new Error("This Board Entity already not existed!");
    } else {
      throw new Error(result.error);
    }
  }

  revalidatePath(`/dashboard`);
}

export async function createBoard() {
  const reqAddress = httpServerAddress + "boards";
  const newContent = {
    title: "NEW BOARD",
  } satisfies Pick<Board, "title">;
  const res = await fetch(reqAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContent),
  });
  const result = await res.json();
  if (result?.error) {
    if (result.error === "Bad Request" || result?.statusCode === 400) {
      throw new Error("Invalid data was sended");
    } else {
      throw new Error(result.error);
    }
  }
  revalidatePath(`/dashboard`);
}

export async function addHistory(id: string) {
  const reqAddress = httpServerAddress + `boards/history/${id}`;
  const newContent = {
    subtitle: "NEW HISTORY",
    intros: ["NEW"],
    contents: ["NEW"],
  } satisfies Omit<HistoryProperty, "id" | "board_id">;
  const res = await fetch(reqAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContent),
  });

  const result = await res.json();
  if (result?.error) {
    if (result?.statusCode === 404 || result.error === "Not Found") {
      throw new Error(`Invalid Board Id : ${id}`);
    } else if (result.error === "Bad Request" || result?.statusCode === 400) {
      throw new Error("history content has something wrong");
    } else {
      throw new Error(result.error);
    }
  }

  revalidatePath(`/dashboard/edit/board/${id}`);
}

export type BoardTitleState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const BoardTitleSchema = z.object({
  id: z.string(),
  title: z.coerce.string().min(1, { message: `Don't empty title.` }),
});

const EditBoardTitle = BoardTitleSchema.omit({ id: true });

export async function updateBoardTitle(
  boardId: string,
  prevState: BoardTitleState,
  formData: FormData
) {
  const validatedFields = EditBoardTitle.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update BoardTitle.",
    };
  }

  const { title } = validatedFields.data;
  const reqAddress = httpServerAddress + `boards/${boardId}`;
  const res = await fetch(reqAddress, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title } satisfies Pick<Board, "title">),
  });
  const result = await res.json();

  if (result?.error) {
    if (result.error === "Not Found" || result?.statusCode === 404) {
      throw new Error(`Invalid BoardId : ${boardId}`);
    } else {
      throw new Error(result.error);
    }
  }

  const returnAddress = `/dashboard/edit/board/${boardId}`;

  revalidatePath(returnAddress);
  redirect(returnAddress);
}

export type HistoryState = {
  errors?: {
    subtitle?: string[];
    intros?: string[];
    contents?: string[];
  };
  message?: string | null;
};

const HistorySchema = z.object({
  boardId: z.string(),
  historyId: z.number(),
  subtitle: z.string().min(1, { message: `Don't you enter your subtitle?` }),
  intros: z
    .array(z.coerce.string())
    .nonempty({ message: `Don't you enter your intro?` }),
  contents: z
    .array(z.coerce.string())
    .nonempty({ message: `Don't you enter your content?` }),
});

const EditPfParag = HistorySchema.omit({ boardId: true, historyId: true });

export async function updateHistory(
  boardId: string,
  historyId: number,
  prevState: HistoryState,
  formData: FormData
) {
  const validatedFields = EditPfParag.safeParse({
    subtitle: formData.get("subtitle"),
    intros: formData
      .getAll("intro")
      .filter((i) => typeof i === "string" && i.length > 0),
    contents: formData
      .getAll("content")
      .filter((ct) => typeof ct === "string" && ct.length > 0),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update PfParagraph.",
    };
  }

  const { subtitle, intros, contents } = validatedFields.data;
  const params: Omit<HistoryProperty, "id" | "board_id"> = {
    subtitle: subtitle,
    intros: intros,
    contents: contents,
  };

  const reqAddress =
    httpServerAddress + `boards/history/${boardId}/${historyId}`;
  const res = await fetch(reqAddress, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const result = await res.json();

  if (result?.error) {
    if (result.error === "Not Found" || result?.statusCode === 404) {
      throw new Error(`Invalid BoardId : ${boardId}, historyId : ${historyId}`);
    } else if (result.error === "Bad Request" || result?.statusCode === 400) {
      throw new Error("history content has something wrong");
    } else {
      throw new Error(result.error);
    }
  }

  const returnAddress = `/dashboard/edit/board/${boardId}`;

  revalidatePath(returnAddress);
  redirect(returnAddress);
}

export async function deleteHistory(boardId: string, historyId: number) {
  const reqAddress =
    httpServerAddress + `boards/history/${boardId}/${historyId}`;
  const res = await fetch(reqAddress, {
    method: "DELETE",
  });
  const result = await res.json();
  if (result?.error) {
    if (result?.statusCode === 404 || result?.error === "Not Found") {
      throw new Error("This History Entity already not existed!");
    } else {
      throw new Error(result.error);
    }
  }
  const returnAddress = `/dashboard/edit/board/${boardId}`;
  revalidatePath(returnAddress);
}

type UserOmitId = Omit<User, "id">;

export type UserState = {
  errors?: {
    [key in keyof UserOmitId]?: string[];
  };
  message?: string | null;
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const UserSchema = z.object({
  name: z.coerce.string().min(1, { message: "Do not empty your name" }),
  email: z.coerce.string().email({ message: "Keep the email format" }),
  phone: z.coerce
    .string()
    .regex(phoneRegex, "You should input valid phone number!"),
  socialSites: z
    .array(z.coerce.string())
    .nonempty({ message: "Enter your socialSites." }),
});

export async function updateUser(
  id: string,
  prevState: UserState,
  formData: FormData
) {
  const validatedFields = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    socialSites: formData
      .getAll("socialSites")
      ?.filter((site) => typeof site === "string" && site.length > 0),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update userinfo.",
    };
  }

  const params = sendUserToDB(validatedFields.data);

  const queryText = `UPDATE users
        SET name = $1, email = $2, phone = $3, socialsites = $4
        WHERE id = $5`;

  try {
    await query(queryText, [
      params.name,
      params.email,
      params.phone,
      params.socialsites,
      id,
    ]);
  } catch (error) {
    return { message: "DB Error : Fail to update userinfo" };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}
