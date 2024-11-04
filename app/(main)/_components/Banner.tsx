"use client";

import { useRouter } from "next/navigation";
import {useMutation} from "convex/react";
import {toast} from "sonner";

import {Id} from "@/convex/_generated/dataModel";
import {api} from "@/convex/_generated/api";
import React from "react";
import {Button} from "@/components/ui/button";
import {ConfirmModal} from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">;
};

export const Banner = ({
  documentId
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "노트를 삭제 중입니다.",
            success: "노트가 삭제되었습니다!",
            error: "노트를 삭제하는데 실패했습니다!"
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "노트를 복구 중입니다.",
            success: "노트가 복구되었습니다!",
            error: "노트를 복구하는데 실패했습니다!"
        });
    };

    return (
        <div className="w-full bg-red-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                이 노트는 휴지통에 있습니다.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5
                text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                복구하기
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5
                    text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    삭제하기
                </Button>
            </ConfirmModal>
        </div>
    )
}