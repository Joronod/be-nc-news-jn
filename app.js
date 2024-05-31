const express = require("express");

const { getAllTopics } = require("./controllers/topics.controllers")
const { getAllEndpoints } = require("./controllers/endpoints.controllers")
const { getAllArticles, getArticleById } = require("./controllers/articles.controllers")
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId } = require("./controllers/comments.controllers")

const app = express()

app.use(express.json());

app.get("/api/topics", getAllTopics)

app.get("/api", getAllEndpoints)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postCommentByArticleId)

app.delete("/api/comments/:comment_id", deleteCommentByCommentId)

app.use((err, req, res, next)=>{
  if (err.code === "22P02"){
    res.status(400).send({msg: "Bad request"})
  }
  if(err.msg){
    res.status(err.status).send({msg: err.msg})
  }
  if(err.code === "23503"){
    res.status(404).send({msg: "Not Found"})
  }
})


module.exports = app