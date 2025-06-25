import { NextResponse } from "next/server";
import mongoose from "mongoose";
import infoModel from "@/server/models/infoModel";

const connectDB = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function GET() {
  try {
    await connectDB();
    const info = await infoModel.find();
    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Мэдээлэл татаж чадсангүй", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { companyInfo } = await req.json();

    if (!companyInfo) {
      return NextResponse.json(
        { message: "companyInfo талбарыг оруулна уу" },
        { status: 400 }
      );
    }

    const newInfo = await infoModel.create({ companyInfo });
    return NextResponse.json(newInfo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Мэдээлэл хадгалах үед алдаа гарлаа", error },
      { status: 500 }
    );
  }
}
