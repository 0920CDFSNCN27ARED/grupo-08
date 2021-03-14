const formatString = require('./formatString');

const returnColorsFormated = {
    asHTML: (arr, basePath = '', classes = {}) => {
        let html = '';

        arr.forEach((obj) => {
            html += `
                <li>
                    <a href="${basePath}/${obj.id}">${obj.colorName}</a> 
                </li>
            `;
        });

        return html;
    },
};

module.exports = returnColorsFormated;
