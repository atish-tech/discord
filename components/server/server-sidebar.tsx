import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChanelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSideBarProps {
    serverId : string;
}

export const ServerSidebar = async ({serverId} : ServerSideBarProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id : serverId
        },
        include: {
            chanels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include : {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChanel = server?.chanels.filter((chanel) => chanel.type === ChanelType.TEXT);
    const audioChanel = server?.chanels.filter((chanel) => chanel.type === ChanelType.AUDIO);
    const videoChanel = server?.chanels.filter((chanel) => chanel.type === ChanelType.VIDEO);
    const members = server?.members.filter(member => member.profileId !== profile.id);
    const role = server?.members.find(member => member.profileId === profile.id)?.role;

    if(!server) {
        return redirect("/");
    }
    // console.log(server);
    
    
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}