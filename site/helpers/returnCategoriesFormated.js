const returnCategoriesFormated = {
    asHTML: (arr) => {
        let html = '';

        arr.forEach((cat) => {
            if (cat.parent_cat === 0) {
                html += `
                    <li>
                        <a href="/admin/c/categorias/${cat.id}">${cat.name}</a>
                        ${checkSubcats(cat, arr)}
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
                                <a href="/admin/c/categorias/${objSubcat.id}">${objSubcat.name}</a>
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
