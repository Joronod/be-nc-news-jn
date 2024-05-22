const express = require("express");

const { getAllTopics } = require("./controllers/topics.controllers")
const { getAllEndpoints } = require("./controllers/endpoints.controllers")
const { getArticleById } = require("./controllers/articles.controllers")

const app = express()

app.use(express.json());

app.get("/api/topics", getAllTopics)

app.get("/api", getAllEndpoints)

app.get("/api/articles/:article_id", getArticleById)

app.use((err, req, res, next)=>{
  if(err.msg){
    res.status(err.status).send({msg: err.msg})
  }else {
  res.status(400).send({msg: "Bad request"})
  }
})


module.exports = app