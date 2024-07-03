'use client';

import { updateParagraph } from "@/app/lib/action";
import { Paragraph } from "@/app/lib/definition";
import { useActionState } from "react";
import ParagraphEditor from "../paragraphEditor";

export default function EditParagraph({
    paragraph
} : {
    paragraph: Paragraph
}) {
    const initialState = { message: '', errors: {} };
    const updateParagraphWithId = updateParagraph.bind(null, paragraph.id);
    const [state, formAction] = useActionState(updateParagraphWithId, initialState);

    return (
        <ParagraphEditor
            paragraph={paragraph}
            state={state}
            formAction={formAction}
        />
    );
}