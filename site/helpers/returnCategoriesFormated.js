const formatString = require('./formatString');

const returnCategoriesFormated = {
    asHTML: (arr, basePath = '', classes = {}) => {
        let html = '';

        arr.forEach((cat) => {
            if (cat.parentCategory == '' || cat.parentCategory == '0') {
                html += `
                    <li>
                        <a href="${basePath}/${cat.id}">${cat.categoryName}</a> 
                    </li>
                `;
            }
        });

        function checkSubcats(obj, arr) {
            let html = '';
            if (obj.subcategories.length > 0) {
                html += `<ul>`;
                obj.subcategories.forEach((subcat) => {
                    let objSubcat = arr.find((_obj) => _obj.id === subcat);
                    // prettier-ignore
                    html += `
                            <li>
                                <a href="${basePath}/${objSubcat.id}">${objSubcat.name}</a>
                                ${checkSubcats(objSubcat, arr)}
                            </li>
                        `;
                });
                html += `</ul>`;
            }

            return html;
        }

        return html;
    },
    asHTMLfront: (arr, basePath = '', classes = {}) => {
        let html = '';

        arr.forEach((cat) => {
            if (cat.parentCategory == '' || cat.parentCategory == '0') {
                html += `
                    <li class="menu__desplegable">
                        <a href="${basePath}/${formatString(cat.categoryName)}">
                            ${cat.categoryName}
                        </a>
                    </li>
                `;
            }
        });

        function checkSubcats(obj, arr) {
            let html = '';
            if (obj.subcategories.length > 0) {
                html += `<ul class="contenido_submenu">`;
                obj.subcategories.forEach((subcat) => {
                    let objSubcat = arr.find((_obj) => _obj.id === subcat);
                    // prettier-ignore
                    html += `
                            <li>
                                <a href="${basePath}/${formatString(objSubcat.name)}">${objSubcat.name}</a>
                                ${checkSubcats(objSubcat, arr)}
                            </li>
                        `;
                });
                html += `</ul>`;
            }

            return html;
        }

        return html;
    },
};

module.exports = returnCategoriesFormated;
