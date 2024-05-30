const { SelectCommentsByArticleId } = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");

exports.getCommentsByArticleId = (req, res, next)=>{
    const { article_id } = req.params;

    const promises = [SelectCommentsByArticleId(article_id)]

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
