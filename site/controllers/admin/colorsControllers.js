const jsonFile = require('../../helpers/jsonFile');
const returnColorsFormated = require('../../helpers/returnColorsFormated');
const db = require('../../database/models');

const colorsControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const color = await db.Color.findOne({
                where: { id: id },
            });

            if (!color) {
                return res.redirect('/admin/?error_al_traer_color_' + id);
            }

            const colors = await db.Color.findAll();
            const allColors = colors.map((color) => color.dataValues);

            return res.render('admin/pages/colors/colors-list', {
                color,
                colorsHTML: returnColorsFormated.asHTML(allColors, '/admin/c/colores'),
            });
        } catch (err) {
            console.log('Hubo un error al traer el color --> ', err);
            return res.redirect('/admin/?error_al_traer_color_' + id);
        }
    },
    getAll: async (req, res) => {
        try {
            const colors = await db.Color.findAll();
            const allColors = colors.map((color) => color.dataValues);

            return res.render('admin/pages/colors/colors-list', {
                colorsHTML: returnColorsFormated.asHTML(allColors, '/admin/c/colores'),
            });
        } catch (err) {
            console.log('Hubo un error al traer los colores --> ', err);
            return res.redirect('/admin');
        }
    },
    create: async (req, res) => {
        const { colorName } = req.body;

        try {
            const color = db.Color.create({
                colorName,
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al crear el color --> ', err);
            return res.send({ status: 400 });
        }
    },
    update: async (req, res) => {
        const { id, colorName } = req.body;

        try {
            await db.Color.update(
                {
                    id,
                    colorName,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al actualizar el color --> ', err);
            return res.redirect('/admin/?error_al_actualizar_color_' + id);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            await db.Color.destroy({
                where: {
                    id: id,
                },
            });
            res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar color --> ', err);
            return res.redirect('/admin/?error_al_borrar_color_' + id);
        }
    },
};

module.exports = colorsControllers;
