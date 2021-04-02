const { body, check } = require('express-validator');
const db = require('../../database/models');

const customerValidations = {
    registered: [
        check('first_name')
            .isLength({ min: 3 })
            .withMessage('El nombre debe tener al menos 3 letras.'),
        check('last_name')
            .isLength({ min: 3 })
            .withMessage('El apellido debe tener al menos 3 letras.'),
        check('email').isEmail().withMessage('El email no es valido'),
        body('email_confirm').custom((val, { req }) => {
            if (val !== req.body.email) {
                throw new Error('Los emails deben de ser iguales');
            }

            return true;
        }),
        check('password')
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
    logged: [
        check('email').isEmail().withMessage('El email no es valido'),
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
                        resolve(true);
                    } else reject(new Error('Las credenciales son incorrectas'));
                });
            }),
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
                        resolve(true);
                    } else reject(new Error('Las credenciales son incorrectas'));
                });
            }),
    ],
};

module.exports = customerValidations;
