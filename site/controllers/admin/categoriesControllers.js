const jsonFile = require('../../helpers/jsonFile');
const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const categoriesControllers = {
    getOne: (req, res) => {
        const { id } = req.params;

        let category, allCategories;
        allCategories = jsonFile.read('../db/categories.json');
        category = allCategories.find((cat) => cat.id == id);

        if (category == undefined) {
            return res.status(400).send({
                msg: 'La categoría no ha sido encontrada',
            });
        }

        res.render('admin/pages/categories/categories-list', {
            category,
            categoriesHTML: returnCategoriesFormated.asHTML(allCategories, '/admin/c/categorias'),
        });
    },
    getAll: (req, res) => {
        const allCategories = jsonFile.read('../db/categories.json');

        res.render('admin/pages/categories/categories-list', {
            categoriesHTML: returnCategoriesFormated.asHTML(allCategories, '/admin/c/categorias'),
        });
    },
    create: (req, res) => {
        /* 
            status: '',
            show_menu: '',
            category_name: 'Categoria 1 nombre',
            page_title: 'categoria 1 titulo',
            meta_description: 'categoria 1 meta desc',
            meta_keywords: 'categoria,1,meta,keywords',
            imagenes: '[object File]'

            id 
            isActive 
            showMenu 
            categoryName 
            pageTitle 
            metaDescription 
            metaKeyWords 
            parentCategory 
            subCategories 
            createdAt 
            updatedAt
        */
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
    update: (req, res) => {
        const allCategories = jsonFile.read('../db/categories.json');
        const {
            id,
            status,
            show_menu,
            category_name,
            page_title,
            meta_description,
            meta_keywords,
        } = req.body;

        allCategories.forEach((cat, i) => {
            if (cat.id == id) {
                cat.status = cat.status == status ? cat.status : status;
                cat.show_menu = cat.show_menu == show_menu ? cat.show_menu : show_menu;
                cat.name = cat.name == category_name ? cat.name : category_name;
                cat.page_title = cat.page_title == page_title ? cat.page_title : page_title;
                cat.meta_description =
                    cat.meta_description == meta_description
                        ? cat.meta_description
                        : meta_description;
                cat.meta_keywords =
                    cat.meta_keywords == meta_keywords ? cat.meta_keywords : meta_keywords;
            }
        });

        jsonFile.write(allCategories, '../db/categories.json');
        res.send({ status: 200 });
    },
    delete: (req, res) => {
        let { id } = req.params;
        let allCategories = jsonFile.read('../db/categories.json');
        let categoriesUpdated = allCategories.filter((cat, i) => cat.id != id);

        jsonFile.write(categoriesUpdated, '../db/categories.json');
        res.send({ status: 200 });
    },
};

module.exports = categoriesControllers;
