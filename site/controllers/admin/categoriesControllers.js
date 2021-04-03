const jsonFile = require('../../helpers/jsonFile');
const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const categoriesControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const category = await db.Category.findOne({
                where: { id: id },
            });

            if (!category) {
                return res.redirect('/admin/?error_al_traer_categoria_' + id);
            }

            const categories = await db.Category.findAll();
            const allCategories = categories.map((cat) => cat.dataValues);

            return res.render('admin/pages/categories/categories-list', {
                category,
                categoriesHTML: returnCategoriesFormated.asHTML(
                    allCategories,
                    '/admin/c/categorias'
                ),
            });
        } catch (err) {
            console.log('Hubo un error al traer las categorias --> ', err);
            return res.redirect('/admin/?error_al_traer_categoria_' + id);
        }
    },
    getAll: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            const allCategories = categories.map((cat) => cat.dataValues);

            return res.render('admin/pages/categories/categories-list', {
                categoriesHTML: returnCategoriesFormated.asHTML(
                    allCategories,
                    '/admin/c/categorias'
                ),
            });
        } catch (err) {
            console.log('Hubo un error al traer las categorias --> ', err);
            return res.redirect('/admin');
        }
    },
    create: async (req, res) => {
        const {
            status,
            show_menu,
            category_name,
            page_title,
            meta_description,
            meta_keywords,
            imagenes,
        } = req.body;

        try {
            const category = db.Category.create({
                isActive: Number(status),
                showMenu: Number(show_menu),
                categoryName: category_name,
                pageTitle: page_title,
                metaDescription: meta_description,
                metaKeyWords: meta_keywords,
                parentCategory: '0',
                subCategories: '',
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al crear la categoria --> ', err);
            return res.send({ status: 400 });
        }
    },
    update: async (req, res) => {
        console.log(req.body);

        const {
            id,
            status,
            show_menu,
            category_name,
            page_title,
            meta_description,
            meta_keywords,
        } = req.body;

        try {
            await db.Category.update(
                {
                    id: id,
                    isActive: status,
                    showMenu: show_menu,
                    categoryName: category_name,
                    pageTitle: page_title,
                    metaDescription: meta_description,
                    metaKeyWords: meta_keywords,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al actualizar la categoria --> ', err);
            return res.redirect('/admin/?error_al_actualizar_categoria_' + id);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            let allProducts = await db.Product.findAll();

            let hasProducts = allProducts.filter((prod) => {
                let pCategoriesIds = prod.dataValues.categories.split(',');

                if (pCategoriesIds.indexOf(id) > -1) {
                    return prod;
                }
            });

            console.log(hasProducts);

            if (hasProducts && hasProducts.length == 0) {
                await db.Category.destroy({
                    where: {
                        id: id,
                    },
                });
                res.send({ status: 200 });
            } else {
                res.send({ status: 406 });
            }
        } catch (err) {
            console.log('Hubo un error al borrar las categorias --> ', err);
            return res.redirect('/admin/?error_al_borrar_categoria_' + id);
        }
    },
};

module.exports = categoriesControllers;
