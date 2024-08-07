const express = require("express");
const cors = require("cors")

const { getAllTopics } = require("./controllers/topics.controllers")
const { getAllEndpoints } = require("./controllers/endpoints.controllers")
const { getAllArticles, getArticleById, patchArticleByArticleId } = require("./controllers/articles.controllers")
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId } = require("./controllers/comments.controllers")
const { getAllUsers } = require("./controllers/users.controllers")

const app = express()

app.use(cors())

app.use(express.json());

app.get("/api", getAllEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/users", getAllUsers);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    console.log(err);
    res.status(500).send({
      "GET /api": {
        "description": "serves up a json representation of all the available endpoints of the api"
      },
      "GET /api/topics": {
        "description": "serves an array of all topics",
        "queries": [],
        "exampleResponse": {
          "topics": [{ "slug": "football", "description": "Footie!" }]
        }
      },
      "GET /api/users": {
        "description": "serves an array of all users",
        "queries": [],
        "exampleResponse": {
          "users": [{ "username": "butter_bridge",
          "name": "jonny",
          "avatar_url":
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          }]
        }
      },
      "GET /api/articles": {
        "description": "serves an array of all articles, ordered by created_at in descening order, and without the body of the article",
        "queries": ["author", "topic", "sort_by", "order"],
        "exampleResponse": {
          "articles": [
            {
              "title": "Seafood substitutions are increasing",
              "topic": "cooking",
              "author": "weegembump",
              "created_at": "2018-05-30T15:59:13.341Z",
              "votes": 0,
              "comment_count": 6
            }
          ]
        }
      },
      "GET /api/articles/:article_id" : {
        "description": "serves an object containing the article associated with the given article_id and the number of comments it has.",
        "queries" : "A valid article_id Number",
        "exampleResponse" : {
                  "article_id": 1,
                    "title": "Living in the shadow of a great man",
                    "topic": "mitch",
                    "author": "butter_bridge",
                    "body": "I find this existence challenging",
                    "created_at": "2020-07-09T20:11:00.000Z",
                    "votes": 100,
                    "article_img_url":
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                    "comments": 11         
                
        } 
      },
      "GET /api/articles/:article_id/comments" : {
        "description": "serves an array of objects containing the comments associated with the given article_id",
        "queries" : "A valid article_id Number",
        "exampleResponse" : {
          "comment_id": 1,
          "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          "votes": 16,
          "author": "butter_bridge",
          "article_id": 9,
          "created_at": 1586179020000} 
      },
      "POST /api/articles/:article_id/comments" : {
        "description": "allows a user to post a comment to a given article by article number",
        "queries" : "A valid article_id Number, with a body that contains the username and comment",
        "exampleResponse" : {
          "comment_id": 1,
          "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          "votes": 16,
          "author": "butter_bridge",
          "article_id": 9,
          "created_at": 1586179020000} 
        },
        "PATCH /api/articles/:article_id" : {
          "description": "allows a user to patch the number of votes on an article",
          "queries" : "A valid article_id Number, with a body that contains the number of votes to be added/subtracted from the current votes",
          "exampleResponse" : {
            "article_id" : 1,
                      "title": "Living in the shadow of a great man",
                      "topic": "mitch",
                      "author": "butter_bridge",
                      "body": "I find this existence challenging",
                      "created_at": "2020-07-09T20:11:00.000Z",
                      "votes": 166,
                      "article_img_url":
                          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"}
      },
      "DELETE /api/comments/:comment_id" : {
        "description": "allows a user to delete a comment by the comment_id",
        "queries" : "A valid comment_id Number",
        "exampleResponse" : {}
      },
      "GET /api/articles? topic query" : {
        "description": "allows a user to query the articles and return any articles with a matching topic",
          "queries" : "A valid article topic. Invalid topics will return an empty array",
          "exampleResponse" : {
            "article_id": 1,
              "title": "Living in the shadow of a great man",
              "topic": "mitch",
              "author": "butter_bridge",
              "body": "I find this existence challenging",
              "created_at": "2020-07-09T20:11:00.000Z",
              "votes": 100,
              "article_img_url":
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"         
          }
      }
    });
  }
});


module.exports = app