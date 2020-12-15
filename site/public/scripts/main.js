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
    window.scrollY > 80 ? header.classList.add('compacto') : header.classList.remove('compacto')
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
