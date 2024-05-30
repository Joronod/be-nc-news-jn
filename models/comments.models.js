const db = require("../db/connection")
const format = require("pg-format");

exports.selectNumberOfComments = (articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [articleId])
    .then(({ rows })=>{
        return rows.length
    }).catch((err)=>{
        if(err.code = "42P01"){
            return 0
        }else return err
    })
}

exports.SelectCommentsByArticleId = (articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [articleId])
  .then(({ rows })=>{
    return rows
    })
}