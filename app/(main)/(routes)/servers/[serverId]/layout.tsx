import { ServerSidebar } from "@/components/server/server-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden sm:flex sm:flex-col w-full h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            {/* <div className="hidden md:flex h-full md:w-auto w-60 z-20 fixed flex-col inset-y-0"> */}
            <ServerSidebar serverId={params.serverId} />
            {/* </div> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <main className="h-full w-auto">{children}</main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* <div className="md:hidden flex h-full"> */}
      {/* <div className="hidden md:flex h-full w-60 z-20 fixed flex-col inset-y-0"> */}
      {/* <ServerSidebar serverId={params.serverId} /> */}
      {/* </div> */}
      <div className="h-full w-full md:hidden">{children}</div>
      {/* </div> */}
    </div>
  );
};

export default ServerIdLayout;
