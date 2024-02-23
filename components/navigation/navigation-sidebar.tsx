import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import {redirect} from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // console.log(server);
    

    return (
        <div className="space-y-4 pt-3 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea>
                {server.map((server) => (
                    <div key={server.id}>
                        {server.name}
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}