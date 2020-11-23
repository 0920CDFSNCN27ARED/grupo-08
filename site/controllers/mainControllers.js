const mainControllers = {
    index: (req, res) => {
        res.render('index');
    },

    notFound: (req, res) => {
        res.send('404');
    },
};

module.exports = mainControllers;
