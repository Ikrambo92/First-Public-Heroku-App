const { selectCategories } = require('../model/model.js');

function getCategories(req, res, next) {
    selectCategories().then((categories) => {
        res.status(200).send({categories})
    }).catch(next)
}




module.exports = { getCategories }