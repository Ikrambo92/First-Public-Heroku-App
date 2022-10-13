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

        expect(body.categories).toHaveLength(4);
        body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/bananas", () => {
  test("404: responds with an error", () => {
    return request(app)
      .get("/api/bananas")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({msg: "not found",});
      });
  });
});

describe("GET api/reviews/1", () => {
  test("should return ", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual(
          expect.objectContaining({
            title: "Agricola",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Farmyard fun!",
            review_id: 1,
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1,
          })
        );
      });
  });
});

describe("GET /api/reviews/one", () => {
  test("400: should return bad request", () => {
    return request(app)
    .get("/api/reviews/one")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request" });
      });
    });
});

describe("GET /api/reviews/999999", () => {
  test("404: should return not found", () => {
    return request(app)
    .get("/api/reviews/999999")
    .expect(404)
    .then(({ body }) => {
      expect(body).toEqual({ msg: "not found" });
      });
  });
});

describe("GET /api/users", () => {
  test("200: should return an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              avatar_url: expect.any(String),
              name: expect.any(String),
            })
          );
        });
      });
    });
  });
  
describe("GET /api/12", () => {
  test("404: should return not found", () => {
    return request(app)
    .get("/api/12")
    .expect(404)
    .then(({ body }) => {
      expect(body).toEqual({ msg: "not found" });
    });
  });
});


describe("PATCH /api/reviews/1", () => {
  test("200: should return the updated review", () => {
    return request(app)
    .patch("/api/reviews/1")
    .send({ inc_votes: 1 })
    .expect(200)
      .then(({ body }) => {
        expect(body.votes).toEqual(
          expect.objectContaining({
            title: "Agricola",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Farmyard fun!",
            review_id: 1,
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 2,
          })
        );
      });
    });
  });
  
  describe("PATCH /api/reviews/one", () => {
  test("400: should return bad request", () => {
    return request(app)
    .patch("/api/reviews/one")
    .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request" });
      });
    });
  });
  
describe("PATCH /api/reviews/1", () => {
  test("400: should return bad request", () => {
    return request(app)
    .patch("/api/reviews/1")
    .send({ inc_votes: "one" })
    .expect(400)
    .then(({ body }) => {
      expect(body).toEqual({ msg: "Bad request" });
    });
  });
});

describe("GET api/reviews/2", () => {
  test("should return ", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual(
          expect.objectContaining({
            comment_count: expect.any(String),
          })
        );
      });
  });
});