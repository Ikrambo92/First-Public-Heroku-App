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

module.exports = { selectCategories, selectReviews, selectUsers };