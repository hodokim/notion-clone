"use client";

import {Id} from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Trash} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

interface MenuProps{
    documentId: Id<"documents">;
}
export const Menu = ({
                         documentId
}: MenuProps) => {
    const router = useRouter();
    const {user} = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({id : documentId})

        toast.promise(promise, {
            loading: "노트를 삭제 중입니다.",
            success: "노트가 삭제되었습니다!",
            error: "노트를 삭제하는데 실패했습니다!"
        });

        router.push("/documents");
    };

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    최종 수정자: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return(
        <Skeleton className="h-10 w-10"/>
    )
}