'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'categories',
            [
                {
                    isActive: 1,
                    showMenu: 1,
                    categoryName: 'alaska',
                    pageTitle: 'alaska',
                    metaDescription: '',
                    metaKeyWords: '',
                    parentCategory: '',
                    subCategories: '',
                },
                {
                    isActive: 1,
                    showMenu: 1,
                    categoryName: 'bla',
                    pageTitle: 'bla',
                    metaDescription: '',
                    metaKeyWords: '',
                    parentCategory: '',
                    subCategories: '',
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
