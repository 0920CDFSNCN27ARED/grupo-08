const db = require('../../database/models');

const tablitasControllers = {
    getAll: async (req, res) => {
        const tablitas = await db.SizeTable.findAll();
        return res.send(tablitas);
    },
};
module.exports = tablitasControllers;
