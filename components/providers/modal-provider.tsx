"use client"

import { CreateServerModal } from "@/components/modals/create-server-model" ;
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-model";
import { CreateChannelModal } from "@/components/modals/create-chanel-model";
import { LeaveServerModal } from "@/components/modals/leave-server-model";
import { DeleteServerModal } from "@/components/modals/delete-server-model";
import { DeleteChannelModal } from "@/components/modals/delete-channel-model";
import { EditChannelModal } from "@/components/modals/edit-channel-model";
import { MessageFileModel } from "@/components/modals/message-file-model";
import { DeleteMessageModal } from "@/components/modals/delete-message-model";

export const ModalProvider = () => {
    const [isMounted , setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(true);
    } , []);

    if(!isMounted)   return null; 

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <MessageFileModel />
            <DeleteMessageModal />
        </>
    )
}