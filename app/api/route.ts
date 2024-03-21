import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // console.log(cookies().get("token"));
    return new NextResponse("default router" , {status: 200})
}