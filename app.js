
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const express = require("express");
const app = express();


app.use(cookieParser())

dotenv.config({path:'./config.env'})

app.use(express.json())

require("./server/db/conn")
app.use(require("./server/routers/auth"))

const PORT =process.env.PORT


app.get("/" , (req,res)=>{
    res.send("Hello from the server Side");
})


// app.get("/contact" , (req,res)=>{
//     res.send("Hello from contact of the server Side");
// })

app.get("/register" , (req,res)=>{
    res.send("Hello from register of the server Side");
})


app.listen(PORT , ()=>{
    console.log(`listening to port ${PORT}`)
})