DROP TABLE IF EXISTS `netdiskinfos`;
DROP TABLE IF EXISTS `netdiskinfo`;

CREATE TABLE `netdiskinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `share_link` varchar(255) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `netdiskinfo` (`share_link`, `password`) VALUES ('https://example.com/default-link', '');
