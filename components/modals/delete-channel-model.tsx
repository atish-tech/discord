"use client";

import { useParams, useRouter } from "next/navigation";
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
import qs from "query-string";

export const DeleteChannelModal = () => {
    const [isloading, setIsLoading] = useState(false);
    const {isOpen, onClose, type, data } = useModal();
    const { server , channel } = data;
    const isModelOpen = isOpen && type === "deleteChannel";
    const router = useRouter();
    const params = useParams()
    
    const onClick = async () => {
        try {
            setIsLoading(true);

            const url = qs.stringifyUrl({
                url : `/api/channels/${channel?.id}`,
                query : {
                    serverId : server?.id
                }
            })

            await axios.delete(url);

            onClose();
            router.push(`/servers/${server?.id}`);
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
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete? <span className="font-semibold text-indigo-500">{channel?.name} </span>
                         will be parmanent deleted.
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
