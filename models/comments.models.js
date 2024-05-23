const db = require("../db/connection")
const format = require("pg-format");

exports.selectNumberOfComments = (articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [articleId])
    .then(({ rows })=>{
        return rows.length
    }).catch((err)=>{
        if(err.code === "42P01"){
            return 0
        }else return err
    })
}

exports.selectCommentsByArticleId = (articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [articleId])
  .then(({ rows })=>{
    return rows
    })
}

exports.insertNewCommentByArticleId = (article_id, newComment) =>{
    console.log(newComment)
    const body = newComment.body
    const author = newComment.username
    const article_idAsNum = Number(article_id)
    const insertValues = [body, author, article_idAsNum]
    console.log(insertValues)


    return db.query(
        `INSERT INTO comments (body, author, article_id)
        VALUES ($1, $2, $3,) RETURNING body;`, [body, author, article_idAsNum])
    .then(({ rows })=>{
        console.log(rows, "<---addedcomment")
        return rows[0]
    })
}