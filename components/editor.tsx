"use client";

import { useTheme } from "next-themes";
import {
    BlockNoteEditor,
    PartialBlock,
} from "@blocknote/core";
import {

    useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

export const Editor = ({
                           onChange,
                           initialContent,
                           editable,
                       }: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
    });

    return (
        <div>

        </div>
    );
};
