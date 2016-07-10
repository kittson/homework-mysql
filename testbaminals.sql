-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.13-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for animals_db
CREATE DATABASE IF NOT EXISTS `animals_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `animals_db`;


-- Dumping structure for table animals_db.people
CREATE TABLE IF NOT EXISTS `people` (
  `name` varchar(30) NOT NULL,
  `has_pet` tinyint(1) NOT NULL,
  `pet_name` varchar(30) DEFAULT NULL,
  `pet_age` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table animals_db.people: ~2 rows (approximately)
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` (`name`, `has_pet`, `pet_name`, `pet_age`) VALUES
	('joe', 1, 'foo foo', 22),
	('zori', 1, 'frisky', 2);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
