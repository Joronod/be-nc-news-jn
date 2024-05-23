const { SelectCommentsByArticleId } = require("../models/comments.models")

exports.getCommentsByArticleId = async (req, res, next)=>{
    const { article_id } = req.params;
    return SelectCommentsByArticleId(article_id)
    .then((comments)=>{
        res.status(200).send({comments})
    })
    .catch((err)=>{
        next(err)
    })
}
