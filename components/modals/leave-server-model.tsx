"use client";

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export const LeaveServerModal = () => {
    const [isloading, setIsLoading] = useState(false);
    const {isOpen, onClose, type, data } = useModal();
    const { server } = data;
    const isModelOpen = isOpen && type === "leaveServer";
    const router = useRouter();
    
    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`);

            onClose();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Leave Server
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}?</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                    <Button 
                        disabled={isloading}
                        onClick={onClose}
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <Button
                    disabled={isloading}
                    onClick={onClick}
                    variant={"primary"}
                    >
                        Confirm
                    </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
