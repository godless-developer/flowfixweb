import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "@/server/models/userModel";

const connectDB = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json(
        { message: "Нэр эсвэл нууц үг дутуу байна" },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Нууц үг буруу байна" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Нэвтэрч орлоо",
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
          buddyImg: user.buddyImg,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Нэвтрэх үед алдаа гарлаа", error },
      { status: 500 }
    );
  }
}
