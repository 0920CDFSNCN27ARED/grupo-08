/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='-03:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE alaska;
USE alaska;
CREATE TABLE BannerImages(
	id INT(10) auto_increment not null,
	bannerId INT(10) not null,
	isActive INT(1) not null,
	imageName VARCHAR(100) not null,
	link VARCHAR(255),
	newTab INT(1) not null,
    title VARCHAR(255),
    altTitle VARCHAR(255),
    dateFrom DATE,
	dateTo DATE,
	CONSTRAINT pk_bannerImages PRIMARY KEY(id),
	CONSTRAINT fk_bannerId FOREIGN KEY(bannerId)
	REFERENCES Banners(id)
);
CREATE TABLE Banners(
	id INT(10) auto_increment not null,
	isActive INT(1) not null,
	title VARCHAR(50) not null,
	bannerCode VARCHAR(50) not null,
	createdAt timestamp not null,
	updatedAt timestamp,
	dateFrom DATE,
	dateTo DATE,
	CONSTRAINT pk_banners PRIMARY KEY(id),
	CONSTRAINT uq_bannerCode UNIQUE(bannerCode)
);
CREATE TABLE AdminRoles(
	id INT(10) auto_increment not null,
    roleName VARCHAR(50) not null,
    CONSTRAINT pk_adminRole PRIMARY KEY(id),
    CONSTRAINT uq_roleName UNIQUE(roleName)
);
CREATE TABLE AdminUsers(
	id INT(10) auto_increment not null,
	roleId INT(10) not null,
    isActive INT(1) not null,
	firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    userName VARCHAR(255) not null,
    email VARCHAR(255) not null,
    userPassword VARCHAR(255) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_adminUser PRIMARY KEY(id),
    CONSTRAINT fk_roleId FOREIGN KEY(roleId)
    REFERENCES AdminRoles(id),
    CONSTRAINT uq_email UNIQUE(email),
    CONSTRAINT uq_userName UNIQUE(userName)
);
CREATE TABLE AddressTypes(
	id INT(10) auto_increment not null,
	typeName INT(10) not null,
	CONSTRAINT pk_typeName PRIMARY KEY(id),
    CONSTRAINT uq_typeName UNIQUE(typeName)
);
CREATE TABLE Addresses(
	id INT(10) auto_increment not null,
	addressTypeId INT(10) not null,
    customerId INT(10) not null,
    isActive INT(1) not null,
    isDefault INT(1) not null,
	firstName VARCHAR(50) not null,
    lastName VARCHAR(50) not null,
    dni INT(10) not null,
    phone VARCHAR(20),
    email VARCHAR(255) not null,
    street VARCHAR(100) not null,
    streetNo INT(10) not null,
    pisoDepto VARCHAR(20),
    postalCode VARCHAR(20) not null,
    city VARCHAR(50) not null,
    province VARCHAR(50) not null,
    country VARCHAR(50) not null,
    otherData VARCHAR(255),
    streetBetween1 VARCHAR(100),
    streetBetween2 VARCHAR(100),
	CONSTRAINT pk_address PRIMARY KEY(id),
    CONSTRAINT fk_addressTypeId FOREIGN KEY(addressTypeId)
    REFERENCES AddressType(id),
    CONSTRAINT fk_customerId FOREIGN KEY(customerId)
    REFERENCES Customers(id)
);
CREATE TABLE Customers(
	id INT(10) auto_increment not null,
    isActive INT(1) not null,
	firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    email VARCHAR(255) not null,
    emailVerified INT(1) not null,
    userPassword VARCHAR(255) not null,
    dob DATE not null,
    gender VARCHAR(10) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_customer PRIMARY KEY(id),
    CONSTRAINT uq_email UNIQUE(email),
    CONSTRAINT uq_userName UNIQUE(userName)
);
CREATE TABLE Orders(
	id INT(10) auto_increment not null,
    customerid INT(10) not null,
    orderNo INT(10) not null,
    orderDate DATE not null,
    totalPrice INT(10) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_order PRIMARY KEY(id),
    CONSTRAINT uq_orderNo UNIQUE(orderNo)
);
CREATE TABLE Discounts(
	id INT(10) auto_increment not null,
    discountName VARCHAR(255) not null,
    amount INT(10) not null,
    discountCode INT(10) not null,    
    dateFrom DATE not null,
	dateTo DATE not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_discount PRIMARY KEY(id),
    CONSTRAINT uq_discountCode UNIQUE(discountCode)
);
CREATE TABLE DiscountOrder(
	id INT(10) auto_increment not null,
    discountId INT(10) not null,
    orderId INT(10) not null,
	CONSTRAINT pk_discountOrder PRIMARY KEY(id),
    CONSTRAINT fk_discountId FOREIGN KEY(discountId)
    REFERENCES Discounts(id),
    CONSTRAINT fk_orderId FOREIGN KEY(orderId)
    REFERENCES Orders(id)
);
CREATE TABLE OrderProduct(
	id INT(10) auto_increment not null,
    producttId INT(10) not null,
    orderId INT(10) not null,
    productQuantity INT(3) not null,
    priceEach DECIMAL(20,2) not null,
	CONSTRAINT pk_orderProduct PRIMARY KEY(id),
    CONSTRAINT fk_productId FOREIGN KEY(productId)
    REFERENCES Products(id),
    CONSTRAINT fk_orderId FOREIGN KEY(orderId)
    REFERENCES Orders(id)
);
CREATE TABLE SizeTables(
	id INT(10) auto_increment not null,
    tableName VARCHAR(255) not null,
    sizes VARCHAR(255) not null, -- datos separados por coma
	CONSTRAINT pk_sizesTable PRIMARY KEY(id),
    CONSTRAINT uq_tableName UNIQUE(tableName)
);
CREATE TABLE Colors(
	id INT(10) auto_increment not null,
    colorName VARCHAR(255) not null,
    CONSTRAINT pk_color PRIMARY KEY(id),
    CONSTRAINT uq_colorName UNIQUE(colorName)
);
CREATE TABLE Brands(
	id INT(10) auto_increment not null,
    brandName VARCHAR(255) not null,
    CONSTRAINT pk_brand PRIMARY KEY(id),
    CONSTRAINT uq_colorName UNIQUE(colorName)
);
CREATE TABLE CategoryImages(
	id INT(10) auto_increment not null,
    categoryId INT(10) not null,
    imageName VARCHAR(255) not null,
    CONSTRAINT pk_categoryImage PRIMARY KEY(id),
    CONSTRAINT uq_imageName UNIQUE(colorName),
    CONSTRAINT fk_categoryId FOREIGN KEY(categoryId)
    REFERENCES Categories(id)
);
CREATE TABLE Categories(
	id INT(10) auto_increment not null,
    parentCategory VARCHAR(255), -- aca imagino que hay que hacer una foreign key que apunte a la misma tabla
    isActive INT(1) not null,
    showMenu INT(1) not null,
    categoryName VARCHAR(255) not null,
    pageTytle VARCHAR(255) not null,
    metaDescription VARCHAR(255) not null,
    metaKeyWords VARCHAR(255) not null,
    -- subCategories VARCHAR(255) not null, supongo que para esto habria que hacer otra tabla pero quizas no es necesaria esta columna, podriamos saber las subcategorias mirando las parents?
    createdAt timestamp not null,
	updatedAt timestamp,
    CONSTRAINT pk_categoryImage PRIMARY KEY(id),
    CONSTRAINT uq_categoryName UNIQUE(categoryName),
    CONSTRAINT fk_categoryId FOREIGN KEY(parentCategoryId) -- no sé si esto funciona
    REFERENCES Categories(id)
);
CREATE TABLE CategoriesProducts(
	id INT(10) auto_increment not null,
    categoryId INT(10) not null,
    productId  INT(10) not null,
    CONSTRAINT pk_categorieProduct PRIMARY KEY(id),
    CONSTRAINT fk_categoryId FOREIGN KEY(categoryId)
    REFERENCES Categories(id),
    CONSTRAINT fk_productId FOREIGN KEY(productId)
    REFERENCES Products(id)
);
CREATE TABLE ProductImages(
	id INT(10) auto_increment not null,
    productId INT(10) not null,
    imageName VARCHAR(255) not null,
    CONSTRAINT pk_productImage PRIMARY KEY(id),
    CONSTRAINT uq_imageName UNIQUE(colorName),
    CONSTRAINT fk_productId FOREIGN KEY(productId)
    REFERENCES Products(id)
);
CREATE TABLE Products(
	id INT(10) auto_increment not null,
    sizeTableId INT(10) not null,
    brandId INT(10) not null,
    colorId INT(10) not null,
    isActive INT(1) not null,
    productName VARCHAR(255) not null,
    sku VARCHAR(255) not null,
    productPrice DECIMAL(20,2) not null,
    productPriceSpecial DECIMAL(20,2),
    productPriceSpecialFrom DATE,
    productPriceSpecialTo DATE,
    shortDescription VARCHAR(255) not null,
    composition VARCHAR(255) not null,
    care VARCHAR(255) not null,
    stock VARCHAR(255) not null, -- valores separados por coma en el orden de los talles
    productsGroup VARCHAR(255) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_product PRIMARY KEY(id),
    CONSTRAINT fk_sizeTable FOREIGN KEY(sizeTableId)
    REFERENCES SizeTables(id),
    CONSTRAINT uq_sku UNIQUE(sku),
    CONSTRAINT fk_brandId FOREIGN KEY(brandId)
    REFERENCES Brands(id),
    CONSTRAINT fk_colorId FOREIGN KEY(colorId)
    REFERENCES Colors(id)
);


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
