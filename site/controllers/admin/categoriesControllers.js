const writeJsonFile = require('../../helpers/writeJsonFile');
const readJsonFile = require('../../helpers/readJsonFile');
const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');

const categoriesControllers = {
    getOne: (req, res) => {
        const { id } = req.params;

        let category, allCategories;
        allCategories = readJsonFile('../db/categories.json');
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
        const allCategories = readJsonFile('../db/categories.json');

        res.render('admin/pages/categories/categories-list', {
            categoriesHTML: returnCategoriesFormated.asHTML(allCategories, '/admin/c/categorias'),
        });
    },
    create: (req, res) => {
        const allCategories = readJsonFile('../db/categories.json');

        const handleCategoryId = (arr) => {
            if (arr.length === 0) return 1;

            let lastIdNo = arr[arr.length - 1].id;
            return lastIdNo + 1;
        };

        const handleImages = (obj) => {
            let arrImagesNames = [];

            let images = obj;
            images.forEach((image) => {
                let originalName = image.originalname;
                arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
            });

            return arrImagesNames;
        };

        const category = {
            id: handleCategoryId(allCategories),
            status: req.body.status,
            show_menu: req.body.show_menu,
            name: req.body.category_name,
            page_title: req.body.page_title ? req.body.page_title : '',
            meta_description: req.body.meta_description ? req.body.meta_description : '',
            meta_keywords: req.body.meta_keywords ? req.body.meta_keywords : '',
            imagenes: handleImages(req.files) ? handleImages(req.files) : [],
            parent_cat: 0,
            subcategories: [],
        };

        allCategories.push(category);

        writeJsonFile(allCategories, '../db/categories.json');
        res.send({ status: 200 });
    },
    update: (req, res) => {
        const allCategories = readJsonFile('../db/categories.json');
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

        writeJsonFile(allCategories, '../db/categories.json');
        res.send({ status: 200 });
    },
};

module.exports = categoriesControllers;
