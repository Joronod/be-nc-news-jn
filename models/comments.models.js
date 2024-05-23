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

exports.selectCommentsByArticleId = (articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [articleId])
  .then(({ rows })=>{
    return rows
    })
}

exports.insertNewCommentByArticleId = (article_id, newComment) =>{
    //created at
    const votes = 0;
    const body = newComment.body;
    const author = newComment.username

    return db.query(
        `INSERT INTO comments (body, votes, author, article_id)
        VALUES ($1, $2, $3, $4) RETURNING *;`,
    [body, votes, author, article_id])
    .then(({ addedComment })=>{
        console.log(addedComment, "<---addedcomment")
        return addedComment[0]
    })
}