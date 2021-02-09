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
        guardarProdBtn.addEventListener('click', () => filesInput.value = '')

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            var FD = new FormData(form);
            
            for(let file of filesArray){ 
                FD.append('imagenes', file, file.name);
            }

            fetchData('POST', '/admin/c/productos/crear', FD).then((res) => {
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