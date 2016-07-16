-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.13-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.5104
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for bamazon
CREATE DATABASE IF NOT EXISTS `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bamazon`;

-- Dumping structure for table bamazon.products
CREATE TABLE IF NOT EXISTS `products` (
  `ItemID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(100) NOT NULL,
  `DepartmentName` varchar(100) DEFAULT NULL,
  `Price` decimal(13,2) NOT NULL,
  `StockQuantity` mediumint(9) NOT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table bamazon.products: ~10 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`ItemID`, `ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES
	(1, 'flying sheep', 'sheep-aircraft', 4235.22, 76),
	(2, 'egg and spam', 'spam', 99.00, 44),
	(3, 'egg bacon and spam', 'spam', 3.99, 5),
	(4, 'spam sandwich', 'spam', 90.00, 3),
	(5, 'spam egg sausage and spam', 'spam', 17.99, 17),
	(6, 'Red Windsor', 'comestibles', 42.00, 15),
	(7, 'spam sandwich with spam', 'spam', 90.00, 22),
	(8, 'Venezuelan beaver cheese', 'comestibles', 13.00, 50),
	(9, 'comfy chair-yellow', 'torture devices', 300.00, 2),
	(10, 'comfy chair-blue', 'torture devices', 300.00, 3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
