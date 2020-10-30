const mainControllers = {
    inicio : (req, res) => {
        res.send("cualquier cosa");
    },
    notFound : (req, res) => {
        res.send("404");
    },
}

module.exports = mainControllers;