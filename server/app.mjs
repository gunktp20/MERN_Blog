import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./db/connect.mjs";
import mongoose from 'mongoose';
import Post from "./models/Post.mjs";
import User from "./models/User.mjs";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken"
import multer from "multer"
import fs from "fs"
var Types = mongoose.Types;
var ObjectId = Types.ObjectId;

const uploadMiddleware = multer({ dest: "uploads/" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
const secret = process.env.SECRET

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log("------------------------");
  next();
});

app.get("/post", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.status(200).json(posts);
});

app.get("/cookies", async (req, res) => {
  res.cookie("test", "json").json({
    cookies: "123456"
  });
})

app.get("/post/:postID", async (req, res) => {
  if (!req.params.postID) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  try{
    const post = await Post.findById(req.params.postID).populate("author");
    return res.status(200).json(post);
  }catch(err){
    return res.status(404).json({msg:"ไม่พบ post id ของคุณ"});
  }
});

app.get("/post/user/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  const post = await Post.find({author:id}).populate("author");
  if (!post) {
    return res.status(404).json({ msg: "Not found" });
  }
  res.status(200).json(post);
});

app.delete("/post/:id", async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  
  const post = await Post.findById(postId);
  if(!post){
    return res.status(404).json({ msg: "ไม่พบข้อมูลของคุณ" });
  }

  const { token } = req.cookies;

  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;

    if(post.author.toString() !== info.id){
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const result = await Post.deleteOne({_id:postId})

    res.json({msg:"deleted 1 record",result});
  })
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลของคุณให้ครบถ้วน" });
  }

  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    return res.status(400).json({ msg: "username ของคุณมีอยู่ในฐานข้อมูลเเล้ว" });
  }

  const salt = bcrypt.genSaltSync(10);

  const user = await User.create({
    username,
    password: bcrypt.hashSync(password, salt),
  });
  res.status(200).json({
    user: {
      username: user.username,
    },
  });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;

  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});


//User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json({ msg: "username ของคุณไม่มีอยู่ในระบบ" });
  }
  const isMatchedPassword = await bcrypt.compareSync(password, userDoc.password);

  if (!isMatchedPassword) {
    return res.status(400).json({ msg: "รหัสผ่านของคุณไม่ถูกต้อง" });
  }
  const token = await jwt.sign({ username, id: userDoc._id }, secret)
  res.cookie("token", token).json({
    id: userDoc._id,
    username: username
  })

});

app.put("/post/:postID", uploadMiddleware.single("file"), async (req, res) => {
  if(!req.file){
    return res.status(400).json({ msg: "โปรดกรอกข้อมูลให้ครบถ้วน" });
  }
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;

  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    if(!title||!summary||!content||!req.params.postID){
      return res.status(400).json({ msg: "โปรดกรอกข้อมูลให้ครบถ้วน" });
    } 
    const id = await new ObjectId(req.params.postID)
    try{
      const postDoc = await Post.findByIdAndUpdate(id,{
        title,
        summary,
        content,
        cover: newPath,
      });
      return res.json(postDoc);
    }catch(err){
      console.log(err.toString())
      return res.status(404).json({ msg: "Not found Your Post" });
    }
    
    
  });
});

app.use((req,res)=>{
  res.status(404).json("Not Found!")
})

app.use((err,req,res)=>{
  res.status(500).json("Have an Error on Server!")
})

const startServer = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
