const { selectAllUsers } = require("../models/users.models")

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await selectAllUsers()
        console.log(users, "users cont")
        res.status(200).send(users)
    }
    catch(err){
        next(err)
    }
}