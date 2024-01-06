import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    trim: true,
    unique: true,
    min:4,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },
});

export default mongoose.model("users", UserSchema);

