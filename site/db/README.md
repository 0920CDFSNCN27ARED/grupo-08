# Info DBs

-   Esta medio por arriba, eventualmente se volveria mas complejo
-   Lo que se define abajo son las tablas que estarian dentro de una misma base de datos

## ADMIN_ROLE

Cols:

-   role_id : `<autoincrement>`
-   role_name : `<string>`

### Definiciones:

Role Names: define los permisos que va a tener el usuario del admin <br>
admin -> `tiene todos los permisos` <br>
catalogacion -> `solo puede agregar productos`

---

<br>
<br>

## ADMIN_USERS

Cols:

-   user_id : `<autoincrement>`
-   firstname : `<string>`
-   lastname : `<string>`
-   email : `<string>`
-   username : `<string>`
-   password : `<string>`
-   created : `<date>`
-   modified : `<date>`
-   logdate : `<date>`
-   is_active : `<bool>`
-   role_id : `<int>`

### Definiciones:

is_active: devuelve si el usuario actual esta dado de baja

---

<br>
<br>

## BANNERS

Cols:

-   banner_id : `<autoincrement>`
-   title_title : `<string>`
-   banner_code : `<string>`
-   is_active : `<bool>`

---

<br>
<br>

## BANNERS_IMAGE

Cols:

-   image_id : `<autoincrement>`
-   banner_id : `<int>`
-   filename: `<string>`
-   title: `<string>`
-   alt: `<string>`
-   href: `<string>`
-   newtab: `<bool>`
-   position: `<int>`
-   is_active: `<bool>`

---

<br>
<br>

## CUSTOMER

Cols:

-   customer_id: `<autoincrement>`
-   firstname: `<string>`
-   lastname: `<string>`
-   email: `<string>`
-   phone: `<int>`
-   dob: `<date>`
-   password : `<string>`

---

<br>
<br>

## CUSTOMER_ADDRESSES

Cols:

-   address_id : `<autoincrement>`
-   customer_id : `<int>`
-   dni : `<int>`
-   phone : `<int>`
-   provincia : `<string>`
-   ciudad : `<string>`
-   calle : `<string>`
-   altura : `<string>`
-   piso : `<string>`
-   depto : `<string>`
-   cp : `<string>`

---

<br>
<br>

## PRODUCT

Cols:

-   product_id
-   title
-   price
-   discount
-   colors
-   sizes
-   images
-   is_active
