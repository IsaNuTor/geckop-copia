-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2019 a las 18:51:30
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `geckop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acreedor`
--

CREATE TABLE `acreedor` (
  `iban` varchar(24) NOT NULL,
  `nif` varchar(9) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id` int(6) UNSIGNED NOT NULL,
  `descripcion` varchar(30) DEFAULT NULL,
  `importe` int(6) NOT NULL,
  `iva` int(6) NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `orden` int(6) UNSIGNED DEFAULT NULL,
  `tipo` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_orden`
--

CREATE TABLE `imagen_orden` (
  `imagen` int(6) UNSIGNED NOT NULL,
  `gasto` int(6) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id` int(6) UNSIGNED NOT NULL,
  `numeracion` int(6) UNSIGNED NOT NULL,
  `estado` varchar(25) DEFAULT NULL,
  `dni` varchar(9) DEFAULT NULL,
  `acronimo` varchar(9) DEFAULT NULL,
  `acreedor` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otro_gasto`
--

CREATE TABLE `otro_gasto` (
  `titulo` varchar(25) NOT NULL,
  `importe` int(6) NOT NULL,
  `iva` int(6) NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `proyecto` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `acronimo` varchar(9) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `presupuesto` int(6) NOT NULL,
  `n_conta` int(6) NOT NULL,
  `ip1` varchar(9) NOT NULL,
  `ip2` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` varchar(9) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellido1` varchar(15) NOT NULL,
  `apellido2` varchar(15) NOT NULL,
  `email` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_proyecto`
--

CREATE TABLE `usuario_proyecto` (
  `usuario` varchar(9) NOT NULL,
  `proyecto` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acreedor`
--
ALTER TABLE `acreedor`
  ADD PRIMARY KEY (`iban`);

--
-- Indices de la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orden` (`orden`),
  ADD KEY `tipo` (`tipo`);

--
-- Indices de la tabla `imagen_orden`
--
ALTER TABLE `imagen_orden`
  ADD PRIMARY KEY (`imagen`),
  ADD KEY `gasto` (`gasto`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dni` (`dni`),
  ADD KEY `acronimo` (`acronimo`),
  ADD KEY `acreedor` (`acreedor`);

--
-- Indices de la tabla `otro_gasto`
--
ALTER TABLE `otro_gasto`
  ADD PRIMARY KEY (`titulo`),
  ADD KEY `proyecto` (`proyecto`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`acronimo`),
  ADD KEY `ip1` (`ip1`),
  ADD KEY `ip2` (`ip2`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `usuario_proyecto`
--
ALTER TABLE `usuario_proyecto`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `proyecto` (`proyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gasto`
--
ALTER TABLE `gasto`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD CONSTRAINT `gasto_ibfk_1` FOREIGN KEY (`orden`) REFERENCES `orden` (`id`),
  ADD CONSTRAINT `gasto_ibfk_2` FOREIGN KEY (`tipo`) REFERENCES `tipo` (`nombre`);

--
-- Filtros para la tabla `imagen_orden`
--
ALTER TABLE `imagen_orden`
  ADD CONSTRAINT `imagen_orden_ibfk_1` FOREIGN KEY (`gasto`) REFERENCES `gasto` (`id`);

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`),
  ADD CONSTRAINT `orden_ibfk_2` FOREIGN KEY (`acronimo`) REFERENCES `proyecto` (`acronimo`),
  ADD CONSTRAINT `orden_ibfk_3` FOREIGN KEY (`acreedor`) REFERENCES `acreedor` (`iban`);

--
-- Filtros para la tabla `otro_gasto`
--
ALTER TABLE `otro_gasto`
  ADD CONSTRAINT `otro_gasto_ibfk_1` FOREIGN KEY (`proyecto`) REFERENCES `proyecto` (`acronimo`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`ip1`) REFERENCES `usuario` (`dni`),
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`ip2`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `usuario_proyecto`
--
ALTER TABLE `usuario_proyecto`
  ADD CONSTRAINT `usuario_proyecto_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`dni`),
  ADD CONSTRAINT `usuario_proyecto_ibfk_2` FOREIGN KEY (`proyecto`) REFERENCES `proyecto` (`acronimo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
