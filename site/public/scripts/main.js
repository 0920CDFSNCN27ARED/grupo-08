window.addEventListener('load', async () => {
    // Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () =>
        window.scrollY > 33 ? header.classList.add('compacto') : header.classList.remove('compacto')
    );

    // HOME
    const home_view = document.querySelector('.home_view');
    if (home_view) {
        const sliderImages = home_view.querySelectorAll('.slider_full_images');

        if (esTablet() || esMobile()) {
            sliderImages.forEach((image) => {
                switchSliderImageOnMobile(image);
            });
        }
    }

    // CUSTOMER REGISTER
    const register_view = document.querySelector('.register_view');
    if (register_view) {
        let formRows = document.querySelectorAll('.form_row');
        formRows.forEach((formRow) => {
            let input = formRow.querySelector('input');

            if (input && input.type == 'text') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (str.length < 3) {
                        handleFormRowError(
                            formRow,
                            'El campo debe de tener al menos 3 caracteres',
                            true
                        );
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }

            if (input && input.type == 'email') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (!str.match(/^[^\s@]+@[^\s@]+$/)) {
                        handleFormRowError(formRow, 'El email no es valido', true);
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }

            if (input && input.type == 'password') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (str.length < 8) {
                        handleFormRowError(
                            formRow,
                            'El campo debe de tener al menos 8 caracteres',
                            true
                        );
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }
        });
    }

    // FICHA PRODUCTO
    const catalog_product_view = document.querySelector('.catalog_product_view');
    if (catalog_product_view) {
        const form = catalog_product_view.querySelector('form');

        form.addEventListener('submit', () => {
            var FD = new FormData(form);

            for (let [k, v] of FD.entries()) {
                if (k == 'selectedSize' && v == 'default') {
                    let sizeTableContainer = form.querySelector('.product_attribute_sizes');

                    sizeTableContainer.innerHTML += `
                        <div class="errors_container">
                            <ul>
                                <li>Tenes que seleccionar un talle</li>
                            </ul>
                            
                            <button onclick="handleRemoveErrors(this);">x</button>
                        </div>
                    `;

                    return window.location.reload();
                }
            }
        });
    }

    // SLIDER PRODUCTOS RECOMENDADOS
    const slider_featured_products = document.querySelector('.slider_featured_products');

    // ADMIN CREATE PRODUCT
    const products_create_view = document.querySelector('.products_create_view');
    if (products_create_view) {
        // Trigguereo e click en select de talles
        let tablaTalles = document.querySelector('#sizeTableId');
        eventFire(tablaTalles, 'click');

        // Muestro imagenes al subir
        let filesInput = document.querySelector('#form_files_upload');
        let filesArray = handleImagesUploaded(filesInput, '#form_preview_files');

        function removeCurrentFile(target) {
            // Remuevo la imagen del array
            let deletedFileIndex = filesArray.findIndex((file) => file.name === target);
            filesArray.splice(deletedFileIndex, 1);

            // Remuevo la imagen del front
            document.querySelector(`[id*="${target}"]`).remove();
            filesInput.value = '';
        }

        // Guardar producto
        let form = document.querySelector('#product_create_form');

        let guardarProdBtn = document.querySelector('#product_create_form_create_btn');
        if (guardarProdBtn) {
            // Vacio el input file
            guardarProdBtn.addEventListener('click', () => (filesInput.value = ''));

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                var FD = new FormData(form);

                for (let file of filesArray) {
                    FD.append('imagenes', file, file.name);
                }

                fetchData('POST', '/admin/c/productos/crear', FD).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        location.href = '/admin/c/productos';
                    }
                });
            });
        }

        let actualizarProdBtn = document.querySelector('#product_create_form_update_btn');
        if (actualizarProdBtn) updateData(form, 'productos', '/admin/c/productos');

        let borrarProdBtn = document.querySelector('#product_create_form_delete_btn');
        if (borrarProdBtn) deleteData(borrarProdBtn, '/admin/c/productos');
    }

    // ADMIN CREATE CATEGORY
    const categories_list_view = document.querySelector('.categories_list_view');
    if (categories_list_view) {
        // Guardar producto
        let form = document.querySelector('#category_create_form');

        // Muestro imagenes al subir
        let filesInput = document.querySelector('#form_files_upload');
        let filesArray = handleImagesUploaded(filesInput, '#form_preview_files');

        function removeCurrentFile(target) {
            // Remuevo la imagen del array
            let deletedFileIndex = filesArray.findIndex((file) => file.name === target);
            filesArray.splice(deletedFileIndex, 1);

            // Remuevo la imagen del front
            document.querySelector(`[id*="${target}"]`).remove();
            filesInput.value = '';
        }

        let guardarCategoriaBtn = document.querySelector('#category_create_form_create_btn');
        if (guardarCategoriaBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                var FD = new FormData(form);
                FD.append('imagenes', filesArray);

                fetchData('POST', '/admin/c/categorias/crear', FD).then((res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/categorias';
                    }
                });
            });
        }

        let actualizarCatBtn = document.querySelector('#category_create_form_update_btn');
        if (actualizarCatBtn) updateData(form, 'categorias', '/admin/c/categorias');

        let borrarCategoryBtn = document.querySelector('#category_create_form_delete_btn');
        if (borrarCategoryBtn) deleteData(borrarCategoryBtn, '/admin/c/categorias');
    }

    // ADMIN CREATE ROLE
    const employee_create_view = document.querySelector('.employee_create_view');
    if (employee_create_view) {
        let borrarRolBtn = document.querySelector('#role_form_delete_btn');
        if (borrarRolBtn) deleteData(borrarRolBtn, '/admin/employees/crear-rol');

        // Form validation
        let formRows = document.querySelectorAll('.form_row');
        formRows.forEach((formRow) => {
            let input = formRow.querySelector('input');

            if (input && input.type == 'text') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (str.length < 3) {
                        handleFormRowError(
                            formRow,
                            'El campo debe de tener al menos 3 caracteres',
                            true
                        );
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }
        });
    }

    // ADMIN CREATE BRAND
    const brands_list_view = document.querySelector('.brands_list_view');
    if (brands_list_view) {
        let form = document.querySelector('#brand_create_form');

        // Create
        let guardarMarcaBtn = document.querySelector('#brand_create_form_create_btn');
        if (guardarMarcaBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                console.log('entre');

                var FD = new FormData(form);

                fetchData('POST', '/admin/c/marcas/crear', FD).then((res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/marcas';
                    }
                });
            });
        }

        // Update
        let actualizarBrandBtn = document.querySelector('#brand_create_form_update_btn');
        if (actualizarBrandBtn) updateData(form, 'marcas', '/admin/c/marcas');

        // Delete
        let borrarCategoryBtn = document.querySelector('#brand_create_form_delete_btn');
        if (borrarCategoryBtn) deleteData(borrarCategoryBtn, '/admin/c/marcas');
    }

    // ADMIN CREATE COLOR
    const colors_list_view = document.querySelector('.colors_list_view');
    if (colors_list_view) {
        let form = document.querySelector('#color_create_form');

        // Create
        let guardarColorBtn = document.querySelector('#color_create_form_create_btn');
        if (guardarColorBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                var FD = new FormData(form);

                fetchData('POST', '/admin/c/colores/crear', FD).then((res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/colores';
                    }
                });
            });
        }

        // Update
        let actualizarColorBtn = document.querySelector('#color_create_form_update_btn');
        if (actualizarColorBtn) updateData(form, 'colores', '/admin/c/colores');

        // Delete
        let borrarColorBtn = document.querySelector('#color_create_form_delete_btn');
        if (borrarColorBtn) deleteData(borrarColorBtn, '/admin/c/colores');
    }

    // ADMIN CREATE SIZE TABLES
    const sizeTables_list_view = document.querySelector('.sizeTables_list_view');
    if (sizeTables_list_view) {
        let form = document.querySelector('#sizeTable_create_form');

        // Create
        let guardarSizeTableBtn = document.querySelector('#sizeTable_create_form_create_btn');
        if (guardarSizeTableBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                var FD = new FormData(form);

                fetchData('POST', '/admin/c/tabla-de-talles/crear', FD).then((res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/tabla-de-talles';
                    }
                });
            });
        }

        // Update
        let actualizarSizeTableBtn = document.querySelector('#sizeTable_create_form_update_btn');
        if (actualizarSizeTableBtn) updateData(form, 'tabla-de-talles', '/admin/c/tabla-de-talles');

        // Delete
        let borrarSizeTableBtn = document.querySelector('#sizeTable_create_form_delete_btn');
        if (borrarSizeTableBtn) deleteData(borrarSizeTableBtn, '/admin/c/tabla-de-talles');
    }

    // ADMIN CUSTOMER CREATE
    const customer_create_view = document.querySelector('.customer_create_view');
    if (customer_create_view) {
        let formRows = document.querySelectorAll('.form_row');
        formRows.forEach((formRow) => {
            let input = formRow.querySelector('input');

            if (input && input.type == 'text') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (str.length < 3) {
                        handleFormRowError(
                            formRow,
                            'El campo debe de tener al menos 3 caracteres',
                            true
                        );
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }

            if (input && input.type == 'email') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (!str.match(/^[^\s@]+@[^\s@]+$/)) {
                        handleFormRowError(formRow, 'El email no es valido', true);
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }

            if (input && input.type == 'password') {
                input.addEventListener('keyup', (e) => {
                    let str = e.target.value;

                    if (str.length < 5) {
                        handleFormRowError(
                            formRow,
                            'El campo debe de tener al menos 5 caracteres',
                            true
                        );
                    } else {
                        handleFormRowError(formRow, false);
                    }
                });
            }
        });
    }
});
