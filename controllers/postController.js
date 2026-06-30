// get - all posts
// get - my posts
// post - save post
// put - update post
// delete - own post

const Post= require("../models/Post");

const createPost= async (req,res)=>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({
                success:false,
                message:"Title and Content are required"
            });
        }

        const post= await Post.create({title,content,user:req.user._id});
        res.status(201).json({
            success:true,
            message: "Post Created Successfully",
            post
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Unable to add POST",
            error:err.message
        });
    }
}

const getAllPost =async (req,res)=>{
    try{
        const posts = await Post.find();
        if(posts.length==0){
            return res.json({
                message: "No posts yet"
            });
        }
        //sorting, user info
        res.json({
            success: true,
            message: "All Posts: ",
            totalPosts: posts.length,
            posts
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Unable to fetch posts",
            error: err.message
        })
    }
};

const getMyPost = async (req,res)=>{
    try{
        const posts = await Post.find({user: req.user._id});
        if(posts.length ==0){
            res.json({
                message: "No posts yet"
            })
        }
        res.status(201).json({
            success: true, 
            message:"Your Posts:",
            yourTotalPosts: posts.length,
            posts
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Unable to fetch your posts",
            error: err.message
        });
    }
}