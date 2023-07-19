-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2023 at 02:53 PM
-- Server version: 10.11.2-MariaDB-log
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mjshopify`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `uniqueRequestHash` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `siteHash` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prompt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tnlMessageId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrls` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `tnlResponse` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `uniqueRequestHash`, `customerId`, `siteHash`, `prompt`, `tnlMessageId`, `imageUrls`, `ref`, `progress`, `tnlResponse`) VALUES
(1, '26d1afd46aa123966b27ac29839307ba7ac8d4479b30d04b500412546f13fa74', '123', 'aba gaha mudune', 'ane anichchan', '3h7rQRM8KNafV3DisDXQ', NULL, NULL, 0, NULL),
(2, '24177a45660540f3622919c0264b16fa058c0ba9027a0d31e69b52e73853fd68', '123', 'aba gaha mudune', 'ane anichchan', 'C3hjFi93vTJJ2lfFyc7O', 'https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_0.png,https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_1.png,https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_2.png,https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_3.png', NULL, 100, '{\"createdAt\":\"2023-07-13T16:06:36.460Z\",\"originatingMessageId\":\"C3hjFi93vTJJ2lfFyc7O\",\"ref\":\"24177a45660540f3622919c0264b16fa058c0ba9027a0d31e69b52e73853fd68\",\"buttons\":[\"U1\",\"U2\",\"U3\",\"U4\",\"🔄\",\"V1\",\"V2\",\"V3\",\"V4\"],\"imageUrl\":\"https://cdn.discordapp.com/attachments/1120631194430746656/1129081455767715960/JoelmLong_ane_anichchan_8431ef42-f56c-4812-8802-f8aefb36cd70.png\",\"imageUrls\":[\"https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_0.png\",\"https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_1.png\",\"https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_2.png\",\"https://cdn.midjourney.com/8431ef42-f56c-4812-8802-f8aefb36cd70/0_3.png\"],\"responseAt\":\"2023-07-13T16:06:36.993Z\",\"description\":\"\",\"type\":\"imagine\",\"content\":\"ane anichchan\",\"buttonMessageId\":\"63ZlbiCM00qn3TuLQ0S4\"}');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `storedomain` varchar(500) NOT NULL,
  `storekey` varchar(260) NOT NULL,
  `mjtokens` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
