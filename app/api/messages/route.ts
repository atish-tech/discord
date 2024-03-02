import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;


export async function GET(
    req: Request
) {
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if(!profile) {
            return new NextResponse("Unauthorized" , {status : 401});
        }
        if(!channelId) {
            return new NextResponse("Channel Id is Missing" , {status: 400});
        }

        let message : Message[] = [];

        if(cursor) {
            message = await db.message.findMany({
                take: MESSAGES_BATCH ,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } 
        else  {
            message = await db.message.findMany({
                take: MESSAGES_BATCH ,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;

        if(message.length === MESSAGES_BATCH) {
            nextCursor = message[MESSAGES_BATCH -1].id;
        }

        return NextResponse.json({items : message , nextCursor});
    } catch (error) {
        console.log("[message get]" , error);
        return new NextResponse("Internal Error" , {status : 500});
    }
}