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
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" })
      }
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

function selectComments(reviewId) {
  return db
    .query(
      `SELECT * FROM comments
      WHERE review_id=$1`,
      [reviewId]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function insertComment(reviewId, username, body) {
  return db
    .query(
      `INSERT INTO comments (author, review_id, body) VALUES ($1, $2, $3) RETURNING *`,
      [username, reviewId, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}


module.exports = { selectCategories, selectReviewById, selectUsers, updateReviewById, selectReviews, selectComments, insertComment };