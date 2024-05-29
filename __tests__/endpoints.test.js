const request = require("supertest")
const app = require("../app")
const db = require("../db/connection");
const seed = require("../db//seeds/seed");
const data = require("../db/data/test-data");
// const Test = require("supertest/lib/test");
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
    test.only("200: responds with an article when given a valid article ID", ()=>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body })=>{
            expect(body).toMatchObject({
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
})