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
if (catalog_product_view) {
    let swiper_photos_el = catalog_product_view.querySelector('.swiper-container');  
}

// SLIDER PRODUCTOS RECOMENDADOS
const slider_featured_products = document.querySelector('.slider_featured_products');
if (slider_featured_products) {
    const product_template = `<div class="swiper-slide">
        <article id="product_" class="product">
            <div class="product_photos">
                <a href="#link_to_product">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img
                                    src="/images/catalog/category/img_producto-1.png"
                                    alt="nombre_producto"
                                />
                            </div>
                            <div class="swiper-slide">
                                <img
                                    src="/images/catalog/category/img_producto-2.png"
                                    alt="nombre_producto"
                                />
                            </div>
                            <div class="swiper-slide">
                                <img
                                    src="/images/catalog/category/img_producto-3.png"
                                    alt="nombre_producto"
                                />
                            </div>
                            <div class="swiper-slide">
                                <img
                                    src="/images/catalog/category/img_producto-4.png"
                                    alt="nombre_producto"
                                />
                            </div>
                            <div class="swiper-slide">
                                <img
                                    src="/images/catalog/category/img_producto-5.png"
                                    alt="nombre_producto"
                                />
                            </div>
                        </div>

                        <div class="swiper_prev">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 9"
                            >
                                <g transform="translate(1098 -4084) rotate(90)">
                                    <rect
                                        class="a"
                                        width="9"
                                        height="10"
                                        transform="translate(4084 1088)"
                                    />
                                    <path
                                        class="b"
                                        d="M3,4.5l3,3,3-3"
                                        transform="translate(4082.5 1087)"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div class="swiper_next">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 9"
                            >
                                <g transform="translate(-1088 4093) rotate(-90)">
                                    <rect
                                        class="a"
                                        width="9"
                                        height="10"
                                        transform="translate(4084 1088)"
                                    />
                                    <path
                                        class="b"
                                        d="M3,4.5l3,3,3-3"
                                        transform="translate(4082.5 1087)"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
            <div class="product_info">
                <a href="#link_to_product">
                    <h3>Producto 1</h3>
                    <p>$2.835</p>
                </a>
            </div>
        </article>
    </div>`;

    const products_wrapper = slider_featured_products.querySelector('.swiper-wrapper');
    products_wrapper.innerHTML += product_template.repeat(6);

    /* let swiper_photos_el = slider_featured_products.querySelector('.swiper-container');
    let swiper_photos = new Swiper(swiper_photos_el, {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        spaceBetween: 32,
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 4,
            },
        },
    }); */
}

// ADMIN CREATE PRODUCT
const products_create_view = document.querySelector('.products_create_view');
if (products_create_view) {

    // Trigguereo e click en select de talles
    let tablaTalles = document.querySelector('#tabla_de_talles');
    eventFire(tablaTalles, 'click');

    // Muestro imagenes al subir
    let filesInput = document.querySelector('#form_files_upload');
    let filesArray = [];

    // Valido la api de file
    if (window.File && window.FileList && window.FileReader) {
        filesInput.addEventListener('change', (e) => {
            let files, output;

            files = e.target.files; // el FileList
            output = document.querySelector('#form_preview_files');

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let fr = new FileReader();

                fr.addEventListener('load', function (e) {
                    let image = e.target;

                    let templateCard = `
                        <div id="${file.name}" class="form_images_card">
                            <img src="${image.result}" alt="${file.name}" class="form_images_card_image">
                            <span class="form_images_card_name">${file.name}</span>
                            <button class="form_images_card_delete button_main_action" onclick="removeCurrentFile('${file.name}')">Borrar</button>
                        </div>
                    `;

                    output.innerHTML += templateCard;
                    filesArray.push(file);
                });

                fr.readAsDataURL(file);
            }
        });
    } else {
        alert('El navegador no soporta la API FILE');
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
    if (actualizarProdBtn) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let pid;
            let FD = new FormData(form);

            for (let [k, v] of FD) {
                if (k == 'id') {
                    pid = v;
                }
            }

            fetchData('POST', `/admin/c/productos/${pid}/update?_method=PUT`, FD).then(
                (res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/productos';
                    }
                }
            );
        });
    }

    let borrarProdBtn = document.querySelector('#product_create_form_delete_btn');
    if (borrarProdBtn) {
        borrarProdBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let path = borrarProdBtn.getAttribute('href');

            fetchData('POST', path).then((res) => {
                if (res.status === 200) {
                    location.href = '/admin/c/productos';
                }
            });
        });
    }
}

// ADMIN CREATE CATEGORY
const categories_list_view = document.querySelector('.categories_list_view');
if (categories_list_view) {
    // Guardar producto
    let form = document.querySelector('#category_create_form');

    // Muestro imagenes al subir
    let filesInput = document.querySelector('#form_files_upload');
    let filesArray = [];

    // Valido la api de file
    if (window.File && window.FileList && window.FileReader) {
        filesInput.addEventListener('change', (e) => {
            let files, output;

            files = e.target.files; // el FileList
            output = document.querySelector('#form_preview_files');

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let fr = new FileReader();

                fr.addEventListener('load', function (e) {
                    let image = e.target;

                    let templateCard = `
                        <div id="${file.name}" class="form_images_card">
                            <img src="${image.result}" alt="${file.name}" class="form_images_card_image">
                            <span class="form_images_card_name">${file.name}</span>
                            <button class="form_images_card_delete button_main_action" onclick="removeCurrentFile('${file.name}')">Borrar</button>
                        </div>
                    `;

                    output.innerHTML += templateCard;
                    filesArray.push(file);
                });

                fr.readAsDataURL(file);
            }
        });
    } else {
        alert('El navegador no soporta la API FILE');
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
    if (actualizarCatBtn) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let pid;
            let FD = new FormData(form);

            for (let [k, v] of FD) {
                if (k == 'id') {
                    pid = v;
                }
            }

            fetchData('POST', `/admin/c/categorias/${pid}/update?_method=PUT`, FD).then(
                (res) => {
                    if (res.status === 200) {
                        location.href = '/admin/c/categorias';
                    }
                }
            );
        });
    }

    let borrarCategoryBtn = document.querySelector('#category_create_form_delete_btn');
    if (borrarCategoryBtn) {
        borrarCategoryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let path = borrarCategoryBtn.getAttribute('href');

            fetchData('POST', path).then((res) => {
                if (res.status === 200) {
                    location.href = '/admin/c/categorias';
                }
            });
        });
    }
}
