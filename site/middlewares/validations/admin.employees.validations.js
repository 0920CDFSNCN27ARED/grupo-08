const { body, check } = require('express-validator');
const db = require('../../database/models');

const adminEmployeesValidations = {
    logged: [
        check('roleName')
            .isLength({ min: 3 })
            .withMessage('El nombre del rol debe tener al menos 3 letras.'),
        body('roleName')
            .exists()
            .trim()
            .escape()
            .custom(async (role) => {
                return new Promise(async (resolve, reject) => {
                    const emailExist = await db.AdminRole.findOne({
                        where: { roleName: role },
                    });

                    if (emailExist !== null) {
                        reject(new Error('El rol ya existe'));
                    } else resolve(true);
                });
            }),
    ],
};

module.exports = adminEmployeesValidations;
