import { StatusCode } from "@/lib/status";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const token = cookies().get("token")?.value;

    // console.log(token);
    

    return new NextResponse("Server Created" , {status : StatusCode.Created});
}