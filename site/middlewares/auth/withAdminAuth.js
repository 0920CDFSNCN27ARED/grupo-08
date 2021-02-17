const jsonFile = require('../../helpers/jsonFile');

function withAdminAuth(req, res, next) {
    if(req.session.adminId) {
        if(req.session.adminId && res.locals.curAdmin) return next();

        const allAdmins = jsonFile.read('../db/admin_users.json');
        const curAdmin = allAdmins.find(admin => admin.id == req.session.adminId);

        res.locals.curAdmin = curAdmin;

        return next();
    };

    //delete req.session.adminId; return res.redirect(301, '/admin/user/login');

    let userSession = req.session.adminId;
    let userCookies = (req.cookies !== undefined && req.cookies.rememberMe) ? req.cookies.rememberMe : undefined;

    if(userSession === undefined) return res.redirect(301, '/admin/user/login');

    const allAdmins = jsonFile.read('../db/admin_users.json');
    const curAdmin = allAdmins.find(admin => admin.id == userSession);

    if(curAdmin === undefined) {
        delete req.session.adminId;
        return res.redirect(301, '/admin/user/login');
    }

    req.session.adminId = curAdmin.id;
    res.locals.curAdmin = curAdmin;

    console.log('estoy aca');
    next();
}

module.exports = withAdminAuth; 