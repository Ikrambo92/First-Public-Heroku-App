const db = require("../db/connection");

function selectCategories() {
  return db.query(`SELECT * FROM categories`).then(({rows}) => {
    return rows;
  });
}

function selectReviewById(reviewId) {
  return db
    .query(
      `SELECT reviews.*, count(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;`,
      [reviewId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function selectUsers() {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}

function updateReviewById(reviewId, inc_votes) {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
      [inc_votes, reviewId]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function selectReviews(category) {
  if (category) {
    return db
      .query(
        `SELECT reviews.*, count(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      WHERE category = $1
      GROUP BY reviews.review_id;`,
        [category]
      )
      .then(({ rows }) => {
        return rows;
      });
  } else {
    return db
      .query(
        `SELECT reviews.*, count(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      GROUP BY reviews.review_id;`
      )
      .then(({ rows }) => {
        return rows;
      });
  }
}


module.exports = { selectCategories, selectReviewById, selectUsers, updateReviewById, selectReviews };