/*Todos aquellos usuarios de la aplicación*/
CREATE TABLE Usuario(
	dni 		VARCHAR(9) PRIMARY KEY,
	password 	VARCHAR(20) NOT NULL,
	nombre		VARCHAR(15) NOT NULL,
	apellido1 	VARCHAR(15) NOT NULL,
	apellido2 	VARCHAR(15) NOT NULL,
	email 		BOOLEAN
);

/*Cada uno de los proyectos en los que participan los usuarios*/
CREATE TABLE Proyecto(
	acronimo 	VARCHAR(9)  PRIMARY KEY,
	nombre		VARCHAR(15) NOT NULL,
	presupuesto INT(6) NOT NULL,
	n_conta		INT(6) NOT NULL,
	ip1			VARCHAR(9) NOT NULL,
	ip2			VARCHAR(9) NOT NULL,
	FOREIGN KEY (ip1)  REFERENCES Usuario(dni),
	FOREIGN KEY (ip2)  REFERENCES Usuario(dni)
);

/*Tabla de ralación entre los participantes y un proyecto*/
CREATE TABLE Usuario_Proyecto(
	usuario 	VARCHAR(9) PRIMARY KEY,
	proyecto 	VARCHAR(9)  NOT NULL,
	FOREIGN KEY (usuario) REFERENCES Usuario(dni),
	FOREIGN KEY (proyecto) REFERENCES Proyecto(acronimo)
);

 /*Valoraciones campo*/
CREATE TABLE Otro_gasto(
	titulo		VARCHAR(25) PRIMARY KEY,
	importe 	INT(6)	NOT NULL,
	iva			INT(6)	NOT NULL,
	comentario	VARCHAR(200) NOT NULL,
	proyecto	VARCHAR(9)	NOT NULL,
	FOREIGN KEY (proyecto) REFERENCES Proyecto(acronimo)

);

CREATE TABLE Acreedor(
	iban 	VARCHAR(24) PRIMARY KEY,
	nif		VARCHAR(9),
	nombre	VARCHAR(25)
);


 /*Guarda los eventos y sus datos*/
CREATE TABLE Orden(
	id 			INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	numeracion  INT(6) UNSIGNED NOT NULL,
	estado 		VARCHAR(25),
	dni 		VARCHAR(9),
	acronimo 	VARCHAR(9),
	acreedor 	VARCHAR(24),
	FOREIGN KEY (dni) REFERENCES Usuario(dni),
	FOREIGN KEY (acronimo) REFERENCES Proyecto(acronimo),
	FOREIGN KEY (acreedor) REFERENCES Acreedor(iban)
);

CREATE TABLE Tipo(
	nombre 	VARCHAR(15) NOT NULL PRIMARY KEY
);

 /*Guarda las imagenes referenciadas al campo que pertenecen*/
CREATE TABLE Gasto(
	id  INT(6) UNSIGNED AUTO_INCREMENT NOT NULL  PRIMARY KEY,
	descripcion VARCHAR(30),
	importe 	INT(6)	NOT NULL,
	iva			INT(6)	NOT NULL,
	comentario	VARCHAR(200) NOT NULL,
	orden		INT(6) UNSIGNED,
	tipo		VARCHAR(15),
	FOREIGN KEY (orden) REFERENCES Orden(id),
	FOREIGN KEY (tipo) REFERENCES Tipo(nombre)
);

CREATE TABLE Imagen_Orden(
	imagen 	INT(6) UNSIGNED NOT NULL PRIMARY KEY,
	gasto  INT(6) UNSIGNED,
	FOREIGN KEY (gasto) REFERENCES Gasto(id)
);
