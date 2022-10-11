const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("200: responds with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toHaveLength(4)
        body.categories.forEach((category) => {
          expect(category).toEqual(expect.objectContaining({
            "slug" : expect.any(String),
            "description" : expect.any(String)
          }))
        })
      });
  });
});

describe("GET /api/bananas", () => {
  test("404: responds with an error", () => {
    return request(app)
      .get("/api/bananas")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "invalid endpoint"});
      });
  });
});