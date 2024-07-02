'use client';

import { updateParagraph } from "@/app/lib/action";
import { Paragraph } from "@/app/lib/definition";
import { useState, useActionState, ChangeEvent } from "react";
import { Button } from "../../button";

export default function EditParagraph({
    paragraph
} : {
    paragraph: Paragraph
}) {
    const initialState = { message: '', errors: {} };
    const updateParagraphWithId = updateParagraph.bind(null, paragraph.id);
    const [state, formAction] = useActionState(updateParagraphWithId, initialState);

    const [content, setContent] = useState(paragraph.content);

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const nextCt = [...content];
        nextCt[index] = value;
        setContent(nextCt);
    };

    const handleAddClick = () => {
        setContent([...content, '']);
    };

    const handleRemoveClick = (index: number) => {
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
                        <div key={i}>
                            <input 
                                id="content"
                                name="content"
                                defaultValue={ct}
                                onChange={event => handleInputChange(i, event)}
                                placeholder="enter content"
                            />
                            <Button onClick={() => handleRemoveClick(i)}>Remove</Button>
                            {content.length - 1 === i && (
                                <Button onClick={handleAddClick}>Add</Button>
                            )}
                        </div>
                    ))
                }
            </div>
            <Button type="submit">Edit Paragraph</Button>
        </form>
    );
}