"use client"

import { CreateServerModal } from "@/components/modals/create-server-model" ;
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-model";
import { CreateChannelModal } from "@/components/modals/create-chanel-model";

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
        </>
    )
}