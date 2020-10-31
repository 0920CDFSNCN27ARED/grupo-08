const path = require("path")
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
}

const mainControllers = {
    inicio : (req, res) => {
        res.sendFile(getPath("../views/index.html"));
    },
    notFound : (req, res) => {
        res.send("404");
    },
}

module.exports = mainControllers;