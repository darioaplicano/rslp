-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2019 a las 16:46:02
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `main`
--
CREATE DATABASE IF NOT EXISTS `main` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `main`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actor`
--

DROP TABLE IF EXISTS `actor`;
CREATE TABLE `actor` (
  `act_id` int(11) NOT NULL,
  `act_nombre` varchar(100) NOT NULL,
  `act_apellidos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actua`
--

DROP TABLE IF EXISTS `actua`;
CREATE TABLE `actua` (
  `actu_id` int(11) NOT NULL,
  `actu_act_id` int(11) NOT NULL,
  `actu_con_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

DROP TABLE IF EXISTS `autor`;
CREATE TABLE `autor` (
  `aut_id` int(11) NOT NULL,
  `aut_nombre` varchar(50) NOT NULL,
  `aut_apellidos` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido`
--

DROP TABLE IF EXISTS `contenido`;
CREATE TABLE `contenido` (
  `con_id` int(11) NOT NULL,
  `con_titulo` varchar(100) NOT NULL,
  `con_anno` int(5) NOT NULL,
  `con_genero` varchar(100) NOT NULL,
  `con_sinopsis` text NOT NULL,
  `con_tip_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dirige`
--

DROP TABLE IF EXISTS `dirige`;
CREATE TABLE `dirige` (
  `dir_id` int(11) NOT NULL,
  `dir_con_id` int(11) NOT NULL,
  `dir_aut_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edicion`
--

DROP TABLE IF EXISTS `edicion`;
CREATE TABLE `edicion` (
  `edi_id` int(11) NOT NULL,
  `edi_usu_id` int(11) NOT NULL,
  `edi_con_id` int(11) NOT NULL,
  `edi_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenna`
--

DROP TABLE IF EXISTS `resenna`;
CREATE TABLE `resenna` (
  `res_id` int(11) NOT NULL,
  `res_valoracion` int(11) NOT NULL,
  `res_comentario` varchar(140) NOT NULL,
  `res_usu_id` int(11) NOT NULL,
  `res_con_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguido`
--

DROP TABLE IF EXISTS `seguido`;
CREATE TABLE `seguido` (
  `seg_id` int(11) NOT NULL,
  `seg_seguidorID` int(11) NOT NULL,
  `seg_seguidoID` int(11) NOT NULL,
  `seg_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

DROP TABLE IF EXISTS `tipo`;
CREATE TABLE `tipo` (
  `tip_id` int(11) NOT NULL,
  `tip_descripcion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`tip_id`, `tip_descripcion`) VALUES
(1, 'Libro'),
(2, 'Película');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `usu_id` int(11) NOT NULL,
  `usu_nickname` varchar(30) NOT NULL,
  `usu_correo` varchar(50) NOT NULL,
  `usu_contrasena` varchar(100) NOT NULL,
  `usu_imagen` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ver`
--

DROP TABLE IF EXISTS `ver`;
CREATE TABLE `ver` (
  `ver_id` int(11) NOT NULL,
  `ver_usu_id` int(11) NOT NULL,
  `ver_con_id` int(11) NOT NULL,
  `ver_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visto`
--

DROP TABLE IF EXISTS `visto`;
CREATE TABLE `visto` (
  `vis_id` int(11) NOT NULL,
  `vis_usu_id` int(11) NOT NULL,
  `vis_con_id` int(11) NOT NULL,
  `vis_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vis_recomienda` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`act_id`);

--
-- Indices de la tabla `actua`
--
ALTER TABLE `actua`
  ADD PRIMARY KEY (`actu_id`);

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`aut_id`);

--
-- Indices de la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD PRIMARY KEY (`con_id`);

--
-- Indices de la tabla `dirige`
--
ALTER TABLE `dirige`
  ADD PRIMARY KEY (`dir_id`);

--
-- Indices de la tabla `edicion`
--
ALTER TABLE `edicion`
  ADD PRIMARY KEY (`edi_id`);

--
-- Indices de la tabla `resenna`
--
ALTER TABLE `resenna`
  ADD PRIMARY KEY (`res_id`);

--
-- Indices de la tabla `seguido`
--
ALTER TABLE `seguido`
  ADD PRIMARY KEY (`seg_id`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`tip_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usu_id`);

--
-- Indices de la tabla `ver`
--
ALTER TABLE `ver`
  ADD PRIMARY KEY (`ver_id`);

--
-- Indices de la tabla `visto`
--
ALTER TABLE `visto`
  ADD PRIMARY KEY (`vis_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actor`
--
ALTER TABLE `actor`
  MODIFY `act_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `actua`
--
ALTER TABLE `actua`
  MODIFY `actu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `aut_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contenido`
--
ALTER TABLE `contenido`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dirige`
--
ALTER TABLE `dirige`
  MODIFY `dir_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `edicion`
--
ALTER TABLE `edicion`
  MODIFY `edi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resenna`
--
ALTER TABLE `resenna`
  MODIFY `res_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguido`
--
ALTER TABLE `seguido`
  MODIFY `seg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `tip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ver`
--
ALTER TABLE `ver`
  MODIFY `ver_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visto`
--
ALTER TABLE `visto`
  MODIFY `vis_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
