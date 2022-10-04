const bcrypt = require("bcryptjs")
const express = require("express")
const router = express.Router();
const authenticate = require("../middleware/authenticate")

require("../db/conn")
const User = require("../model/userSchema")

router.get("/" , (req,res)=>{
    res.send("Hello from the server Side router");
})

router.post("/register" , async (req,res)=>{
   const {name , email , phone , work , password , cpassword} = req.body

   if(!name || !email || !phone || !work || !password || !cpassword){
    res.status(422).json({error:"Plz Enter the details!"})
   }

//    STORING TO DATABASE USING PROMISES

//    User.findOne({email:email})
//    .then((userExist)=>{
//     if(userExist){
//         res.status(422).json({error:"Email Alredy Exist"})
//     }

//     const user = new User({name , email , phone , work , password , cpassword})

//     user.save().then(()=>{
//         res.status(201).json({message:"Details Entered Sucessfully"})
//     }).catch((err)=>{
//         res.status(500).json({error:"Failed to Register"})
//     })
//    }).catch(err => {console.log(err)})

// STORING IN DATABASE USING ASYNC-AWAIT

const userExist = await User.findOne({email:email}) 
try {
    if(userExist){
        res.status(422).json({error:"Email Alredy Exist"})
    }else if(password !== cpassword){
        res.status(422).json({error:"Password are not matching"})
    }
    else{
        const user = new User({name , email , phone , work , password , cpassword})
        // hashing of password ( middleware )
        const userRegister = await user.save()
        if(userRegister){
            res.status(201).json({message:"Details Entered Sucessfully"})
        }
        else{
            res.status(500).json({error:"Failed to Register"})
        }
    }
   
} catch (error) {
    console.log(error)
}   
})

router.post("/signin" , async(req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            res.status(422).json({error:"Plz Enter the details properly"})
        }
        
           const userLogin = await User.findOne({email:email})
           if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password)

            if(!isMatch){
             res.status(400).json({error:"Incorrect Password"})
            }
            else{
           
             const token = await userLogin.generateAuthToken();
             res.cookie("jwtoken" , token , {
                 expires:new Date(Date.now() + 3000000),
                 httpOnly:true
             })
             res.json({message:"user Signin successfully"})
            }
           }
           else{
            res.status(400).json({error:"Invalid Credentials"})

           }
          
        
    } catch (error) {
        console.log(error)
    }

})

router.get("/about" , authenticate , (req,res)=>{
    res.send(req.rootUser);
})

router.get("/getUserData" , authenticate , (req,res)=>{
    res.send(req.rootUser);
}) 

router.post("/contact" , authenticate , async (req,res)=>{
    try {
        const {name , email ,phone , message }=req.body 
        if(!name || !email || !phone || !message){
            console.log("Plz fill the details")
           return res.json({error:"plz fill the contact form"})
        }

        const userContact = await User.findOne({_id:req.userID})

        if(userContact){
            const userMessage =await userContact.addMessage(name , email ,phone , message )
            await userContact.save();
            res.status(201).json({message:"user contact successfully"})
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout" ,  (req,res)=>{
    res.clearCookie("jwtoken" , {path:"/"})
    res.status(200).send("user logout")
}) 


module.exports = router ;