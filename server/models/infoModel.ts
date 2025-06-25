import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  companyInfo: string;
}

const InfoSchema = new Schema<IUser>({
  companyInfo: { type: String, required: true },
});

export default mongoose.models.Info ||
  mongoose.model<IUser>("Info", InfoSchema);
