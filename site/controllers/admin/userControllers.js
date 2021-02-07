const jsonFile = require('../../helpers/jsonFile');
const bcrypt = require('bcrypt');
const handleCreateId = require('../../helpers/handleCreateId');

const userControllers = {
    login: (req, res) => {
        res.render('admin/pages/user/login.ejs')
    },
    logged: (req, res) => {
        const errors = [];
        const { username, password, persist_session } = req.body;

        const allUsers = jsonFile.read('../db/admin_users.json');
        const user = allUsers.find(user => {
            return (
                user.username === username &&
                bcrypt.compareSync(password, user.password)
            )
        });

        if(!user) {
            errors.push('Credenciales incorrectas');
            res.render('admin/pages/user/login.ejs', {errors})
            return;
        }

        // Guardo el login en la db
        allUsers.forEach(_user => {
            if(_user.id == user.id) {
                user.last_login_date = Date.now();
            }
        });
        jsonFile.write(allUsers, '../db/admin_users.json');

        // Mantener sesion
        if(persist_session) {
            req.session.loggedAdminId = user.id;
        }
        

        
        
        //res.redirect('/admin');
    },
    register: (req, res) => {
        res.render('admin/pages/user/register.ejs')
    },
    create: (req, res)=> {
        const errors = [];
        const {
            first_name,
            last_name,
            email,
            username,
            password,
            password_confirm,
            status,
            permissions
        } = req.body;

        if(password !== password_confirm) {
            errors.push('Las contraseñas no son iguales')
            res.render('admin/pages/user/register.ejs', {errors});
        }
        
        const allUsers = jsonFile.read('../db/admin_users.json');
        allUsers.forEach(user => {
            if(user.email === email) errors.push('El email ya esta registrado');
            if(user.username === username) errors.push('El username ya esta registrado');
        });

        if(errors.length > 0) {
            res.render('admin/pages/user/register.ejs', {errors})
            return;
        }

        const user = {
            id: handleCreateId(allUsers),
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: bcrypt.hashSync(password, 12),
            created_at: Date.now(),
            last_login_date: '',
            status: status,
            permissions: permissions
        }
        allUsers.push(user);

        jsonFile.write(allUsers, '../db/admin_users.json');
        res.redirect('/admin')

    }
}

module.exports = userControllers;