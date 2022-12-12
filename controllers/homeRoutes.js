// const { application } = require('express');
const express = require('express');
const { rest } = require('lodash');
const handlebarsHelpers = require("handlebars-helpers")
const router = express.Router();
const {User,Post,Comment} = require('../models');
const withAuth = require('../utils/auth');
//get all posts
router.get("/",(req,res)=>{
    Post.findAll({include:[User, {model:Comment,include:[User]}]}).then(posts=>{
        const postsHbsData = posts.map(post=>post.get({plain:true}))
        const postWithAuthComments = postsHbsData.map(post => {
            return {
                ...post,
                comments: post.comments.map(comment => {
                    if(req.session) {
                        if(req.session.user) {
                            if(comment.user_id === req.session.user.id) {
                                return {...comment, canModify: true}
                            }
                            else {
                                return {...comment, canModify: false}
                            }
                        }
                        else {
                            return {...comment, canModify: false}
                        }
                    } else {
                        return {...comment, canModify: true}
                    }
                })
            }
        })
        console.log(JSON.stringify(posts,null,2));
        console.log("==============")
        console.log(postsHbsData)

        res.render("home",{
            //need handlebar file
            posts:postWithAuthComments
            
            // logged_in:req.session.logged_in
        })
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})
//get single post
router.get("/post/:id",(req,res)=>{
    Post.findByPk(req.params.id,{
        include:[User, Comment]
    }).then(post=>{
        const postHbsData = post.get({plain:true});
        //console.log(post);
        //console.log("==============")
       // console.log(postHbsData)
        postHbsData.logged_in=req.session.logged_in
        res.render("post-details",postHbsData)
        //needs handlebars
    })
})

// router.get("/login",(req,res)=>{
//     if(req.session.logged_in){
//         return res.redirect("/")
        
//     } //loging handlebars is needed
//     res.render("login")
// })

router.get("/signup",(req,res)=>{
    if(!req.session && !req.session.username){
        return res.redirect("/")
    }
    res.render('signup');
    //needs handlebar
})

router.get("/post", async (req,res)=>{
    const postTitle = req.query.title

    const post = await Post.findOne({
        where: {
            post_title:postTitle
        },
        include:[User, Comment]
    })
    console.log("Post: ", post.toJSON());
    res.render("post", {post:post.toJSON()})
})
router.delete("/post/:postId",withAuth,async(req,res)=>{
    if(!req.session.user){
        res.json({message:"not authenticated"})
        res.end()
        return;
    } 
    await Post.destroy({
        where:{
            id:req.params.postId,
            user_id: req.session.user.id
        },
        include:[User]
        
    })
    res.json({message:"deleted post"})
})
router.put("/post/:postId",withAuth,async(req,res)=>{
    if(!req.session.user){
        res.json({message:"not authenticated"})
        res.end()
        return;
    } 
    await Post.update(
        {
        ...req.body
        }, {
        where:{
            id:req.params.postId,
            user_id: req.session.user.id
        },
        include:[User]
    
    })
    res.json({message:"updated post"})
})

router.post("/post/:postId/comment/new", withAuth,async(req,res)=>{
    //create a new comment
    if(!req.session.user){
        res.json({message:"not authenticated"})
        res.end()
        return;
    }
    try{
        const postId = req.params.postId
    const submittedComment = req.body
    console.log("submitted comment: ",submittedComment)
    const newComment = await Comment.create({...submittedComment,user_id:req.session.user.id})
    res.json(newComment)
    } catch(err){
        console.log(err)
        res.json({message:"error submitting comment"})
    }
})
router.post("/logout",(req, res)=>{
    console.log("called logout")
    req.session.destroy()
    res.status(200).json({logout:true})
})

module.exports = router;