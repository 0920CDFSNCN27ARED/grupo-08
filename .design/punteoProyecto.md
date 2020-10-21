# Páginas

## Home:
```js
[] - Popup suscripcion newsletter

[] - Banner top
    -- Puede ser texto o una imagen
        -- [] - Banner top con imagen
        -- [] - Banner top con texto

[] - Header
    -- [] - Logo
    -- [] - Categorias
        -- Las categorias pueden tener sub categorias, en el caso de tener, crear un submenu
            -- [] - Submenu categorias
    -- [] - Buscar
    -- [] - Carrito
    -- [] - Usuario

[] - Slider con CTA
    -- Cada slide pued tener titulo, bajada y cta; en el casode no pasarselo no de renderea
        -- [] - Titulo
        -- [] - Bajada
        -- [] - Link
        -- [] - imagen


[] - Banner promocional 1 autoadministrable
    -- [] - Imagen con o sin link

[] - Seccion 1 - productos
    -- Se van a mostrar productos

[] - Banner promocional 2
    -- [] - Imagen con o sin link

[] - Seccion 2 - productos
    -- Se van a mostrar productos

[] - Footer
```

## Galeria producto:
```js
[] - Banner top
[] - Header

[] - Banner categoria
    -- Cada categoria va a tener su banner correspondiente

[] - Filtros
    -- Los filtros se van a usar para filtrar los productos
        -- [] - Precio ascendente o descendente
        -- [] - Colores
        -- [] - Talles
        -- [] - Rango de precio
        -- [] - Modificar la grilla de productos
            -- Poder elegir entre si el usuario quiere ver filas de 2, 3 o 4 productos    
        -- En el caso de estar en la galeria de una categoria
            -- [] - Tipo de producto
        -- En el caso de haber temporadas
            -- [] - Temporadas
        -- En el caso de haber descuentos
            -- [] - Descuentos
        
[] - Breadcrumbs
    -- Son links que muestran al usuario donde es que esta parado. Suponente que entraste en la subcategoria X de la cateogria C, en el breadcrumb se va a mostrar: /categoria-c/subcategoria-x

[] - Productos
    -- Los productos deberian de tener
        -- [] - Imagen destacada, galeria, video del producto
        -- [] - Nombre
        -- [] - Precio
            -- En el caso de descuento
                -- [] - Precio normal tachado, precio descuento en negritas
        -- [] Destaques
            -- En el caso de ser un producto nuevo
                -- [] - New in
            -- En el caso de estar en oferta
                -- [] - Oferta - descuento
    
    -- Simular producto
        -- [] - Serian imagenes promocionales que simulan ser productos
            -- [] - Imagen
            -- Opcionales
                -- [] - Titulo
                -- [] - link
    
    -- Agregar a favoritos

    -- [] Compra rapida
        -- La compra rapida consta de mostrar atributos extras del producto y el boton de agregar al carrito
            -- [] - Colores
            -- [] - Talle
            -- [] - Agregar al carrito

[] - Footer
```

## Ficha de producto
```js
[] - Header

[] - Galeria de fotos
    -- [] - Posibilidad de hacer zoom

[] - Datos del producto
    -- [] - Nombre
    -- [] - Precio
    -- [] - Colores
    -- [] - Talles
    -- [] - Detalles
        -- Aca entraria cualquier info extra del producto
            -- [] - Detalles de producto
            -- [] - Material
            -- [] - Envios
            -- [] - Formas de pago
            -- [] - Cambios y devoluciones
    -- [] - Compartir producto
    -- [] - Agregar a favoritos
    -- [] - Cantidad
        -- [] - Mostrar solo la cantidad de productos en stock
    -- [] - Añadir a cesta (comprar)
        -- Cuando se agrega a la cesta NO SE REDIRIGE al checkout
```

## Checkout
```js
[] - Header

[] - Producto
    -- [] - Imagen
    -- [] - Nombre
    -- [] - Color
    -- [] - Talle
    -- [] - Precio
    -- [] - Cantidad
        -- La cantidad se puede modificar, incrementar y decrementar
    -- [] - Total
        -- Total del producto y su cantidad

[] - Cupon de descuento
[] - Gift card
    -- [] - Numero de tarjeta
    -- [] - codigo
    -- [] - Monto a utilizar

[] - Subtotal
    - En el caso de aplicar un descuento o giftcard se muestra aca la cantidad a reducir
[] - Total
    - El total a pagar despues de descuentos

[] - Boton comprar
[] - Compartir carrito
[] - Boton continuar comprando

[] - Footer
```

## Checkout pago
```js
[] - Header
    -- Logo
    -- Info de contacto de ventas
        -- [] - Numero de telefono
        -- [] - Email

[] - Proceso de pago
    -- [] - Informacion de facturacion
        -- SI EL USUARIO NO TIENE DIRECCION
            -- Si el usuario no esta registrado
                -- [] - Formulario de login / registro
            -- Formulario para cargar datos personales
        -- SI EL USUARIO YA CARGO SU DIRECCION
            -- Seleccionar su direccion

        -- Si este pedido es para regalo
            -- [] - Agregar dedicatoria
            -- [] - Agregar una nueva direccion de envio

    -- [] - Informacion de envio
        -- Mostrar los datos de donde se va enviar los productos
        -- Boton modificar direccion
            -- En el caso de querer modificar o agregar una direccion
    
    -- [] - Metodo de envio
        -- Opciones de metodo de envio
            -- [] - Retirar pedido en sucursal
                -- Selector de sucursales
            -- [] - Envio por ...
            -- [] - Envio por ...
            -- Cada metodo de envio va a tener informacion extra
                -- [] - Disclaimer
                -- [] - Plazo de entrega
        
    -- [] - Metodos de pago
        -- [] - Mercadopago
            -- Al finalizar la compra se redirige a mercadopago
        -- [] - Cupon de pago
            -- Pago facil, rapipago, deposito bancario, dinero en cuenta de mercadopago
            -- Al finalizar la compra se redirige a mercadopago
        * Me gustaria saber si existe la posibilidad de ver como generar un metodo de pago interno sin usar mercadopago ni otro servicio

    -- [] - Revision de pedido
        -- [] - Producto(s)
            -- [] - Nombre
            -- [] - Color
            -- [] - Talle
            -- [] - Precio individual
            -- [] - Cantidad
            -- [] - Subtotal

        -- [] - Subtotal de producto agregados
        -- [] - Envio seleccionado
            -- En el caso de corresponder cobro de envio agregarlo
                -- [] - Costo de envio
        -- [] - Total general

        [] - Realizar pago
        [] - Modificar carrito
            -- Esto te redirige al checkout
```

## Formularios Crear cuenta/ Registro/ Recuperar contraseña
```js
[] - Login
    -- [] - Email
    -- [] - Contraseña
    -- Opciones extras
        -- [] - Registrarse
        -- [] - Olvide mi contraseña
        -- [] - Iniciar con redes sociales

[] - Registro
    -- [] Datos personales
        -- [] - Nombre
        -- [] - Apellido
        -- [] - Email
        -- [] - Celular
        -- [] - Fecha de nacimiento
        -- [] - Genero
        -- [] - Contraseña
        -- [] - Confirmar contraseña
        -- [] - Terminos y condiciones
        -- Opciones extras
            -- [] - Iniciar sesion
            -- [] - Iniciar con redes sociales

[] - Olvide mi contraseña
    -- [] - Email
    -- Opciones extras
            -- [] - Iniciar sesion
            -- [] - Registro
``` 

## Mi cuenta
```js
[] - Resumen
    -- Resumen general del usuario

[] - Informacion del usuario
    -- [] - Informacion personal
        -- [] - Nombre
        -- [] - Apellido
        -- [] - Email
        -- [] - Telefono
        -- [] - Fecha de nacimiento
        -- [] - Genero

    -- [] - Direcciones
        -- [] - Resumen de las direcciones guardadas.
            -- En el caso de no haber ninguna, agregar nueva
        -- Agregar nueva direccion
            -- Datos de contacto
                -- [] - Nombre
                -- [] - Apellido
                -- [] - DNI
                -- [] - Celular
            -- Direccion
                -- [] - Selector de provincias
                -- [] - Selector de ciudades
                -- [] - Codigo postal
                -- [] - Calle
                -- [] - Altura
                -- [] - Piso
                -- [] - Departamento
    
    -- [] - Pedidos
        -- [] - Numero de pedido
        -- [] - Fecha
        -- [] - Enviar a
            -- Nombre de direccion de facturacion
        -- [] - Total del pedido
        -- [] - Estado del pedido
            -- Posibles estados
                -- [] - Pago aprobado
                -- [] - Pago rechazado
                -- [] - Pago pendiente
                -- [] - Facturado
                    * Como checkear si el pago esta aprobado o no desde mercadopago?
                -- [] - En preparacion
                -- [] - Cambio  
                -- [] - Sin stock
                -- [] - Sin stock parcial
                -- [] - otros
        -- [] - Ver pedido
        -- [] - Cancelar pedido
            -- Hace poco se dicto que los ecommerces deben de tener un boton de arrepentimiento, todavia no esta vigente
        -- [] - Repetir pedido
            -- Agrega los mismo productos al checkout
            -- En el caso de no haber stock no apareceria la opcion

        -- [] - VER PEDIDO
            -- [] - Datos del pedido
                -- [] - Numero de pedido
                -- [] - Estado
                -- [] - Fecha de creacion
                -- [] - Informacion de facturacion
                -- [] - Detalles de los productos

    -- [] - Favoritos
        -- [] - Producto
            -- [] - Foto del producto
            -- [] - Nombre
            -- [] - Precio
        -- [] - Borrar de favoritos
        -- [] - Agregar a la cesta/ Comprar
            -- Agregar todos los productos en favoritos a la cesta
        -- [] - Compartir favoritos

    -- [] - Suscripcion al newsletter
        -- Permitir que envien newsletters

    -- [] - Cerrar sesion
```

# link 
* https://www.zara.com/ar/es/shop/cart-v2
* https://www.rapsodia.com.ar/checkout/cart
* https://www.dior.com/en_us/products/beauty-Y0785220-sauvage-eau-de-parfum
* https://www.prada.com/us/en/checkout-login-alt.html
* https://www.armani.com/us/OnePageCheckout/Cart
* https://www.hermes.com/us/en/cart/

* https://www.ralphlauren.com/women-clothing/cable-wool-crewneck-sweater/359516.html?dwvar359516_colorname=Fawn%20Grey%20Heather&cgid=women-clothing&webcat=Women%2FClothing#webcat=women-clothing&start=1&cgid=women-clothing
<br> // URLS BONITAS!

* https://www.clubmonaco.com/en/women-shops-new-arrivals