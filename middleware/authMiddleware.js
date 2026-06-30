const jwt= require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware= async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Token Not Found"
            });
        }

        //now working with token
        //let nameAuthHeader = "Bearer ghgjhgvrbvabnvjfbhuriavnj"
        let token = authHeader.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");
        //without password
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            });
        }
        console.log("Middleware wala User",user);
        req.user = user;
        next();
    }
    catch(err){
        console.log("some error in authentication",err);
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
}

module.exports= authMiddleware;