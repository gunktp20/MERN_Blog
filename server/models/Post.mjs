import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title:{
      type:String
    },
    summary:{
      type:String
    },
    content:{
      type:String
    },
    cover:{
      type:String
    },
    author: { type: ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", PostSchema);
