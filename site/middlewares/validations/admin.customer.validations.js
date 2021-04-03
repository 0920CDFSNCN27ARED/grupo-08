const { body, check } = require('express-validator');
const db = require('../../database/models');

const customerValidations = {
    create: [
        check('firstName')
            .isLength({ min: 3 })
            .withMessage('El nombre debe tener al menos 3 letras.'),
        check('lastName')
            .isLength({ min: 3 })
            .withMessage('El apellido debe tener al menos 3 letras.'),
        check('email').isEmail().withMessage('El email no es valido'),
        check('userPassword')
            .isLength({ min: 5 })
            .withMessage('La contraseña debe tener un mínimo de 5 caracteres'),
        body('email')
            .exists()
            .trim()
            .escape()
            .custom(async (customerEmail) => {
                return new Promise(async (resolve, reject) => {
                    const emailExist = await db.Customer.findOne({
                        where: { email: customerEmail },
                    });

                    if (emailExist !== null) {
                        reject(new Error('El email ya esta registrado'));
                    } else resolve(true);
                });
            }),
    ],
};

module.exports = customerValidations;
