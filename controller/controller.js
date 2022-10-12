const { selectCategories, selectReviews } = require('../model/model.js');

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

module.exports = { getCategories, getReviews }
