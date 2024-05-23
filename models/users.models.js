const db = require("../db/connection")
const format = require("pg-format");

exports.selectAuthorByUsername = (username) =>{
    return db.query(`SELECT name FROM users WHERE username = $1;`, [username])
    .then(({ rows })=>{
    const author = rows[0].name
    return author
    })
}