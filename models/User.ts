import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  password: string;
}

export const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};  

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User<User> ||
  mongoose.model<User>("User", UserSchema);
