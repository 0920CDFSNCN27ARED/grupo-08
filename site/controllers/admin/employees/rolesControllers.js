const jsonFile = require('../../../helpers/jsonFile');
const db = require('../../../database/models');
const { validationResult } = require('express-validator');

const adminRolesControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const roles = await db.AdminRole.findAll();
            const role = await db.AdminRole.findOne({
                where: {
                    id: id,
                },
            });

            return res.render('admin/pages/employees/roles', { roles, role });
        } catch (err) {
            console.log('Hubo un error al traer un rol');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, '/admin/employees/crear-rol');
        }
    },
    getAll: async (req, res) => {
        try {
            console.log('paso aca');
            const roles = await db.AdminRole.findAll();
            return res.render('admin/pages/employees/roles', { roles });
        } catch (err) {
            console.log('Hubo un error al traer los rol');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            X;
            res.redirect(500, '/admin/employees/crear-rol');
        }
    },
    created: async (req, res) => {
        const { roleName } = req.body;

        const evErrors = validationResult(req);
        if (!evErrors.isEmpty()) {
            const roles = await db.AdminRole.findAll();
            return res.render('admin/pages/employees/roles', {
                roles,
                errors: evErrors.errors,
            });
        }

        try {
            db.AdminRole.create({
                roleName: roleName,
            });

            res.redirect('/admin/employees/crear-rol');
        } catch (err) {
            console.log('Hubo un error al crear un rol');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(301, '/admin/employees/crear-rol');
        }
    },
    update: async (req, res) => {
        const { id, roleName } = req.body;

        const evErrors = validationResult(req);
        if (!evErrors.isEmpty()) {
            const roles = await db.AdminRole.findAll();
            return res.render('admin/pages/employees/roles', {
                roles,
                errors: evErrors.errors,
            });
        }

        try {
            const newRole = await db.AdminRole.update(
                {
                    roleName: roleName,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.redirect(301, '/admin/employees/crear-rol');
        } catch (error) {
            console.log('Hubo un error al actualizar un rol');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, '/admin/employees/crear-rol');
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            const role = await db.AdminRole.destroy({
                where: {
                    id: id,
                },
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar un rol');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, '/admin/employees/crear-rol');
        }
    },
};

module.exports = adminRolesControllers;
