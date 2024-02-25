"use client"

import { CreateServerModal } from "@/components/modals/create-server-model" ;
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";

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
        </>
    )
}