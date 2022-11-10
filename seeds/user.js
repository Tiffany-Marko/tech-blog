const {User} = require("../models")
const userData = [
    {
        email: "blah@blah.com",
        username: "catperson88",
        password: "meowsomuch"
    },
    {
        email: "hello@hi.com",
        username: "dogperson88",
        password: "barksomuch"
    }
]
const seedUsers = ()=> {
    return User.bulkCreate(userData)
}

module.exports = seedUsers
