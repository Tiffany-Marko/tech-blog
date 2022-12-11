const express = require('express');
const { rest, without } = require('lodash');
const router = express.Router();
const {User,Post,Comment} = require('../models');
//get all posts 
//need to create utils/helpers/auth js files
const withAuth = require('../utils/auth');

router.get("/", withAuth,async (req,res)=>{
    console.log(req.session)
    if(!req.session.user){
        res.redirect("/login")
        res.end()
        return;
    }
    const userPost = await Post.findAll({
        where:{
            "$user.username$": req.session.user.username
        },
        include:[User]
    })
    console.log("User posts: ", userPost)
    res.render("dashboard",{posts:userPost.map(post => post.dataValues)})
})
router.post("/create", withAuth,async (req,res)=>{
    const submittedPost = req.body
    if(!req.session.user){
        res.redirect("/login")
        res.end()
        return;
    }
    const newPost = await Post.create({...submittedPost,user_id: req.session.user.id})
console.log(newPost)
res.redirect("/")
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