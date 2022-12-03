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
            req.session.user = createUser
            
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
        console.log("find user: ", findUser)
        if(!findUser) {
            res.status(403).json({message:"could not log in"})
            return
        }
        const passwordMatches = findUser.checkPassword(req.body.password)
        if(!passwordMatches){
            res.status(403).json({message:"could not log in"})
            return
        }
        req.session.save(()=>{
            req.session.user = findUser

            console.log("Ssaved user session")
            res.status(201).json(findUser)
        })

    } catch(error){
console.log(error)
res.status(500).json(error)
    }
// const createUser = await User.create(req.body)
})

module.exports = router