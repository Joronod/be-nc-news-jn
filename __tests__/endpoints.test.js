const request = require("supertest")
const app = require("../app")
const db = require("../db/connection");
const seed = require("../db//seeds/seed");
const data = require("../db/data/test-data");
// const Test = require("supertest/lib/test");

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
    test.only("200: responds with an object describing all endpoints", ()=>{
        return request(app)
        .get("/api")
        .expect(200)
        .then((body)=>{
            console.log(body);
            "key" in body;
            expect("description" in body).toBe(true)
            expect("queries" in body).toBe(true)
            expect("exampleResponse" in body).toBe(true)
                     
        })
    })
})