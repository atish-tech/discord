"use client"

import React, { use } from 'react'
import { ActionTooltip } from '../action-tooltip'
import { Database } from 'lucide-react'
import { useParams, usePathname, useRouter } from "next/navigation";

export const AvailibleServer = () => {
  const router = useRouter();
const location = usePathname();


  return (
    <div>
        <ActionTooltip side='right' align='center' label='Availible Server' >
            <button onClick={() => router.push("/servers/availible")} className="group flex items-center rounded ">
                <div className={`flex mx-3 h-[48px] w-[48px]  rounded-[24px]
                group-hover:rounded-[16px] transition-all overflow-hidden 
                items-center justify-center bg-background dark:bg-neutral-700
                group-hover:bg-emerald-500 ${location === "/servers/availible" ? "border-2 border-zinc-200" : ""} `}>
                    <Database className="group-hover:text-white transition text-emerald-500"/>
                    </div>
            </button>
        </ActionTooltip>
    </div>
  )
}
