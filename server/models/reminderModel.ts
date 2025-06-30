import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  reminder: string;
}

const reminderSchema = new Schema<IUser>({
  reminder: { type: String, required: true },
});

export default mongoose.models.Reminder ||
  mongoose.model<IUser>("reminder", reminderSchema);
