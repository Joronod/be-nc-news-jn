const db = require("../db/connection")
const format = require("pg-format");

exports.checkUserExists = (username) =>{
    return db.query(`SELECT name FROM users WHERE username = $1;`, [username])
    .then(({ rows })=>{
        if(rows.length === 0){
            return Promise.reject({ status: 404, msg:"Not Found" })
        };
    })
}