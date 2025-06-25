import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  password: string;
  buddyImg: string;
  role: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  buddyImg: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
