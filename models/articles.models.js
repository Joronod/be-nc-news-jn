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

exports.selectAllArticles = (sort_by = 'created_at', order = 'desc') => {
    const validSortColumns = ['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'article_img_url'];
    if (!validSortColumns.includes(sort_by)) {
        sort_by = 'created_at';
    }
    const validOrder = ['asc', 'desc'];
    if (!validOrder.includes(order)) {
        order = 'desc';
    }
    const queryStr = format(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY %I %s;`, sort_by, order);
    return db.query(queryStr)
        .then(({ rows }) => {
            return rows;
        });
};

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

exports.selectArticlesByQuery = (topic, sort_by = 'created_at', order = 'desc') => {
    const validSortColumns = ['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'article_img_url'];
    if (!validSortColumns.includes(sort_by)) {
        sort_by = 'created_at';
    }
    const validOrder = ['asc', 'desc'];
    if (!validOrder.includes(order)) {
        order = 'desc';
    }
    const queryStr = format(`SELECT * FROM articles WHERE topic = $1 ORDER BY %I %s;`, sort_by, order);
    return db.query(queryStr, [topic])
        .then(({ rows }) => {
            return rows;
        });
};