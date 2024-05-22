const fs = require("fs/promises")

exports.getAllEndpoints = (req, res, next)=>{
    return fs.readdir("../be-nc-news")
    .then(()=>{
       return fs.readFile("endpoints.json")
    })
    .then((results)=>{
        return res.status(200).send({status: 200, msg: JSON.parse(results)})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
}
