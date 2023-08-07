// route.js
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

export async function POST(request, response) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}