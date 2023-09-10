import client from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, name, password } = body;

  const existedUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!existedUser) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  }

  return NextResponse.json(
    {},
    { status: 409, statusText: "User already exists" }
  );
}
