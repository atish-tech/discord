import { decodeToken } from "@/config/decodeToken";
import { DB } from "@/lib/prisma";
import { StatusCode } from "@/lib/status";
import {  NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = (new URL(req.url).searchParams.get("token")) || "";

    const decode = await decodeToken(token);

    if(!decode) {
        return new NextResponse("Token Expire" , {status : StatusCode.BadRequest})
    }
    console.log(decode);
    
    // const response = DB.users.findFirst({
    //     where:{
    //         email: decode.id
    //     }
    // })

    return new NextResponse("Success" , {status : StatusCode.Success});
}