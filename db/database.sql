use bsck432rdeswuuwe34dv;

/*
use bsck432rdeswuuwe34dv;

DROP TABLE VerificationRegisters;
DROP TABLE PurchaseDetails;
DROP TABLE Purchases;
DROP TABLE CheckListItems;
DROP TABLE CheckLists;
DROP TABLE PaymentRegisters;
DROP TABLE Rents;
DROP TABLE RentStatus;
DROP TABLE ReservationDetails;
DROP TABLE Reservations;
DROP TABLE ReservationStatus;
DROP TABLE Images;
DROP TABLE Products;
DROP TABLE Categories;
DROP TABLE Adresses;
DROP TABLE Cities;
DROP TABLE Users;
DROP TABLE RolePermissions;
DROP TABLE Permissions;
DROP TABLE Roles;
*/


CREATE TABLE IF NOT EXISTS Roles (
    id_rol INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_rol)
);

CREATE TABLE IF NOT EXISTS Permissions (
	id_permission INTEGER(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_permission)
);

INSERT INTO Permissions (name, description) VALUES 
("Gestionar Usuarios", "Tiene capacidades para agregar, actualizar, cambiar estado y ver los usuarios"), -- 1
("Gestionar Roles y Permisos", "Tiene capacidades para agregar roles, actualizar roles, ver roles, ver y editar los permisos de los roles,"), -- 2
("Gestionar Productos", "Tiene capacidades para agregar, actualizar, cambiar estado y ver todos productos"), -- 3
("Generar Reservas", "Tiene capacidades para agregar, cancelar y ver la reserva"), -- 4
("Gestionar Reservas", "Tiene capacidades para cambiar estado y ver las reservas"), -- 5
("Gestionar Alquiler", "Tiene capacidades para cambiar estado y ver los alquileres"), -- 6
("Gestionar Registros de Pagos", "Tiene capacidades para agregar y ver los registros de pago"), -- 7
("Modificar Registros de Pagos", "Tiene capacidades para actualizar y eliminar los registros de pago"), -- 8
("Gestionar Agenda", "Tiene capacidades para ver la agenda") -- 9
;

CREATE TABLE IF NOT EXISTS RolePermissions (
	id_rol INT(11) NOT NULL,
    id_permission INT(11) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_rol, id_permission),
    CONSTRAINT FK_RolePermissions FOREIGN KEY (id_rol)
    REFERENCES Roles (id_rol),
    CONSTRAINT FK_PermissionsRoles FOREIGN KEY (id_permission)
    REFERENCES Permissions(id_permission)
);

INSERT INTO Roles (name, description) VALUES (
	'Admin',
    'Este Rol tiene TODOS los permisos'
),(
	'Cliente',
    'Este tiene los permisos necesarios para efectuar sus alquileres'
);

INSERT INTO RolePermissions (id_rol, id_permission) VALUES 
-- Todos los permisos para los Administradores
(1,1), 
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9);

CREATE TABLE IF NOT EXISTS Users (
    id_user INT(11) NOT NULL AUTO_INCREMENT,
    names VARCHAR(50) NOT NULL,
    lastnames VARCHAR(50) NOT NULL,
    dni VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    id_rol INT(11) DEFAULT 2,
    status BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id_user),
    CONSTRAINT FK_UsersRole FOREIGN KEY (id_rol)
    REFERENCES Roles(id_rol)
);

INSERT INTO Users (names, lastnames, dni, mail, password, phone_number, id_rol) VALUES (
	"Admin", "AguaMarina", 12345678, "aguamarina.alquilermobiliario@gmail.com", "$2a$12$.M.RTO5is8iy4hwLxra9rO8jO9rP1KFfMN.m/pBrruzx5uXUyYe8m", 3026551188, 1
);

CREATE TABLE IF NOT EXISTS Cities (
	id_city INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id_city)
);

CREATE TABLE IF NOT EXISTS Adresses (
	id_adress INT(11) NOT NULL AUTO_INCREMENT,
    id_user INT(11) NOT NULL,
    adress VARCHAR(250) NOT NULL,
    city VARCHAR(50) NOT NULL,
    neighborhood VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_adress),
    CONSTRAINT FK_UserAdress FOREIGN KEY (id_user)
    REFERENCES Users(id_user)
);

CREATE TABLE IF NOT EXISTS Categories (
	id_category INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_category)
);

INSERT INTO Categories (name) VALUES (
	"Sillas"
),(
	"Mesas"
);

CREATE TABLE IF NOT EXISTS Products (
	id_product INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    total_quantity INT(11) NOT NULL,
    price DECIMAL(50) NOT NULL,
    description VARCHAR(250),
    id_category INT(11) NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
	PRIMARY KEY (id_product),
    CONSTRAINT FK_ProductsCategory FOREIGN KEY (id_category)
    REFERENCES Categories(id_category)
);

CREATE TABLE IF NOT EXISTS Images (
	id_image INT(11) NOT NULL AUTO_INCREMENT,
    id_product INT(11) NOT NULL,
    path_image VARCHAR(250) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_image),
    CONSTRAINT FK_ImagesProduct FOREIGN KEY (id_product)
    REFERENCES Products(id_product)
);

CREATE TABLE IF NOT EXISTS ReservationStatus (
	id_reservationstatus INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_reservationstatus)
);

INSERT INTO ReservationStatus (name) VALUES
("En Espera"),("Aprobada"),("Desaprobada"),("Cancelada");

CREATE TABLE IF NOT EXISTS Reservations (
	id_reservation INT(11) NOT NULL AUTO_INCREMENT,
    id_user INT(11) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    adress VARCHAR(250) NOT NULL,
    city VARCHAR(50) NOT NULL,
    neighborhood VARCHAR(50) NOT NULL,
    id_status INT(11) NOT NULL DEFAULT 1,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_reservation),
    CONSTRAINT ReservationsUser FOREIGN KEY (id_user)
    REFERENCES Users(id_user),
    CONSTRAINT ReservationsStatus FOREIGN KEY (id_status)
    REFERENCES ReservationStatus(id_reservationstatus)
);

CREATE TABLE IF NOT EXISTS ReservationDetails (
	id_reservation INT(11) NOT NULL,
    id_product INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    total_price DECIMAL(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_reservation, id_product),
    CONSTRAINT FK_IdReservationDetails FOREIGN KEY (id_reservation)
    REFERENCES Reservations(id_reservation),
    CONSTRAINT FK_ProductReservationDetails FOREIGN KEY (id_product)
    REFERENCES Products(id_product)
);

CREATE TABLE IF NOT EXISTS RentStatus (
	id_rentstatus INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
    PRIMARY KEY (id_rentstatus)
);

INSERT INTO RentStatus (name) VALUES 
("En Proceso"),("Cancelado"),("Completado");

CREATE TABLE IF NOT EXISTS Rents (
	id_rent INT(11) NOT NULL AUTO_INCREMENT,
    id_reservation INT(11) NOT NULL,
    id_seller INT(11) NOT NULL,
    id_status INT(11) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_rent),
    CONSTRAINT FK_RentReservation FOREIGN KEY (id_reservation)
    REFERENCES Reservations(id_reservation),
    CONSTRAINT FK_RentSeller FOREIGN KEY (id_seller)
    REFERENCES Users(id_user),
    CONSTRAINT FK_RentsStatus FOREIGN KEY (id_status)
    REFERENCES RentStatus(id_rentstatus)
);

CREATE TABLE IF NOT EXISTS PaymentRegisters (
	id_payment INT(11) NOT NULL AUTO_INCREMENT,
    id_rent INT(11) NOT NULL,
    id_client INT(11) NOT NULL,
    payment_date DATETIME NOT NULL,
    payment_amount DECIMAL(50) NOT NULL,
    description VARCHAR(250),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_payment),
    CONSTRAINT FK_PaymentRent FOREIGN KEY (id_rent)
    REFERENCES Rents(id_rent),
    CONSTRAINT FK_PaymentClient FOREIGN KEY (id_client)
    REFERENCES Users(id_user)
);

CREATE TABLE IF NOT EXISTS CheckLists (
	id_checklist INT(11) NOT NULL AUTO_INCREMENT,
    id_rent INT(11) NOT NULL ,
    description VARCHAR(250),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_checklist),
    CONSTRAINT FK_CheckListRent FOREIGN KEY (id_rent)
    REFERENCES Rents(id_rent)
);

CREATE TABLE IF NOT EXISTS CheckListItems (
	id_checklist INT(11) NOT NULL,
    id_product INT(11) NOT NULL,
    total_quantity INT(11) NOT NULL,
    bad_quantity INT(11) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_checklist, id_product),
    CONSTRAINT FK_CheckList_Details FOREIGN KEY (id_checklist)
    REFERENCES CheckLists(id_checklist),
    CONSTRAINT FK_CheckListProduct FOREIGN KEY (id_product)
    REFERENCES Products(id_product)
);

CREATE TABLE IF NOT EXISTS Purchases (
	id_purchase INT(11) NOT NULL AUTO_INCREMENT,
    purchase_date DATETIME NOT NULL,
    id_buyer INT(11) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_purchase),
    CONSTRAINT FK_Purchase_User FOREIGN KEY (id_buyer)
	REFERENCES Users(id_user)
);

CREATE TABLE IF NOT EXISTS PurchaseDetails (
	id_purchase INT(11) NOT NULL,
    id_product INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    unit_cost DECIMAL(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id_purchase, id_product),
    CONSTRAINT FK_PurchaseDetails FOREIGN KEY (id_purchase)
    REFERENCES Purchases(id_purchase) ON DELETE CASCADE,
    CONSTRAINT FK_PurchaseProduct FOREIGN KEY (id_product)
    REFERENCES Products(id_product)
);

CREATE TABLE IF NOT EXISTS VerificationRegisters (
    mail VARCHAR(50) NOT NULL UNIQUE,
    code INT(255) NOT NULL,
    created_at DATETIME NOT NULL,
    
    PRIMARY KEY (mail)
);
