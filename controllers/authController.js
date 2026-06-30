const User = require("../models/User");
const jwt= require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.json({
                success:false,
                message: "User Already Exists"
            });
        }

        const hashPassword = await bcryptjs.hash(password,10);
        const user = await User.create({name,email,password:hashPassword});
        res.status(201).json({
            success: true,
            message : "User registered successfully",
            user
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Unable to Register",
            error: err.message
        })
    }
};

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message: "User Not Found"
            });
        }

        const isMatch = await bcryptjs.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });
        }

        //generate token
        const token= jwt.sign({ //{data to be encoded,secret key, expiration time}
            id:existingUser._id
        },process.env.SECRET_KEY,{expiresIn:"2m"});
        
        res.json({
            succes:true,
            message:"Login Successful",
            token,
            data:existingUser
        });

    }
    catch(err){
        console.log("unable to login",err)
    }
};

const profile = (req,res)=>{
    res.json({
        success:true,
        message:"Profile Fetched",
        user : req.user
    });
};

const logout = (req,res)=>{
    res.json({
        success:true,
        message:"Logged Out Successfully"
    })
}

module.exports = {register,login,profile,logout};