'use client';

import { updateParagraph } from "@/app/lib/action";
import { Paragraph } from "@/app/lib/definition";
import { Button } from "@/app/ui/button";
import { useState, useActionState, ChangeEvent, MouseEvent } from "react";
import Link from "next/link";

export default function EditParagraph({
    paragraph
} : {
    paragraph: Paragraph
}) {
    const initialState = { message: '', errors: {} };
    const updateParagraphWithId = updateParagraph.bind(null, paragraph.id);
    const [state, formAction] = useActionState(updateParagraphWithId, initialState);

    const [content, setContent] = useState(paragraph.content);

    console.log(content);

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.target;
        const nextCt = [...content];
        nextCt[index] = value;
        setContent(nextCt);
    };

    const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setContent([...content, '']);
    };

    const handleRemoveClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const nextCt = [...content];
        nextCt.splice(index, 1);
        setContent(nextCt);
    }

    
    return (
        <form action={formAction}>
            <div>
                <label>title</label>
                <input 
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={paragraph.title}
                    placeholder="Enter your title"
                />
                <div id="paragraph-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.title?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
            </div>
            <div>
                <label>content</label>
                {
                    content.map((ct, i) => (
                        <div key={`${i} - ${ct}`}>
                            <input 
                                id="content"
                                name="content"
                                defaultValue={ct}
                                onChange={event => handleInputChange(i, event)}
                                placeholder="enter content"
                            />
                            <Button onClick={e => handleRemoveClick(i, e)}>Remove</Button>
                        </div>
                    ))
                }
                <Button onClick={e => handleAddClick(e)}>Add</Button>
                <div id="paragraph-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.content?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Paragraph</Button>
            </div>
        </form>
    );
}