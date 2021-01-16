const writeJsonFile = require('../../helpers/writeJsonFile');
const readJsonFile = require('../../helpers/readJsonFile');

const userControllers = {
    login: (req, res) => {
        res.render('admin/pages/user/login.ejs')
    }
}

module.exports = userControllers;