const { notify, post } = require("../app");
const db = require("../db/connection")
const format = require("pg-format");

exports.selectArticleById = (article_id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows })=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows[0]
    })
}

exports.selectAllArticles = ()=>{
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC;`)
    .then(({ rows })=>{
        return rows
    })
}

exports.checkArticleExists = (article_id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows })=>{
        if(rows.length === 0){
               return Promise.reject({ status: 404, msg:"Not Found" })
        };
        return rows[0]
    })
}


exports.updateArticleByArticleId = (article_id, vote)=>{
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [vote, article_id])
    .then(({ rows })=>{
        return rows[0]
    })

}

exports.selectArticlesByQuery = (query)=>{
    let queryValues = [];
    let queryStr = "SELECT * FROM articles"
    if(query){
        queryValues.push(query)
        queryStr += ` WHERE topic LIKE $1;`
    }
    return db
    .query(queryStr, queryValues)
    .then(({ rows })=>{
        return rows
    })
}
