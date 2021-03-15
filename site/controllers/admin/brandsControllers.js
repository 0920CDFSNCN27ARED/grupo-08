const jsonFile = require('../../helpers/jsonFile');
const returnBrandsFormated = require('../../helpers/returnBrandsFormated');
const db = require('../../database/models');

const brandsControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const brand = await db.Brand.findOne({
                where: { id: id },
            });

            if (!brand) {
                return res.redirect('/admin/?error_al_traer_marca_' + id);
            }

            const brands = await db.Brand.findAll();
            const allBrands = brands.map((brand) => brand.dataValues);

            return res.render('admin/pages/brands/brands-list', {
                brand,
                brandsHTML: returnBrandsFormated.asHTML(allBrands, '/admin/c/marcas'),
            });
        } catch (err) {
            console.log('Hubo un error al traer la marca --> ', err);
            return res.redirect('/admin/?error_al_traer_marca_' + id);
        }
    },
    getAll: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();
            const allBrands = brands.map((brand) => brand.dataValues);

            console.log(allBrands);

            return res.render('admin/pages/brands/brands-list', {
                brandsHTML: returnBrandsFormated.asHTML(allBrands, '/admin/c/marcas'),
            });
        } catch (err) {
            console.log('Hubo un error al traer las marcas --> ', err);
            return res.redirect('/admin');
        }
    },
    create: async (req, res) => {
        const { brandName } = req.body;

        try {
            const brand = db.Brand.create({
                brandName,
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al crear la marca --> ', err);
            return res.send({ status: 400 });
        }
    },
    update: async (req, res) => {
        const { id, brandName } = req.body;

        try {
            await db.Brand.update(
                {
                    id,
                    brandName,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al actualizar la marca --> ', err);
            return res.redirect('/admin/?error_al_actualizar_marca_' + id);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            await db.Brand.destroy({
                where: {
                    id: id,
                },
            });
            res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar la marca --> ', err);
            return res.redirect('/admin/?error_al_borrar_marca_' + id);
        }
    },
};

module.exports = brandsControllers;
