'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'sizetables',
            [
                {
                    tableName: 'Tabla talles XXS al XXL',
                    sizes: 'xxs,xs,s,m,l,xl,xxl',
                },
                {
                    tableName: 'Tabla talles 36 a 48',
                    sizes: '36,38,40,42,44,46,48',
                },
                {
                    tableName: 'Tabla talles 35 a 45',
                    sizes:
                        '35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5',
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
