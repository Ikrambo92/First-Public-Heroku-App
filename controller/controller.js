const { selectCategories, selectReviews, selectUsers } = require('../model/model.js');

function getCategories(req, res, next) {
    selectCategories().then((categories) => {
        res.status(200).send({categories})
    }).catch(next)
}

function getReviews(req, res, next) {
  const reviewId = req.params.review_id;
  selectReviews(reviewId)
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

module.exports = { getCategories, getReviews, getUsers }
