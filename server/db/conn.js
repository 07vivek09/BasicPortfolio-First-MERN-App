const mongoose = require("mongoose")


const DB = process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log("connection Sucessfull")
}).catch((err)=>{
    console.log("No Connection")
})