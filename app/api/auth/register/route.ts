import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { any } from "zod";
import { StatusCode } from "@/lib/status";
import { sendOtp, verifyEmail } from "@/components/auth/email";

interface RequestBody {
  userName: string;
  email: string;
  password: string;
}

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();

  const { userName, email, password }: RequestBody = data;

  const crediencial = new URL(req.url);

  const type = crediencial.searchParams.get("type");

  const origin = crediencial.origin;


  const userData = await DB.users.findFirst({
    where: { OR: [{ email }, { userName }] },
  });

  // login
  if (type === "login") {
    if (!userData)
      return new NextResponse("Email and userName not exist", {
        status: StatusCode.BadRequest,
      });

    else if (userData?.userName === userName || userData?.email === email) {

      if (!(await bcryptjs.compare(password, userData?.password)))
        return new NextResponse("Incorrect password", {
          status: StatusCode.BadRequest,
        });

      else
        return new NextResponse("Login Success", {
          status: StatusCode.Success,
        });
    }

    else if (userData?.userName !== userName)
      return new NextResponse("Incorrect UserName", {
        status: StatusCode.BadRequest,
      });

    else if (userData?.email !== email)
      return new NextResponse("Incorrect Email", {
        status: StatusCode.BadRequest,
      });
  }

  // register
  if (type === "register") {
    if (userData) {
      if (!userData?.isVerified) {
        verifyEmail(userData.email , origin);
        return new NextResponse("varification link send to your register email " , {status : StatusCode.Success});
      }
      if (userData?.userName == userName)
        return new NextResponse("User Name already exist", { status: 400 });
      if (userData?.email == email)
        return new NextResponse("Email already exist", { status: 400 });
    }

    // Password encription
    const hashPassword = await bcryptjs.hash(
      password,
      await bcryptjs.genSalt(10)
    );

    // create entry in Database
    const response = await DB.users.create({
      data: { userName, email, password: hashPassword },
    });

    // send otp
    // sendOtp(123456);
    return NextResponse.json(response);
  }
}
