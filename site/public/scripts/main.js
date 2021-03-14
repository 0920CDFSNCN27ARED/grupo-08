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

    // FICHA PRODUCTO
    const catalog_product_view = document.querySelector('.catalog_product_view');

    // SLIDER PRODUCTOS RECOMENDADOS
    const slider_featured_products = document.querySelector('.slider_featured_products');

    // ADMIN CREATE PRODUCT
    const products_create_view = document.querySelector('.products_create_view');
    if (products_create_view) {
        // Trigguereo e click en select de talles
        let tablaTalles = document.querySelector('#tabla_de_talles');
        //eventFire(tablaTalles, 'click');
        let allSizeTables = await getsizeTables();
        function handleTablaTalles(currEl, targetElement, ...stock_talles) {
            // Templates tabla talles
            // Perdon! esta horrible esto
            const tabla_talles_calzado_35_al_45 = `
                <div class="tablita talles_calzado" data_table="tabla_talles_calzado_35_al_45">
                    <h4>Calzado</h4>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <th>
                            Talles 
                            </th>
                            <th>
                                35
                            </th>
                            <th>
                                35.5
                            </th>
                            <th>
                                36
                            </th>
                            <th>
                                36.5
                            </th>
                            <th>
                                37
                            </th>
                            <th>
                                37.5
                            </th>
                            <th>
                                38
                            </th>
                            <th>
                                38.5
                            </th>
                            <th>
                                39
                            </th>
                            <th>
                                39.5
                            </th>
                            <th>
                                40
                            </th>
                            <th>
                                40.5
                            </th>
                            <th>
                                41
                            </th>
                            <th>
                                41.5
                            </th>
                            <th>
                                42
                            </th>
                            <th>
                                42.5
                            </th>
                            <th>
                                43
                            </th>
                            <th>
                                43.5
                            </th>
                            <th>
                                44
                            </th>
                            <th>
                                44.5
                            </th>
                            <th>
                                45
                            </th>
                            <th>
                                45.5
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Color stock
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                            </td>
                        </tr>
                    </table>
                
                </div>
            `;
            const tabla_talles_36_al_48 = `
                <div class="tablita talles_prendas_inf" data_table="tabla_talles_36_al_48">
                    <h4>Prendas inferiores</h4>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <th>
                            Talles 
                            </th>
                            <th>
                                36
                            </th>
                            <th>
                                38
                            </th>
                            <th>
                                40
                            </th>
                            <th>
                                42
                            </th>
                            <th>
                                44
                            </th>
                            <th>
                                46
                            </th>
                            <th>
                                48
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Color stock
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                        </tr>
                    </table>
                
                </div>
            `;
            const tabla_talles_xxs_al_xxl = `
                <div class="tablita talles_prendas_sup" data_table="tabla_talles_xxs_al_xxl">
                    <h4>Prendas superiores</h4>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <th>
                            Talles 
                            </th>
                            <th>
                                xxs
                            </th>
                            <th>
                                xs
                            </th>
                            <th>
                                s
                            </th>
                            <th>
                                m
                            </th>
                            <th>
                                l
                            </th>
                            <th>
                                xl
                            </th>
                            <th>
                                xxl
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Color stock
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                            <td>
                                <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                            </td>
                        </tr>
                    </table>
                
                </div>
            `;

            let tabla = '';
            tabla += `<div class="tablita talles_prendas_sup" data_table="tabla_talles_xxs_al_xxl">
            <h4>Prendas superiores</h4>
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <th>
                    Talles 
                    </th>`;

            console.log(allSizeTables);

            tabla += `    </table>
                
            </div>`;

            let selectedTabla, target, targetMsg;

            target = document.querySelector(`#${targetElement} .form_data`);
            targetMsg = target.children[1];

            // Oculto el mensaje
            targetMsg.style.display = 'none';

            selectedTabla = currEl.options[currEl.selectedIndex].innerText;
            console.log(selectedTabla);

            switch (selectedTabla) {
                case 'tabla talles calzado 35 al 45':
                    removerTablas();
                    target.innerHTML += tabla_talles_calzado_35_al_45;
                    break;

                case 'tabla_talles_36_al_48':
                    removerTablas();
                    target.innerHTML += tabla_talles_36_al_48;
                    break;

                case 'tabla_talles_xxs_al_xxl':
                    removerTablas();
                    target.innerHTML += tabla_talles_xxs_al_xxl;
                    break;

                default:
                    removerTablas();
                    // Muestro el mensaje
                    targetMsg.style.display = 'block';
                    break;
            }

            if (stock_talles.length > 0) {
                let currTable = document.querySelector(`[data_table="${selectedTabla}"]`);
                let _inputs = currTable.querySelectorAll('input');
                _inputs.forEach((input, i) => {
                    input.value = stock_talles[i];
                });
            }

            function removerTablas() {
                let tablas = document.querySelectorAll('.tablita');
                if (tablas.length > 0) {
                    tablas.forEach((tabla) => tabla.remove());
                }
            }
        }

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
});
