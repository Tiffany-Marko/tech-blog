const express = require('express');
const { rest, without } = require('lodash');
const router = express.Router();
const {User,Post,Comment} = require('../models');
//get all posts 
//need to create utils/helpers/auth js files
const withAuth = require('../utils/auth');

router.get("/", withAuth,async (req,res)=>{
    res.render("login")
}) 
module.exports = router 