const { selectAllArticles, selectArticleById, updateArticleByArticleId, checkArticleExists, selectArticlesByQuery } = require("../models/articles.models")
const { selectNumberOfComments } = require("../models/comments.models")

exports.getArticleById = async (req, res, next) => {
    const { article_id } = req.params
    try{
        const article = await selectArticleById(article_id)
        const noOfComments = await selectNumberOfComments(article_id)
        Promise.all([article, noOfComments])
        res.status(200).send({ article: { ...article, comments: noOfComments } })
    } catch(err) {
        next(err)
    }
}

exports.getAllArticles = async (req, res, next) => {
    const { topic, sort_by = 'created_at', order = 'desc' } = req.query;
    try {
        let articles;
        if (topic) {
            articles = await selectArticlesByQuery(topic, sort_by, order);
        } else {
            articles = await selectAllArticles(sort_by, order);
        }
        const articlesWithComments = await Promise.all(
            articles.map(async (article) => {
                const noOfComments = await selectNumberOfComments(article.article_id);
                return { ...article, comments: noOfComments };
            })
        );
        res.status(200).send({ articles: articlesWithComments });
    } catch (err) {
        next(err);
    }
};

exports.patchArticleByArticleId = async (req, res, next) => {
    const { article_id } = req.params
    const vote = req.body.inc_votes

    try {
        await checkArticleExists(article_id);
        const updatedArticle = await updateArticleByArticleId(article_id, vote);
        res.status(200).send({ updatedArticle })
    } catch (err) {
        next(err)
    }
}
