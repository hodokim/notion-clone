"use client"

import Image from "next/image";
import {useUser} from "@clerk/clerk-react";
import {PlusCircle} from "lucide-react";
import { toast } from "sonner";

import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title:"Untitled"});

        toast.promise(promise, {
            loading: "새 노트를 만드는 중 입니다...",
            success: "새 노트가 만들어졌습니다!",
            error: "새 노트를 만드는 데 실패했습니다."
        });
    };

    return (
        <div className={"h-full flex flex-col items-center justify-center space-y-4"}>
            <Image src={"/empty.png"}
                   height={"300"}
                   width={"300"}
                   className={"dark:hidden"}
                   alt={"emptyPage"}
            />
            <Image src={"/empty-dark.png"}
                   height={"300"}
                   width={"300"}
                   className={"hidden dark:block"}
                   alt={"emptyPage"}
            />
            <h2 className={"text-lg font-medium"}>
                {user?.firstName}님 환영합니다.
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className={"h-4 w-4 mr-2"}/>
                새 노트 만들기
            </Button>
        </div>
    );
}
 
export default DocumentsPage;