"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {useConvexAuth} from "convex/react";
import {Spinner} from "@/components/spinner";
import Link from "next/link";
import {SignInButton} from "@clerk/clerk-react";

export const Heading = () => {
    const {isAuthenticated,isLoading} = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              당신의 아이디어, 문서 그리고 계획을 정리해보세요.<br/><span className="underline">
                Bnote
              </span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Bnote와 함께하는 깔끔한 계획과 정리. <br />
                어서 시작해보세요!
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Bnote
                    <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get Bnote free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}