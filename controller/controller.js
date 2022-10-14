const {
  selectCategories,
  selectReviewById,
  selectUsers,
  updateReviewById,
  selectReviews
} = require("../model/model.js");

function getCategories(req, res, next) {
    selectCategories().then((categories) => {
        res.status(200).send({categories})
    }).catch(next)
}

function getReviewById(req, res, next) {
  const reviewId = req.params.review_id;
  selectReviewById(reviewId)
    .then((reviews) => {
      if (!reviews) {
        res.status(404).send({ msg: "not found" });
      }
      res.status(200).send({ reviews });
    })
    .catch(next);
}

function getUsers(req, res, next) {
    selectUsers()
    .then((users) => {
        res.status(200).send({ users });
    })
    .catch(next);
}

function patchReviewById(req, res, next) {
  const reviewId = req.params.review_id;
  const inc_votes = req.body.inc_votes;
  updateReviewById(reviewId, inc_votes)
    .then((votes) => {
      if (typeof inc_votes !== "number") {
        res.status(400).send({ msg: "Bad request" });
      }
      res.status(200).send({ votes });
    })
    .catch(next);
}

function getReviews(req, res, next) {
  const category = req.query.category;
  selectReviews(category)
    .then((reviews) => {
      if (category) {
        if (reviews.length === 0) {
          res.status(404).send({ msg: "not found" });
        }
      }
      res.status(200).send({ reviews });
    })
    .catch(next);
}


module.exports = { getCategories, getReviewById, getUsers, patchReviewById, getReviews }
