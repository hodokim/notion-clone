"use client";

import {useMutation, useQuery } from "convex/react";
import {useParams, useRouter} from "next/navigation";
import {api} from "@/convex/_generated/api";
import {useState} from "react";
import { Id } from "@/convex/_generated/dataModel";
import {toast} from "sonner";
import {Spinner} from "@/components/spinner";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document)=> {
        return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "노트를 복구 중입니다.",
            success: "노트가 복구되었습니다!",
            error: "노트를 복구하는데 실패했습니다!"
        });
    };

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "노트를 삭제 중입니다.",
            success: "노트가 삭제되었습니다!",
            error: "노트를 삭제하는데 실패했습니다!"
        });

        if(params.documentId === documentId){
            router.push("/documents");
        }
    };

    if(documents === undefined){
        return(
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="제목으로 검색합니다..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    노트를 찾지 못했습니다.
                </p>
            </div>
        </div>
    )
}