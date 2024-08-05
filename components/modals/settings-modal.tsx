'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader
} from '@/components/ui/dialog';
import { useSettings } from '@/hooks/use-settings';
import { Label } from '@/components/ui/label';
import {ModeToggle} from "@/components/mode-toggle";

export const SettingsModal = () => {
    const settings = useSettings();

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        나의 설정
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            디스플레이
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            당신이 원하는 Bnote 환경을 설정해보세요.
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}