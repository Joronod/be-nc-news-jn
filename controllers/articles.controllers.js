const { selectAllArticles, selectArticleById, updateArticleByArticleId, checkArticleExists, selectArticlesByQuery } = require("../models/articles.models")
const { selectNumberOfComments } = require("../models/comments.models")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    return selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAllArticles = async (req, res, next) => {
    const { query } = req.query;
    try {
        if (query) {
            const articlesWithQuery = await selectArticlesByQuery(query);
            const articlesWithComments = await Promise.all(
                articlesWithQuery.map(async (article) => {
                    const noOfComments = await selectNumberOfComments(article.article_id);
                    return { ...article, comments: noOfComments };
                })
            );
            return res.status(200).send({ articles: articlesWithComments });
        }
        
        const articles = await selectAllArticles();
        const articlesWithComments = await Promise.all(
            articles.map(async (article) => {
                const noOfComments = await selectNumberOfComments(article.article_id);
                return { ...article, comments: noOfComments };
            })
        );
        res.status(200).send({ articles: articlesWithComments });
    } catch (err) {
        next(err)
    }
}

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
