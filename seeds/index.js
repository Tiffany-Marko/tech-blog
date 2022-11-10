const userSeeds = require("./user")
const postSeeds = require("./post")
const sequelize = require("../config/connection")

async function seedData(){
    await sequelize.sync({
        force: true
    })
    // connects to the database
    await userSeeds()
    await postSeeds()
    console.log("dataBaseSeeded")
    process.exit(0)
}
seedData()