const express = require('express');
const { rest } = require('lodash');
const router = express.Router();
const {User,Post,Comment} = require('../models');
//get all posts
router.get("/",(req,res)=>{
    Post.findAll().then(posts=>{
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
        include:[User]
    }).then(post=>{
        const postHbsData = post.get({plain:true});
        console.log(post);
        console.log("==============")
        console.log(postHbsData)
        postHbsData.logged_in=req.session.logged_in
        res.render("post-details",postHbsData)
        //needs handlebars
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/")
        
    } //loging handlebars is needed
    res.render("login")
})

router.get("/signup",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/")
    }
    res.render('signup');
    //needs handlebar
})

module.exports = router;