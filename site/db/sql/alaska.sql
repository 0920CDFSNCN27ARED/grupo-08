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

CREATE DATABASE IF NOT EXISTS alaska;
USE alaska;

CREATE TABLE BannerImages(
	id INT auto_increment not null,
	bannerId INT not null,
	isActive INT not null,
	imageName VARCHAR(100) not null,
	link VARCHAR(255),
	newTab INT not null,
    title VARCHAR(255),
    altTitle VARCHAR(255),
    dateFrom timestamp,
	dateTo timestamp,
	CONSTRAINT pk_bannerImages PRIMARY KEY(id),
	CONSTRAINT fk_bi_bannerId FOREIGN KEY(bannerId)
	REFERENCES Banners(id)
);
CREATE TABLE Banners(
	id INT auto_increment not null,
	isActive INT not null,
	title VARCHAR(50) not null,
	bannerCode VARCHAR(50) not null,
	createdAt timestamp not null,
	updatedAt timestamp,
	dateFrom timestamp,
	dateTo timestamp,
	CONSTRAINT pk_banners PRIMARY KEY(id),
	CONSTRAINT uq_bannerCode UNIQUE(bannerCode)
);
CREATE TABLE AdminRoles(
	id INT auto_increment not null,
    roleName VARCHAR(50) not null,
    CONSTRAINT pk_adminRole PRIMARY KEY(id),
    CONSTRAINT uq_roleName UNIQUE(roleName)
);
CREATE TABLE AdminUsers(
	id INT auto_increment not null,
	roleId INT not null,
    isActive INT not null,
	firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    userName VARCHAR(255) not null,
    email VARCHAR(255) not null,
    userPassword VARCHAR(255) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_adminUser PRIMARY KEY(id),
    CONSTRAINT fk_au_roleId FOREIGN KEY(roleId) REFERENCES AdminRoles(id),
    CONSTRAINT uq_email UNIQUE(email),
    CONSTRAINT uq_userName UNIQUE(userName)
);
CREATE TABLE AddressTypes(
	id INT auto_increment not null,
	typeName INT not null,
	CONSTRAINT pk_typeName PRIMARY KEY(id),
    CONSTRAINT uq_typeName UNIQUE(typeName)
);
CREATE TABLE Addresses(
	id INT auto_increment not null,
	addressTypeId INT not null,
    customerId INT not null,
    isActive INT not null,
    isDefaultShipping INT not null,
    isDefaultBilling INT not null,
	firstName VARCHAR(50) not null,
    lastName VARCHAR(50) not null,
    dni INT not null,
    phone VARCHAR(20) not null,
    email VARCHAR(255) not null,
    street VARCHAR(100) not null,
    streetNo INT not null,
    pisoDepto VARCHAR(20),
    postalCode VARCHAR(20) not null,
    city VARCHAR(50) not null,
    province VARCHAR(50) not null,
    country VARCHAR(50) not null,
    otherData VARCHAR(255),
    streetBetween1 VARCHAR(100),
    streetBetween2 VARCHAR(100),
	CONSTRAINT pk_address PRIMARY KEY(id),
    CONSTRAINT fk_a_addressTypeId FOREIGN KEY(addressTypeId) REFERENCES AddressType(id),
    CONSTRAINT fk_a_customerId FOREIGN KEY(customerId) REFERENCES Customers(id)
);
CREATE TABLE Customers(
	id INT auto_increment not null,
    isActive INT not null,
	firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    email VARCHAR(255) not null,
    emailVerified INT not null,
    userPassword VARCHAR(255) not null,
    dob timestamp not null,
    gender VARCHAR(10) not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_customer PRIMARY KEY(id),
    CONSTRAINT uq_email UNIQUE(email)
);
CREATE TABLE Orders(
	id INT auto_increment not null,
    customerid INT not null,
    orderNo INT not null,
    ordertimestamp timestamp not null,
    totalPrice INT not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_order PRIMARY KEY(id),
    CONSTRAINT uq_orderNo UNIQUE(orderNo)
);
CREATE TABLE Discounts(
	id INT auto_increment not null,
    discountName VARCHAR(255) not null,
    amount INT not null,
    discountCode INT not null,    
    dateFrom timestamp not null,
	dateTo timestamp not null,
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_discount PRIMARY KEY(id),
    CONSTRAINT uq_discountCode UNIQUE(discountCode)
);
CREATE TABLE DiscountOrder(
	id INT auto_increment not null,
    discountId INT not null,
    orderId INT not null,
	CONSTRAINT pk_discountOrder PRIMARY KEY(id),
    CONSTRAINT fk_do_discountId FOREIGN KEY(discountId) REFERENCES Discounts(id),
    CONSTRAINT fk_do_orderId FOREIGN KEY(orderId) REFERENCES Orders(id)
);
CREATE TABLE OrderProduct(
	id INT auto_increment not null,
    productId INT not null,
    orderId INT not null,
    productQuantity INT not null,
    priceEach DECIMAL(20,2) not null,
	CONSTRAINT pk_orderProduct PRIMARY KEY(id),
    CONSTRAINT fk_op_productId FOREIGN KEY(productId) REFERENCES Products(id),
    CONSTRAINT fk_op_orderId FOREIGN KEY(orderId) REFERENCES Orders(id)
);
CREATE TABLE SizeTables(
	id INT auto_increment not null,
    tableName VARCHAR(255) not null,
    sizes VARCHAR(255) not null, -- datos separados por coma
	CONSTRAINT pk_sizesTable PRIMARY KEY(id),
);
CREATE TABLE Colors(
	id INT auto_increment not null,
    colorName VARCHAR(255) not null,
    CONSTRAINT pk_color PRIMARY KEY(id),
    CONSTRAINT uq_colorName UNIQUE(colorName)
);
CREATE TABLE Brands(
	id INT auto_increment not null,
    brandName VARCHAR(255) not null,
    CONSTRAINT pk_brand PRIMARY KEY(id),
    CONSTRAINT uq_colorName UNIQUE(brandName)
);
CREATE TABLE CategoryImages(
	id INT auto_increment not null,
    categoryId INT not null,
    imageName VARCHAR(255) not null,
    CONSTRAINT pk_categoryImage PRIMARY KEY(id),
    CONSTRAINT fk_ci_categoryId FOREIGN KEY(categoryId) REFERENCES Categories(id)
);
CREATE TABLE Categories(
	id INT auto_increment not null,
    isActive INT not null,
    showMenu INT not null,
    categoryName VARCHAR(255) not null,
    pageTitle VARCHAR(255),
    metaDescription VARCHAR(255),
    metaKeyWords VARCHAR(255),
    parentCategory VARCHAR(255),
    subCategories VARCHAR(255),
    createdAt timestamp not null,
	updatedAt timestamp,
    CONSTRAINT pk_categoryImage PRIMARY KEY(id)
);
CREATE TABLE CategoriesProducts(
	id INT auto_increment not null,
    categoryId INT not null,
    productId  INT not null,
    CONSTRAINT pk_categoryProduct PRIMARY KEY(id),
    CONSTRAINT fk_cp_categoryId FOREIGN KEY(categoryId) REFERENCES Categories(id),
    CONSTRAINT fk_cp_productId FOREIGN KEY(productId) REFERENCES Products(id)
);
CREATE TABLE ProductImages(
	id INT auto_increment not null,
    productId INT not null,
    imageName VARCHAR(255) not null,
    CONSTRAINT pk_productImage PRIMARY KEY(id),
    CONSTRAINT fk_pi_productId FOREIGN KEY(productId) REFERENCES Products(id)
);
CREATE TABLE Products(
	id INT auto_increment not null,
    sizeTableId INT not null,
    brandId INT not null,
    colorId INT not null,
    isActive INT not null,
    productName VARCHAR(100) not null,
    sku VARCHAR(255) not null,
    productPrice DECIMAL(20,2) not null,
    productPriceSpecial DECIMAL(20,2),
    productPriceSpecialFrom timestamp,
    productPriceSpecialTo timestamp,
    shortDescription VARCHAR(255),
    composition VARCHAR(255),
    care VARCHAR(255),
    stock VARCHAR(255) not null, -- valores separados por coma en el orden de los talles
    productsGroup VARCHAR(255),
    categories VARCHAR(255) not null, -- valores separados por coma
    createdAt timestamp not null,
	updatedAt timestamp,
	CONSTRAINT pk_product PRIMARY KEY(id),
    CONSTRAINT fk_p_sizeTable FOREIGN KEY(sizeTableId) REFERENCES SizeTables(id),
    CONSTRAINT fk_p_brandId FOREIGN KEY(brandId) REFERENCES Brands(id),
    CONSTRAINT fk_p_colorId FOREIGN KEY(colorId) REFERENCES Colors(id),
    CONSTRAINT uq_sku UNIQUE(sku)
);


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;