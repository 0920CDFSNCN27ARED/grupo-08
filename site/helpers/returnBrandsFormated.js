const formatString = require('./formatString');

const returnBrandsFormated = {
    asHTML: (arr, basePath = '', classes = {}) => {
        let html = '';

        arr.forEach((obj) => {
            html += `
                <li>
                    <a href="${basePath}/${obj.id}">${obj.brandName}</a> 
                </li>
            `;
        });

        return html;
    },
};

module.exports = returnBrandsFormated;
