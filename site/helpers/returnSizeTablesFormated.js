const formatString = require('./formatString');

const returnSizeTablesFormated = {
    asHTML: (arr, basePath = '', classes = {}) => {
        let html = '';

        arr.forEach((obj) => {
            html += `
                <li>
                    <a href="${basePath}/${obj.id}">${obj.tableName}</a> 
                </li>
            `;
        });

        return html;
    },
};

module.exports = returnSizeTablesFormated;
