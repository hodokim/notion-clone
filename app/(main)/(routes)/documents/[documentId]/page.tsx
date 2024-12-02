"use client";

import {useQuery} from "convex/react";

import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {Toolbar} from "@/components/toolbar";

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
                노트를 찾는 중입니다...
            </div>
        )
    }

    if(document === null){
        return <div>노트를 찾을 수 없습니다.</div>
    }

    return (
        <div className="pb-40">
            <div className="h-[35vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl max-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    );
}

export default DocumentIdPage;