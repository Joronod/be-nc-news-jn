const { selectCommentsByArticleId, insertNewCommentByArticleId } = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");
const { selectAuthorByUsername } = require("../models/users.models")

exports.getCommentsByArticleId = (req, res, next)=>{
    const { article_id } = req.params;

    const promises = [selectCommentsByArticleId(article_id)]

    if(article_id){
        promises.push(checkArticleExists(article_id))
    }
    Promise.all(promises)
    .then((resolvedPromises)=>{
        const comments = resolvedPromises[0];
        res.status(200).send({ comments });
    })
    .catch((err)=>{
        next(err)
    })
}


exports.postCommentByArticleId = async (req, res, next)=>{
    const { article_id } = req.params;
    const newComment = req.body

    const promises = [insertNewCommentByArticleId(article_id, newComment), checkArticleExists(article_id)];
   
    Promise.all(promises)
    .then((resolvedPromises)=>{
        console.log(resolvedPromises)
        const postedComment = resolvedPromises[0];
        res.status(201).send({ postedComment })
    })
    .catch((err)=>{
        next(err)
    })
}