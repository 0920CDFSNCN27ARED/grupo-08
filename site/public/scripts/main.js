function esMobile() {
    return window.matchMedia('(max-width: 720px)').matches;
}
function esTablet() {
    return window.matchMedia('(min-width: 721px) and (max-width: 999px)').matches;
}
function esDesktop() {
    return window.matchMedia('(min-width: 1000px)').matches;
}

// Header
const header = document.querySelector('header');
window.addEventListener('scroll', () =>
    window.scrollY > 33 ? header.classList.add('compacto') : header.classList.remove('compacto')
);

// HOME
const home_view = document.querySelector('.home_view');
if (home_view) {
    const sliderImages = home_view.querySelectorAll('.slider_full_images');

    function switchSliderImageOnMobile(obj) {
        let imageSrc = obj.getAttribute('src');
        let imageSrcMobile = imageSrc.replace('--desktop', '--mobile');

        obj.setAttribute('src', imageSrcMobile);
    }

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

    let swiper_photos = new Swiper(swiper_photos_el, {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {
            1000: {
                loop: false,
                slidesPerView: 2,
                slidesPerGroup: 2,
                slidesPerColumn: 10,
                slidesPerColumnFill: 'row',
            },
        },
    });
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

    let swiper_photos_el = slider_featured_products.querySelector('.swiper-container');
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
    });
}

// ADMIN CREATE PRODUCT
const products_create_view = document.querySelector('.products_create_view');
if (products_create_view) {
    function changeTab(currentObj, target) {
        let formTab, formTabBtn;

        // Oculto todos los tabs
        formTab = document.querySelectorAll('.form_tab');
        formTab.forEach((tab) => tab.classList.add('dnone'));

        // Remuevo active class en todos los btns
        formTabBtn = document.querySelectorAll('.form_tab_btn');
        formTabBtn.forEach((btn) => btn.classList.remove('active'));

        // Muestro el tab actual y agrego active class al btn
        document.querySelector(`#${target}`).classList.remove('dnone');
        currentObj.classList.add('active');
    }

    function handleSkuVisible(currEl, targetElement) {
        let target = document.querySelector(`#${targetElement}`);
        let arrTargetVal = target.value.split('-');

        // El sku visible se compone por marca - tipo prod - nombre
        let [marca, tipoProducto, nombre] = ['marca', 'tipo_de_producto', 'nombre'];

        if (target.value) {
            console.log('entre');
            marca = arrTargetVal[0];
            tipoProducto = arrTargetVal[1];
            nombre = arrTargetVal[2];
        }

        switch (currEl.getAttribute('name')) {
            case 'marca':
                marca = formatString(currEl.value);
                break;

            case 'tipo_de_producto':
                tipoProducto = formatString(currEl.value);
                break;

            case 'product_name':
                nombre = formatString(currEl.value);
                break;

            default:
                break;
        }

        function formatString(str) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replaceAll(' ', '_');
        }

        // Devuelvo el sku visible
        target.value = `${marca}-${tipoProducto}-${nombre}`;
    }

    function handleTablaTalles(currEl, targetElement) {
        // Templates tabla talles
        // Perdon! esta horrible esto
        const tabla_talles_calzado_35_al_45 = `
            <div class="tablita talles_calzado">
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
                            <input type="number" name="stock_for_size_35" id="stock_for_size_35" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_35.5" id="stock_for_size_35.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_36" id="stock_for_size_36" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_36.5" id="stock_for_size_36.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_37" id="stock_for_size_37" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_37.5" id="stock_for_size_37.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_38" id="stock_for_size_38" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_38.5" id="stock_for_size_38.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_39" id="stock_for_size_39" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_39.5" id="stock_for_size_39.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_40" id="stock_for_size_40" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_40.5" id="stock_for_size_40.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_41" id="stock_for_size_41" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_41.5" id="stock_for_size_41.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_42" id="stock_for_size_42" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_42.5" id="stock_for_size_42.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_43" id="stock_for_size_43" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_43.5" id="stock_for_size_43.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_44" id="stock_for_size_44" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_44.5" id="stock_for_size_44.5" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_45" id="stock_for_size_45" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_size_45.5" id="stock_for_size_45.5" placeholder="0" value="0">
                        </td>
                    </tr>
                </table>
            
            </div>
        `;
        const tabla_talles_36_al_48 = `
            <div class="tablita talles_prendas_inf">
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
                            <input type="number" name="stock_for_prenda_inferior_36" id="stock_for_prenda_inferior_36" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_38" id="stock_for_prenda_inferior_38" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_40" id="stock_for_prenda_inferior_40" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_42" id="stock_for_prenda_inferior_42" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_44" id="stock_for_prenda_inferior_44" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_46" id="stock_for_prenda_inferior_46" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_inferior_48" id="stock_for_prenda_inferior_48" placeholder="0" value="0">
                        </td>
                    </tr>
                </table>
            
            </div>
        `;
        const tabla_talles_xxs_al_xxl = `
            <div class="tablita talles_prendas_sup">
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
                            <input type="number" name="stock_for_prenda_sup_xxs" id="stock_for_prenda_sup_xxs" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_xs" id="stock_for_prenda_sup_xs" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_s" id="stock_for_prenda_sup_s" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_m" id="stock_for_prenda_sup_m" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_l" id="stock_for_prenda_sup_l" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_xl" id="stock_for_prenda_sup_xl" placeholder="0" value="0">
                        </td>
                        <td>
                            <input type="number" name="stock_for_prenda_sup_xxl" id="stock_for_prenda_sup_xxl" placeholder="0" value="0">
                        </td>
                    </tr>
                </table>
            
            </div>
        `;

        let selectedTabla, target, targetMsg;

        target = document.querySelector(`#${targetElement} .form_data`);
        targetMsg = target.children[1];

        // Oculto el mensaje
        targetMsg.style.display = 'none';

        selectedTabla = currEl.options[currEl.selectedIndex].value;
        switch (selectedTabla) {
            case 'tabla_talles_calzado_35_al_45':
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

        function removerTablas() {
            console.log('remover tablas');
            let tablas = document.querySelectorAll('.tablita');
            if (tablas.length > 0) {
                tablas.forEach((tabla) => tabla.remove());
                console.log('tablas removidas');
            }
        }
    }
}
