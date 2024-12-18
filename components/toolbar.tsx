"use client";

import {Doc} from "@/convex/_generated/dataModel";
import {IconPicker} from "@/components/icon-picker";
import {Button} from "@/components/ui/button";
import {ImageIcon, Smile, X} from "lucide-react";
import {ElementRef, useRef, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";

interface ToolbarProps {
    initialData : Doc<"documents">;
    preview?: boolean;
};

export const Toolbar = ({
    initialData,
    preview
}:ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex itens-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={()=>{}}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={()=> {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition
                        text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker onChange={()=>{}}>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2"/>
                            아이콘 추가
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button
                        onClick={()=>{}}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        커버 추가
                    </Button>
                )}
            </div>
        </div>
    )
}