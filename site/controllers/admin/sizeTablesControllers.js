const jsonFile = require('../../helpers/jsonFile');
const returnSizeTablesFormated = require('../../helpers/returnSizeTablesFormated');
const db = require('../../database/models');

const sizeTablesControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const sizeTable = await db.SizeTable.findOne({
                where: { id: id },
            });

            if (!sizeTable) {
                return res.redirect('/admin/?error_al_traer_tabla_' + id);
            }

            const sizeTables = await db.SizeTable.findAll();
            const allSizeTables = sizeTables.map((s) => s.dataValues);

            return res.render('admin/pages/sizeTables/sizeTables-list', {
                sizeTable,
                sizeTablesHTML: returnSizeTablesFormated.asHTML(
                    allSizeTables,
                    '/admin/c/tabla-de-talles'
                ),
            });
        } catch (err) {
            console.log('Hubo un error al traer la tabla --> ', err);
            return res.redirect('/admin/?error_al_traer_tabla_' + id);
        }
    },
    getAll: async (req, res) => {
        try {
            const sizeTables = await db.SizeTable.findAll();
            const allSizeTables = sizeTables.map((s) => s.dataValues);

            return res.render('admin/pages/sizeTables/sizeTables-list', {
                sizeTablesHTML: returnSizeTablesFormated.asHTML(
                    allSizeTables,
                    '/admin/c/tabla-de-talles'
                ),
            });
        } catch (err) {
            console.log('Hubo un error al traer las tablas --> ', err);
            return res.redirect('/admin');
        }
    },
    create: async (req, res) => {
        const { tableName, sizes } = req.body;

        try {
            const sizeTable = db.SizeTable.create({
                tableName,
                sizes,
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al crear la tabla --> ', err);
            return res.send({ status: 400 });
        }
    },
    update: async (req, res) => {
        const { id, tableName, sizes } = req.body;

        try {
            await db.SizeTable.update(
                {
                    id,
                    tableName,
                    sizes,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al actualizar la tabla --> ', err);
            return res.redirect('/admin/?error_al_actualizar_tabla_' + id);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            await db.SizeTable.destroy({
                where: {
                    id: id,
                },
            });
            res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar la tabla --> ', err);
            return res.redirect('/admin/?error_al_borrar_tabla_' + id);
        }
    },
};

module.exports = sizeTablesControllers;
