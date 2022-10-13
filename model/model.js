const db = require("../db/connection");

function selectCategories() {
  return db.query(`SELECT * FROM categories`).then(({rows}) => {
    return rows;
  });
}

function selectReviews(reviewId) {
  return db.query(`SELECT * FROM reviews where review_id = $1`, [reviewId]).then(({ rows }) => {
    return rows[0];
  });
}

function selectUsers() {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}

function newVote(reviewId, inputVote) {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
      [inputVote, reviewId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { selectCategories, selectReviews, selectUsers, newVote };