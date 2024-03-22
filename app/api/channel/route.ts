import { decodeToken } from "@/config/decodeToken";
import { DB } from "@/lib/prisma";
import { StatusCode } from "@/lib/status";
import { ChannelType, MemberRole } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { string, z } from "zod";

const ChannelInputSchema = z.object({
    name: string().min(2, { message: "Channel name must be at list 2 charecter" }),
    type: string(),
    serverId: string()
});

export async function POST(req: Request) {
    try {
        const token = cookies().get("token")?.value || " ";

        if (!token) return new NextResponse("Bad Request", { status: StatusCode.BadRequest });

        const email = await decodeToken(token);

        const body = await req.json();

        const user = await DB.user.findFirst({ where: { email } });

        // Validate User
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // validate body
        const verifiedBody = ChannelInputSchema.safeParse(body);
        if (!verifiedBody.success) {
            return new NextResponse(verifiedBody.error.errors[0].message, { status: StatusCode.BadRequest });
        }

        const { name, serverId, type } = body;

        // Create channel
        const channel = await DB.server.update({
            where: {
                id:serverId ,
                members: {
                    some:{
                        userId: user.id,
                        role: {
                            in:[MemberRole.ADMIN , MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels:{ 
                    create: {
                        name: name,
                        type: type
                    }
                }
            }
        })

        return NextResponse.json(channel);
    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error", { status: StatusCode.Error });
    }
}