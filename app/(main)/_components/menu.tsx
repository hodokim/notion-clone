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

interface MenuProps{
    documentId: Id<"documents">;
}
export const Menu = ({
                         documentId
}: MenuProps) => {
    const router = useRouter();
    const {user} = useUser();

    return(
        <div>
            메뉴
        </div>
    )
}