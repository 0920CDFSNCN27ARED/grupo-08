## Posibles rutas que vayamos a requerir
---

Este es un listado de rutas a implementar que se me ocurrio haciendo un research de cosas que conlleva hacer un ecommerce, no creo que podamos hacer todo pero de todas formas lo dejo anotado para tener referencia. Parece una bastante pero seguro me quedo corto, cada vez encuentro mas y mas cosas :O

### **Rutas base**
```js
/inicio
/contacto
/locales

```

<br>

### **FAQ**
```js
/faq
/faq/como-comprar
/faq/terminos-y-condiciones
/faq/politicas-de-privacidad
/faq/trabaja-con-nosotros
/faq/locales

```

<br>

### **Productos**
```js
/catalogo/categoria/:subcategoria?
/catalogo/resultado/:busqueda?
/catalogo/producto/:id-producto+nombre-producto
```

<br>

### **Checkout**
```js
/checkout/carrito
/checkout/pagar
/checkout/pago-realizado
/checkout/pago-rechazado
```

<br>

### **Usuario**
```js
/cliente/inciar-sesion
/cliente/registro
/cliente/recuperar-cuenta
/cliente/mi-cuenta
/cliente/mi-cuenta/informacion-de-la-cuenta
/cliente/mi-cuenta/direcciones
/cliente/mi-cuenta/favoritos
/cliente/mi-cuenta/pedidos/:pedido?
```

<br>

## **ADMIN**
No estoy muy seguro de como enrutar esto

### **Ruta base**
```js
/admin
/admin/login
/admin/recuperar-cuenta
```

<br>

### **Catalogacion**
```js
/catalogo/gestionar-productos/:producto?/:id-producto
/catalogo/gestionar-productos/agregar-producto
/catalogo/gestionar-categorias/:categoria?/:id-categoria/:subcategoria?
/catalogo/gestionar-categorias/agregar-categoria

```

<br>

### **Ventas**
```js
/ventas/pedidos/:pedido?/:id-pedido
/ventas/facturas/:factura?/:id-factura
/ventas/envios/:envio?/:id-envio

```

<br>

### **Clientes**
```js
/clientes
/clientes/:cliente?/:id-cliente
/clientes/:cliente?/:id-cliente/resumen
/clientes/:cliente?/:id-cliente/cambios/:cambio?/:id-cambio
/clientes/:cliente?/:id-cliente/pedidos/:pedido?/:id-pedido
/clientes/:cliente?/:id-cliente/direcciones
/clientes/:cliente?/:id-cliente/informacion-personal
/clientes/:cliente?/:id-cliente/carrito
/clientes/:cliente?/:id-cliente/favoritos
/clientes/agregar-cliente

```

<br>

### **Configuraciones de la tienda**
```js
/nombre-tienda/general

```

<br>

