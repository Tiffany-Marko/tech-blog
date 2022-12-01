const express = require('express');
const { rest, without } = require('lodash');
const router = express.Router();
const {User,Post,Comment} = require('../models');
//get all posts 
//need to create utils/helpers/auth js files
const withAuth = require('../utils/auth');

router.get("/", withAuth,async (req,res)=>{
    res.render("dashboard")
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