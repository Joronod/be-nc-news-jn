const db = require("../db/connection")
const fs = require("fs/promises")

exports.selectAllEndpoints = ()=>{
    return fs.readFile("be-nc-news/endpoints.json", "utf-8")
}