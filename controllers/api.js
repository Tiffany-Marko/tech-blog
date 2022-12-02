const express = require('express');
const router = express.Router();
router.get("/",(req, res)=>{
    res.json({message:"hello"})
})
router.post("/register",(req, res) =>{

})

module.exports = router