// const { application } = require('express');
const express = require('express');
const { rest } = require('lodash');
const router = express.Router();
const {User,Post,Comment} = require('../models');
const withAuth = require('../utils/auth');
//get all posts
router.get("/",(req,res)=>{
    Post.findAll({include:[User, Comment]}).then(posts=>{
        const postsHbsData = posts.map(post=>post.get({plain:true}))
        console.log(posts);
        console.log("==============")
        console.log(postsHbsData)

        res.render("home",{
            //need handlebar file
            posts:postsHbsData,
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

router.post("/post/:postId/comment/new", withAuth,async(req,res)=>{
    //create a new comment
    const postId = req.params.postId
    const submittedComment = req.body
    console.log("submitted comment: ",submittedComment)
    const newComment = await Comment.create(submittedComment)
    res.json(newComment)
})
router.post("/logout",(req, res)=>{
    console.log("called logout")
    req.session.destroy()
    res.status(200).json({logout:true})
})

module.exports = router;