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
    test("200: responds with an array that is ordered by date created in descending order", ()=>{
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body;
            expect(comments).toEqual([])
        })
    })
})

// describe("POST: /api/articles/:article_id/comments", ()=>{
//     test.only("201: Adds a comment to the comment table and responds with the new comment", ()=>{
//         const comment = {
//             username: "Obi-John--Kenobi",
//             body: "Hello there"
//         };
//         return request(app)
//         .post("/api/articles/1/comments")
//         .send(comment)
//         .expect(201)
//         .then(({ body })=>{
//             console.log(body)
//             expect(body).toMatchObject({
//                 postedComment: "Hello there"
//             })
//         })
//     })
// })