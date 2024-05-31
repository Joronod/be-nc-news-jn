const { selectCommentsByCommentId, selectCommentsByArticleId, insertNewCommentByArticleId, deletingCommentByCommentId } = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");
const { checkUserExists } = require("../models/users.models")

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

    Promise.all([
        insertNewCommentByArticleId(article_id, newComment),
        checkArticleExists(article_id),
        checkUserExists(newComment.username)])
    .then(([postedComment])=>{
        res.status(201).send({ postedComment })
    })
    .catch((err)=>{
        next(err)
    })
}

exports.deleteCommentByCommentId = async (req, res, next)=>{
    const { comment_id } = req.params
    console.log(comment_id)

    try{
        const checkCommentExists = await selectCommentsByCommentId(comment_id)
        const deletedComment = await deletingCommentByCommentId(comment_id)
        res.status(204).end()
    }
    catch(err){
        next(err)
    }
}