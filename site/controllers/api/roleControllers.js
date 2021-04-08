const db = require('../../database/models');
const { validationResult } = require('express-validator');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});
/* 
    res.send(errRes(err));
*/

const roleControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const role = await db.AdminRole.findOne({
                where: {
                    id: id,
                },
            });

            return res.send({
                status: 200,
                statusText: 'Ok',
                role,
            });
        } catch (err) {
            res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            let roles = await db.AdminRole.findAll();

            return res.send({
                status: 200,
                statusText: 'Ok',
                count: roles.length,
                roles,
            });
        } catch (err) {
            res.send(errRes(err));
        }
    },
    created: async (req, res) => {
        const { roleName } = req.body;

        const evErrors = validationResult(req);
        if (!evErrors.isEmpty()) {
            return res.send({
                status: 409,
                statustext: 'Conflict',
                errors: evErrors.errors,
            });
        }

        try {
            let role = await db.AdminRole.create({
                roleName: roleName,
            });

            return res.send({
                status: 201,
                statusText: 'Created',
                role,
            });
        } catch (err) {
            res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const { id, roleName } = req.body;

        const evErrors = validationResult(req);
        if (!evErrors.isEmpty()) {
            return res.send({
                status: 409,
                statustext: 'Conflict',
                errors: evErrors.errors,
            });
        }

        try {
            let newRole = await db.AdminRole.update(
                {
                    roleName: roleName,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            newRole = newRole.dataValues;

            return res.send({
                status: 204,
                statusText: 'No content',
            });
        } catch (err) {
            res.send(errRes(err));
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

            return res.send({
                status: 204,
                statusText: 'No content',
            });
        } catch (err) {
            res.send(errRes(err));
        }
    },
};

module.exports = roleControllers;
