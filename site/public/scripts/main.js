// GALERIA DE PRODUCTOS
const catalog_view = document.querySelector('.catalog_category_view');
if (catalog_view) {
    const getRandomID = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    let productTemplate = (id) => `
        <article id="product_${id}" class="product">
        
            
            <div class="product_photos">
                <a href="#link_to_product">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"><img src="../public/images/catalog/category/img_producto-1.png" alt="nombre_producto"></div>
                            <div class="swiper-slide"><img src="../public/images/catalog/category/img_producto-2.png" alt="nombre_producto"></div>
                            <div class="swiper-slide"><img src="../public/images/catalog/category/img_producto-3.png" alt="nombre_producto"></div>
                            <div class="swiper-slide"><img src="../public/images/catalog/category/img_producto-4.png" alt="nombre_producto"></div>
                            <div class="swiper-slide"><img src="../public/images/catalog/category/img_producto-5.png" alt="nombre_producto"></div>
                        </div>

                        <div class="swiper_prev">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9">
                                <g transform="translate(1098 -4084) rotate(90)">
                                    <rect class="a" width="9" height="10" transform="translate(4084 1088)" />
                                    <path class="b" d="M3,4.5l3,3,3-3" transform="translate(4082.5 1087)" />
                                </g>
                            </svg>
                        </div>
                        <div class="swiper_next">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9">
                                <g transform="translate(-1088 4093) rotate(-90)">
                                    <rect class="a" width="9" height="10" transform="translate(4084 1088)" />
                                    <path class="b" d="M3,4.5l3,3,3-3" transform="translate(4082.5 1087)" />
                                </g>
                            </svg>
                        </div>
                    
                    </div>
                </a>
            </div>
            <div class="product_info">
                <a href="#link_to_product">
                    <h3>
                        Producto 1
                    </h3>
                    <p>$2.835</p>
                </a>
            </div>
        </article>`;

    let products_container = document.querySelector('#catalog_gallery');
    let cantidad_productos = 20;
    for (let i = 0; i < cantidad_productos; i++) {
        products_container.innerHTML += productTemplate(getRandomID());
    }

    let product_list = document.querySelectorAll('.product');
    if(product_list.length > 0 || product_list !== undefined) {
        product_list.forEach( product => {
            let swiper_photos_el = product.querySelector('.swiper-container');

            if(swiper_photos_el) {
                console.log( product.getAttribute('id') );
                let swiper_photos = new Swiper(swiper_photos_el, {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    noSwiping: false,
                    navigation: {
                        nextEl: swiper_photos_el.querySelector('.swiper_next'),
                        prevEl: swiper_photos_el.querySelector('.swiper_prev'),
                    },
                    breakpoints: {
                        720: {
                            noSwiping: true,
                        }
                    }
                });

            }

        } )

    }
    



}

