const { notify } = require("../app");
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

exports.checkArticleExists = async (article_id)=>{
    const { rows } = await db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
        if(!rows.length){
            return Promise.reject({status: 404, msg:"Not Found"})
        };
}