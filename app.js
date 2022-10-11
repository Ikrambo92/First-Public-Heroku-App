const express = require("express");
const app = express();
const { getCategories } = require("./controller/controller.js");
app.use(express.json())

app.get('/api/categories', getCategories);

app.all('/*', (req, res) => {
    res.status(404).send({msg: "invalid endpoint"})
})

module.exports = app;