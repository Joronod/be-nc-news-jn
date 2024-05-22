const { selectArticleById } = require("../models/articles.models")

exports.getArticleById = (req, res, next) =>{
    const { article_id } = req.params
    
    console.log(article_id)
    return selectArticleById(article_id)
    .then((article)=>{
        res.status(200).send(article[0])
    })
    .catch((err)=>{
        next(err)
    })
}