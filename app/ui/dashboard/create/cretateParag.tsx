'use client';

import { createParagraph } from "@/app/lib/action";
import { Paragraph } from "@/app/lib/definition";
import { useActionState } from "react";
import ParagraphEditor from "../paragraphEditor";

export default function CreateParagraph() {
    const initialParagraph: Paragraph = {
        id: '',
        title: '',
        content: ['']
    };
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useActionState(createParagraph, initialState);

    return (
        <ParagraphEditor
            paragraph={initialParagraph}
            state={state}
            formAction={formAction}
        />
    );
}