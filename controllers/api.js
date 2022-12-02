const express = require('express');
const {User} = require("../models");
const router = express.Router();
router.get("/",(req, res)=>{
    res.json({message:"hello"})
})
router.post("/register", async (req, res) =>{
    console.log(req.body)
    try{
        const createUser = await User.create(req.body)
        req.session.save(()=>{
            req.session.userId = createUser.id
            req.session.username = createUser.username
            res.status(201).json(createUser)
        })

    } catch(error){
console.log(error)
res.status(500).json(error)
    }
// const createUser = await User.create(req.body)
})
router.post("/login", async (req, res) =>{
    try{
        const findUser = await User.findOne({
            where:{
                username:req.body.username
            }
        })
        if(!findUser) {
            res.status(404).json({message:"user does not exist"})
            return
        }
        const passwordMatches = findUser.checkPassword(req.body.password)
        if(!passwordMatches){
            res.status(400).json({message:"password is incorrect"})
            return
        }
        req.session.save(()=>{
            req.session.userId = findUser.id
            req.session.username = findUser.username
            res.status(201).json(findUser)
        })

    } catch(error){
console.log(error)
res.status(500).json(error)
    }
// const createUser = await User.create(req.body)
})

module.exports = router