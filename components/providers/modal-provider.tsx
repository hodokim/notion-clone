'use client';

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
import {CoverImageModal} from "@/components/modals/cover-image-modal";

export const ModalProvider = () => {
    // 하이드레이션 방지 코드 1
    const [isMounted, setIsMounted] = useState(false);

    // 하이드레이션 방지 코드 2
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <>
            <SettingsModal />
            <CoverImageModal />
        </>
    );
};