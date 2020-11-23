const mainControllers = {
    index: (req, res) => {
        res.render('pages/index');
    },

    notFound: (req, res) => {
        res.send('404');
    },
};

module.exports = mainControllers;
