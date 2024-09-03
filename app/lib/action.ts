"use server";

import { z } from "zod";
import { httpServerAddress } from "./util";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Board, HistoryProperty, Paragraph, User } from "./definition";

const paragraphSchema = z.object({
  id: z.string(),
  title: z.coerce.string().min(1, { message: `Don't empty title.` }),
  posts: z
    .array(z.coerce.string())
    .nonempty({ message: `Don't you enter your content?` }),
});

export type ParagraphState = {
  errors?: {
    title?: string[];
    posts?: string[];
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
    posts: formData
      .getAll("post")
      .filter((ct) => typeof ct === "string" && ct.length > 0),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Paragraph.",
    };
  }

  const params: Pick<Paragraph, "title" | "posts"> = validatedFields.data;

  const reqAddress = httpServerAddress + `/paragraphs/update/${id}`;
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
      throw new Error(`Invalid ParagraphId : ${id}`);
    } else if (result.error === "Bad Request" || result?.statusCode === 400) {
      throw new Error("Paragraph Entity you sent has something wrong");
    } else {
      throw new Error(result.error);
    }
  }
  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

export async function createParagraph() {
  const reqAddress = httpServerAddress + "/paragraphs";
  const newContent = {
    title: "NEW Paragraph",
  } satisfies Pick<Paragraph, "title">;
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

export async function deleteParagraph(id: string) {
  const reqAddress = httpServerAddress + `/paragraphs/delete/${id}`;
  const res = await fetch(reqAddress, {
    method: "DELETE",
  });
  const result = await res.json();
  if (result?.error) {
    if (result?.statusCode === 404 || result?.error === "Not Found") {
      throw new Error("This Paragraph Entity already not existed!");
    } else {
      throw new Error(result.error);
    }
  }
  revalidatePath(`/dashboard`);
}

export async function deleteBoard(id: string) {
  const reqAddress = httpServerAddress + `/boards/${id}`;
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
  const reqAddress = httpServerAddress + "/boards";
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
  const reqAddress = httpServerAddress + `/boards/history/${id}`;
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
  const reqAddress = httpServerAddress + `/boards/${boardId}`;
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
    httpServerAddress + `/boards/history/${boardId}/${historyId}`;
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
    httpServerAddress + `/boards/history/${boardId}/${historyId}`;
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

const urlRegex = new RegExp(
  /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
);
const UserSchema = z.object({
  name: z.coerce.string().min(1, { message: "Do not empty your name" }),
  email: z.coerce.string().email({ message: "Keep the email format" }),
  phone: z.coerce
    .string()
    .regex(phoneRegex, "You should input valid phone number!"),
  socialSites: z
    .array(
      z.coerce.string().regex(urlRegex, "You should input valid url form!")
    )
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

  const params = validatedFields.data;

  const reqAddress = httpServerAddress + `/users/update/${id}`;
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
      throw new Error(`Invalid UserId : ${id}`);
    } else if (result.error === "Bad Request" || result?.statusCode === 400) {
      throw new Error("User content has something wrong");
    } else {
      throw new Error(result.error);
    }
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}
