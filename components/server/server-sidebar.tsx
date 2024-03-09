import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChanelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSideBarProps {
  serverId: string;
}

const iconMap = {
  [ChanelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChanelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChanelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.AADMIN]: <ShieldAlert className="h-4 e-4 mr-2 text-red-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      chanels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChanel = server?.chanels.filter(
    (chanel) => chanel.type === ChanelType.TEXT
  );
  const audioChanel = server?.chanels.filter(
    (chanel) => chanel.type === ChanelType.AUDIO
  );
  const videoChanel = server?.chanels.filter(
    (chanel) => chanel.type === ChanelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!server) {
    return redirect("/");
  }
  // console.log("server" , server);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea> 
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChanel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChanel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChanel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {/* Text Channel */}
        {!!textChanel?.length && ( 
          <div className="mb-3 px-3">
            <ServerSection
              sectionType="channels"
              channelType={ChanelType.TEXT}
              role={role}
              label="Text Channels"
            />

            {textChanel?.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Audio Channel */}
        {!!audioChanel?.length && (
          <div className="mb-3 px-3">
            <ServerSection
              sectionType="channels"
              channelType={ChanelType.AUDIO}
              role={role}
              label="Voice Channels"
            />

            {audioChanel?.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Video Channel */}
        {!!videoChanel?.length && (
          <div className="mb-3 px-3">
            <ServerSection
              sectionType="channels"
              channelType={ChanelType.VIDEO}
              role={role}
              label="Video Channels"
            />

            {videoChanel?.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Members */}
        {!!members?.length && (
          <div className="mb-2 px-3">
            <ServerSection
              sectionType="members"
              channelType={ChanelType.TEXT}
              role={role}
              label="Members"
              server={server}
            />

            {members?.map((member) => (
              <ServerMember member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
