import { MobileToggleItems } from "@/components/mobile-toggle-item";
import { AvailibleServerCart } from "@/components/server/availible-server-cart";
import { db } from "@/lib/db";
import React from "react";

export const AvalilbleServerPage = async () => {
  const servers = await db.server.findMany({
    include: {
      profile: true,
    },
  });
  //   console.log(servers);

  return (
    <div className="h-screen w-full py-5 flex overflow-auto items-center justify-center gap-5 flex-wrap">
      <div className="w-full xs:flex flex justify-around md:hidden  ">
        <MobileToggleItems />

        <p className=" text-xl  text-green-100">Available Server</p>
      </div>
      {servers.map((server) => (
        <div key={server.id} className="w-[350px] h-fit">
          <AvailibleServerCart server={server} />
        </div>
      ))}
    </div>
  );
};

export default AvalilbleServerPage;
