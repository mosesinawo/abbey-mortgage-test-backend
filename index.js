const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const users = require("./routes/users")
const posts = require("./routes/post")
const categories = require("./routes/categories")
const multer = require("multer")
const cors = require('cors')
const path = require("path")

app.use(cors({
  origin:["http://localhost:3000",
"https://mblogapp-mern.netlify.app"]
}))  

dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  main()
  .then(console.log("connected to MongoDB"))
  .catch(err => console.log(err));
  
  const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "images") 
    },
    filename:(req, file, cb) =>{  
        cb(null, req.body.name)
    }
  })

  const upload = multer({storage: storage})  
  app.post("/api/upload", upload.single("file"), (req,res) =>{
    res.status(200).json("File has been uploaded")
  })

  app.use("/api/auth",authRoute )
  app.use("/api/users",users )
  app.use("/api/posts",posts )
  app.use("/api/categories",categories )
 
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(("Backend is running"))
})  
