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
    const body = newComment.body
    const author = newComment.username
    return db.query(
        `INSERT INTO comments (body, author, article_id)
        VALUES ($1, $2, $3) RETURNING *;`, [body, author, article_id])
    .then(({ rows })=>{
        return rows[0]
    })
}

exports.selectCommentsByCommentId = (comment_id) =>{
    console.groupCollapsed(comment_id, "comment_id in selectComment")
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then(({ rows })=>{
        console.log(rows, "rows in selectComment")
        if(rows.length === 0){
            return Promise.reject({ status: 404, msg:"Not Found" })
        };
    return rows[0]
    })
}

exports.deletingCommentByCommentId = (comment_id) =>{
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id])
    .then(({ rows })=>{
        console.log(rows, "rows in deleting Comments")
        return rows[0]
    })

}