const jsonFile = require('../../helpers/jsonFile');

function withAdminAuth(req, res, next) {
    let userSession = req.session.adminId;
    let userCookies = (req.cookies !== undefined && req.cookies.rememberMe) ? req.cookies.rememberMe : undefined;

    if(userSession === undefined) return res.redirect(301, '/admin/user/login');

    const allAdmins = jsonFile.read('../db/admin_users.json');
    const curAdmin = allAdmins.find(admin => admin.id == userSession);

    if(curAdmin === undefined) {
        delete req.session.adminId;
        req.curAdmin = null;
        res.locals.curAdmin = curAdmin;

        return res.redirect(301, '/admin/user/login');
    }

    req.session.adminId = curAdmin.id;
    req.curAdmin = curAdmin;
    res.locals.curAdmin = curAdmin;

    next();
}

module.exports = withAdminAuth; 