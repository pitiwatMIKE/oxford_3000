import mongoose from "mongoose";

export interface User extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
