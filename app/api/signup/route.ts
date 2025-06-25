import { NextResponse } from "next/server";
import mongoose from "mongoose";
import userModel from "@/server/models/userModel";
import bcrypt from "bcryptjs";

const connectDB = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function GET() {
  try {
    await connectDB();
    const users = await userModel.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, password, buddyImg, role } = body;

    if (!name || !password || !buddyImg || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      password: hashedPassword,
      buddyImg,
      role,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
