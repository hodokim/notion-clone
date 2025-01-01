"use client";

import Image from "next/image";
import {ImageIcon, X} from "lucide-react";
import {useMutation} from "convex/react";
import {useParams} from "next/navigation";

import {cn} from "@/lib/utils";
import { Button } from "./ui/button";
import {useCoverImage} from "@/hooks/use-cover-image";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {useEdgeStore} from "@/lib/edgestore";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}
export const Cover = ({url,preview}: CoverImageProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if(url){
            await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        });
    };

    return (
        <div className={cn(
            "relative w-full h-[34vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image src={url}
                       fill
                       alt="CoverImage"
                       className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5
                right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        커버 이미지 변경
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2"/>
                        커버 이미지 삭제
                    </Button>
                </div>
            )}
        </div>
    )
}