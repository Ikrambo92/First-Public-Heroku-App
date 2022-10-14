const express = require("express");
const app = express();
const { getCategories, getReviewById, getUsers, patchReviewById, getReviews} = require("./controller/controller.js");
app.use(express.json())

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewById);

app.get("/api/users", getUsers);

app.patch("/api/reviews/:review_id", patchReviewById);

app.get('/api/reviews/', getReviews);

app.use((err, req, res, next) => {
  const codes = ["22P02", "23502"];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((req, res, next) => {
  if (res.status(404)) {
    res.status(404).send({ msg: "not found" });
  }
});

app.all('/*', (req, res) => {
    res.status(404).send({msg: "invalid endpoint"})
})

module.exports = app;
