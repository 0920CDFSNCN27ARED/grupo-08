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
	imagesId INT(10) not null,
	isActive INT(1) not null,
	title VARCHAR(50) not null,
	bannerCode VARCHAR(50) not null,
	createdAt timestamp not null,
	updatedAt timestamp,
	dateFrom DATE,
	dateTo DATE,
	CONSTRAINT pk_banners PRIMARY KEY(id),
	CONSTRAINT fk_images FOREIGN KEY(imagesId)
	REFERENCES BannerImages(id),
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
    customerid INT(10) auto_increment not null,
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
