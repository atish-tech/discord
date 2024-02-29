import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
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
        <div className="space-y-4 pt-3 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {server.map((server) => (
                    <div key={server.id} className="mb-4">
                        {/* {server.name} */}
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}