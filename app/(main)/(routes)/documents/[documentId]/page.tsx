"use client";

import {useQuery} from "convex/react";

import {Skeleton} from "@/components/ui/skeleton";
import {Toolbar} from "@/components/toolbar";
import {Cover} from "@/components/Cover";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    if(document === undefined) {
        return(
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-1 w-[80%]"/>
                        <Skeleton className="h-1 w-[40%]"/>
                        <Skeleton className="h-1 w-[60%]"/>
                    </div>
                </div>
            </div>
        )
    }

    if(document === null){
        return <div>노트를 찾을 수 없습니다.</div>
    }

    return (
        <div className="pb-40">
            <Cover url={document.coverImage}/>
            <div className="md:max-w-3xl lg:max-w-4xl max-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    );
}

export default DocumentIdPage;