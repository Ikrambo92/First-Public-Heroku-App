const express = require("express");
const app = express();
const { getCategories, getReviewById, getUsers, patchReviewById, getReviews, getComments, postComment} = require("./controller/controller.js");
app.use(express.json())

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewById);

app.get("/api/users", getUsers);

app.patch("/api/reviews/:review_id", patchReviewById);

app.get('/api/reviews/', getReviews);

app.get("/api/reviews/:review_id/comments", getComments);

app.post("/api/reviews/:reviews_id/comments", postComment);

app.use((err, req, res, next) => {
  const codes = ["22P02", "23502"];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
      next(err)
    }
})

app.use((req, res, next) => {
  if (res.status(404)) {
    res.status(404).send({ msg: "not found" });
  }
});

app.all('/*', (req, res) => {
    res.status(404).send({msg: "invalid endpoint"})
})

module.exports = app;
