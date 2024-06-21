const request = require("supertest")
const app = require("../app")
const db = require("../db/connection");
const seed = require("../db//seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json")



afterAll(() => {
    return db.end();
  });
  
  beforeEach(() => {
    console.log("seeding!");
    return seed(data);
  });

describe("Get: /api/topics", ()=>{
    test("200: responds with an array of all topics", ()=>{
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body })=>{
            expect(body).toHaveLength(3)
            body.forEach((topic)=>{
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                })
            })
        })
    })
})

describe("GET: /api", ()=>{
    test("200: responds with an object describing all endpoints", ()=>{
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body })=>{
            const { msg } = body
            expect(msg).toEqual(endpoints)  
        })
    })
})

describe("GET: /api/articles/:article_id", ()=>{
    test("200: responds with an article when given a valid article ID", ()=>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body })=>{
            expect(body.article).toMatchObject({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                comments: 11           
            })
        })
    })
    test("404: ERROR - responds with an error when the id is valid, but does not exist", ()=>{
        return request(app)
        .get("/api/articles/9876")
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: ERROR - responds with an error when an invalid id is used", ()=>{
        return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
})

describe("GET: /api/articles", ()=>{
    test("200: responds with an array of all stored articles", ()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body })=>{
            const { articles } = body;
            expect(articles).toHaveLength(13)
            articles.forEach((article)=>{
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comments : expect.any(Number)     
                })
            })
        })
    })
    test("200: responds with an array that is ordered by date created in descending order", ()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body })=>{
            const { articles } = body;
            expect(articles[0].created_at).toBe("2020-11-03T09:12:00.000Z")
            expect(articles).toBeSortedBy("created_at", {
                descending: true
            })
        })
    })
    test("200: responds with articles sorted by title in ascending order", () => {
        return request(app)
            .get("/api/articles?sort_by=title&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("title", { ascending: true });
            });
    });

    test("200: responds with articles sorted by title in descending order", () => {
        return request(app)
            .get("/api/articles?sort_by=title&order=desc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("title", { descending: true });
            });
    });

    test("200: responds with articles sorted by votes in ascending order", () => {
        return request(app)
            .get("/api/articles?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("votes", { ascending: true });
            });
    });

    test("200: responds with articles sorted by votes in descending order", () => {
        return request(app)
            .get("/api/articles?sort_by=votes&order=desc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("votes", { descending: true });
            });
    });

    test("200: responds with articles sorted by created_at when given an invalid sort_by parameter", () => {
        return request(app)
            .get("/api/articles?sort_by=invalid_column")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("created_at", { descending: true });
            });
    });

    test("200: responds with articles sorted in descending order when given an invalid order parameter", () => {
        return request(app)
            .get("/api/articles?order=invalid_order")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("created_at", { descending: true });
            });
    });

})

describe("GET: /api/articles/:article_id/comments", ()=>{
    test("200: responds with an array of comments relating to the given article", ()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body
            expect(comments).toHaveLength(11)
            comments.forEach((comment)=>{
                expect(comment.article_id).toBe(1)
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    created_at: expect.any(String)
                })
            })
        })
    })
    test("200: responds with an array that is ordered by date created in descending order", ()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body;
            expect(comments[0].created_at).toBe("2020-11-03T21:00:00.000Z")
            expect(comments).toBeSortedBy("created_at", {
                descending: true
            })
        })
    })

    test("404: ERROR - responds with an error when the id is valid, but does not exist", ()=>{
        return request(app)
        .get("/api/articles/9876/comments")
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: ERROR - responds with an error when an invalid id is used", ()=>{
        return request(app)
        .get("/api/articles/not-an-id/comments")
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("200: when valid ID, but has no comments responds with an empty array of comments", ()=>{
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body;
            expect(comments).toEqual([])
        })
    })
})

describe("POST: /api/articles/:article_id/comments", ()=>{
    test("201: Adds a comment to the comment table and responds with the new comment", ()=>{
        const comment = {
            username: "lurker",
            body: "Hello there"
        };
        return request(app)
        .post("/api/articles/1/comments")
        .send(comment)
        .expect(201)
        .then(({ body })=>{
            expect(body.postedComment).toMatchObject({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
                created_at: expect.any(String),
              });
        })
    })
    test("404: ERROR - responds with an error when the id is valid, but does not exist", ()=>{
        const comment = {
            username: "lurker",
            body: "Hello there"
        }
        return request(app)
        .post("/api/articles/9876/comments")
        .send(comment)
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: ERROR - responds with an error when an invalid id is used", ()=>{
        const comment = {
            username: "lurker",
            body: "Hello there"
        }
        return request(app)
        .post("/api/articles/chickenNuggets/comments")
        .send(comment)
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("404: ERROR - responds with an error when an invalid or missing field is used", ()=>{
        const comment = {
            username: "Thom",
            body: "for a minute there, I lost myself"
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(comment)
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
})

describe("PATCH: /api/articles/:article_id", ()=>{
    test("200: Responds with the updated article", ()=>{
        const updatedVotes = {
            inc_votes : 66
        }
        return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(200)
        .then(({ body })=>{
            expect(body.updatedArticle).toMatchObject({
                article_id : 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 166,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
        })
    })
    test("400: ERROR responds with error message when a number is not passed for the body", ()=>{
        const updatedVotes = {
            inc_votes : "sixtySix"
        }
        return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("404: ERROR - responds with an error when the id is valid, but does not exist", ()=>{
        const updatedVotes = {
            inc_votes : 66
        }
        return request(app)
        .patch("/api/articles/9876")
        .send(updatedVotes)
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: ERROR - responds with an error when an invalid id is used", ()=>{
        const updatedVotes = {
            inc_votes : 66
        }
        return request(app)
        .patch("/api/articles/not-an-id")
        .send(updatedVotes)
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("400: ERROR - responds with an error when an empty body is used", ()=>{
        const updatedVotes = {
        }
        return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
})

describe("DELETE: /api/comments/:comment_id", ()=>{
    test("204: Should return with a status and no content, having removed the comment",()=>{
        return request(app)
        .delete("/api/comments/2")
        .expect(204)
    })
    test("404: ERROR should respond with an error when the id is valid but does not exist", ()=>{
        return request(app)
        .delete("/api/comments/9876")
        .expect(404)
        .then(({ body })=>{
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: ERROR should respond with an error when invalid comment_id is used", ()=>{
        return request(app)
        .delete("/api/comments/notAComment")
        .expect(400)
        .then(({ body })=>{
            expect(body.msg).toBe("Bad request")
        })
    })
})

describe("Get: /api/users", ()=>{
    test("200: responds with an array of all users", ()=>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body })=>{
            expect(body).toHaveLength(4)
            body.forEach((user)=>{
                expect(user).toMatchObject({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
    })
})
describe("Get: /api/articles/topicQuery", ()=>{
    test("200: responds with a array of articles filtered to include the topic", ()=>{
        return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body })=>{
            const { articles } = body
            expect(articles).toHaveLength(12)
            articles.forEach((article)=>{
                expect(article.topic).toBe("mitch");
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comments : expect.any(Number)
                })
            })
        })
    })
    test("200: responds with an empty array when no articles match the query", () => {
        return request(app)
        .get("/api/articles?topic=notatopic")
        .expect(200)
        .then(({ body }) => {
            const { articles } = body;
            expect(articles).toEqual([]);
        })
    })
})

