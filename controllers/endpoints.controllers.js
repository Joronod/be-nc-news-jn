const { selectAllEndpoints } = require("../models/endpoints.models")

exports.getAllEndpoints = (req, res, next)=>{
    return selectAllEndpoints()
    .then((data)=>{
        console.log(data)
        const parsedEndpoints = JSON.parse((data))
        // console.log(parsedEndpoints)
        return parsedEndpoints
    })
    .then((parsedEndpoints)=>{
        res.status(200).send(parsedEndpoints)
    })
    .catch((err)=>{
        next(err)
    })
}