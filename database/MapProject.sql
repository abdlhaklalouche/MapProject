CREATE DATABASE  IF NOT EXISTS `MapProject` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `MapProject`;
-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: MapProject
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'barrages'),(2,'comptabilité'),(3,'aéroport'),(4,'galerie d\'art'),(5,'atm'),(6,'boulangerie'),(7,'banque'),(8,'magasin de vélos'),(9,'librairie'),(10,'Allée de bowling'),(11,'station de bus'),(12,'café'),(13,'camping'),(14,'concessionnaire'),(15,'location de voiture'),(16,'réparation automobile'),(17,'Lave-Auto'),(18,'cimetière'),(19,'mosquée'),(20,'magasin de vêtements'),(21,'épicerie'),(22,'tribunal'),(23,'dentiste'),(24,'grand magasin'),(25,'médecin'),(26,'électricien'),(27,'ambassade'),(28,'caserne de pompiers'),(29,'poste de police'),(30,'fleuriste'),(31,'Magasin de meubles'),(32,'station-essence'),(33,'Gym'),(34,'soin des cheveux'),(35,'magasin d\'articles pour la maison'),(36,'hôpital'),(37,'Agence d\'assurance'),(38,'bijouterie'),(39,'blanchisserie'),(40,'avocat'),(41,'bibliothèque'),(42,'hébergement'),(43,'musée'),(44,'peintre'),(45,'parc'),(46,'parking'),(47,'pharmacie'),(48,'physiothérapeute'),(49,'plombier'),(50,'bureau de poste'),(51,'restaurant'),(52,'école'),(53,'centre commercial'),(54,'stade'),(55,'espace de rangement'),(56,'magasin'),(57,'station de métro'),(58,'supermarché'),(59,'station de taxi'),(60,'agence de voyage'),(61,'zoo'),(62,'barrages'),(63,'comptabilité'),(64,'aéroport'),(65,'galerie d\'art'),(66,'atm'),(67,'boulangerie'),(68,'banque'),(69,'magasin de vélos'),(70,'librairie'),(71,'Allée de bowling'),(72,'station de bus'),(73,'café'),(74,'camping'),(75,'concessionnaire'),(76,'location de voiture'),(77,'réparation automobile'),(78,'Lave-Auto'),(79,'cimetière'),(80,'mosquée'),(81,'magasin de vêtements'),(82,'épicerie'),(83,'tribunal'),(84,'dentiste'),(85,'grand magasin'),(86,'médecin'),(87,'électricien'),(88,'ambassade'),(89,'caserne de pompiers'),(90,'poste de police'),(91,'fleuriste'),(92,'Magasin de meubles'),(93,'station-essence'),(94,'Gym'),(95,'soin des cheveux'),(96,'magasin d\'articles pour la maison'),(97,'hôpital'),(98,'Agence d\'assurance'),(99,'bijouterie'),(100,'blanchisserie'),(101,'avocat'),(102,'bibliothèque'),(103,'hébergement'),(104,'musée'),(105,'peintre'),(106,'parc'),(107,'parking'),(108,'pharmacie'),(109,'physiothérapeute'),(110,'plombier'),(111,'bureau de poste'),(112,'restaurant'),(113,'école'),(114,'centre commercial'),(115,'stade'),(116,'espace de rangement'),(117,'magasin'),(118,'station de métro'),(119,'supermarché'),(120,'station de taxi'),(121,'agence de voyage'),(122,'zoo');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_attributs`
--

DROP TABLE IF EXISTS `categories_attributs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories_attributs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `optionnel` tinyint(4) DEFAULT '1',
  `categories_attributs_types_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categories_attributs_categories_attributs_types_idx` (`categories_attributs_types_id`),
  KEY `fk_categories_attributs_categories1_idx` (`categories_id`),
  CONSTRAINT `fk_categories_attributs_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_categories_attributs_categories_attributs_types` FOREIGN KEY (`categories_attributs_types_id`) REFERENCES `categories_attributs_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_attributs`
--

LOCK TABLES `categories_attributs` WRITE;
/*!40000 ALTER TABLE `categories_attributs` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_attributs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_attributs_types`
--

DROP TABLE IF EXISTS `categories_attributs_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories_attributs_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_attributs_types`
--

LOCK TABLES `categories_attributs_types` WRITE;
/*!40000 ALTER TABLE `categories_attributs_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_attributs_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communes`
--

DROP TABLE IF EXISTS `communes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `communes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `code_postal` int(11) NOT NULL,
  `villes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_postal_UNIQUE` (`code_postal`),
  KEY `fk_communes_villes1_idx` (`villes_id`),
  CONSTRAINT `fk_communes_villes1` FOREIGN KEY (`villes_id`) REFERENCES `villes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1560 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communes`
--

LOCK TABLES `communes` WRITE;
/*!40000 ALTER TABLE `communes` DISABLE KEYS */;
INSERT INTO `communes` VALUES (1,'Adrar',1001,1),(2,'Tamest',1002,1),(3,'Charouine',1003,1),(4,'Reggane',1004,1),(5,'Inozghmir',1005,1),(6,'Tit',1006,1),(7,'Ksar Kaddour',1007,1),(8,'Tsabit',1008,1),(9,'Timimoun',1009,1),(10,'Ouled Said',1010,1),(11,'Zaouiet Kounta',1011,1),(12,'Aoulef',1012,1),(13,'Timokten',1013,1),(14,'Tamentit',1014,1),(15,'Fenoughil',1015,1),(16,'Tinerkouk',1016,1),(17,'Deldoul',1017,1),(18,'Sali',1018,1),(19,'Akabli',1019,1),(20,'Metarfa',1020,1),(21,'O Ahmed Timmi',1021,1),(22,'Bouda',1022,1),(23,'Aougrout',1023,1),(24,'Talmine',1024,1),(25,'B Badji Mokhtar',1025,1),(26,'Sbaa',1026,1),(27,'Ouled Aissa',1027,1),(28,'Timiaouine',1028,1),(29,'Chlef',2001,2),(30,'Tenes',2002,2),(31,'Benairia',2003,2),(32,'El Karimia',2004,2),(33,'Tadjna',2005,2),(34,'Taougrite',2006,2),(35,'Beni Haoua',2007,2),(36,'Sobha',2008,2),(37,'Harchoun',2009,2),(38,'Ouled Fares',2010,2),(39,'Sidi Akacha',2011,2),(40,'Boukadir',2012,2),(41,'Beni Rached',2013,2),(42,'Talassa',2014,2),(43,'Herenfa',2015,2),(44,'Oued Goussine',2016,2),(45,'Dahra',2017,2),(46,'Ouled Abbes',2018,2),(47,'Sendjas',2019,2),(48,'Zeboudja',2020,2),(49,'Oued Sly',2021,2),(50,'Abou El Hassen',2022,2),(51,'El Marsa',2023,2),(52,'Chettia',2024,2),(53,'Sidi Abderrahmane',2025,2),(54,'Moussadek',2026,2),(55,'El Hadjadj',2027,2),(56,'Labiod Medjadja',2028,2),(57,'Oued Fodda',2029,2),(58,'Ouled Ben Abdelkader',2030,2),(59,'Bouzghaia',2031,2),(60,'Ain Merane',2032,2),(61,'Oum Drou',2033,2),(62,'Breira',2034,2),(63,'Ben Boutaleb',2035,2),(64,'Laghouat',3001,3),(65,'Ksar El Hirane',3002,3),(66,'Benacer Ben Chohra',3003,3),(67,'Sidi Makhlouf',3004,3),(68,'Hassi Delaa',3005,3),(69,'Hassi R Mel',3006,3),(70,'Ain Mahdi',3007,3),(71,'Tadjmout',3008,3),(72,'Kheneg',3009,3),(73,'Gueltat Sidi Saad',3010,3),(74,'Ain Sidi Ali',3011,3),(75,'Beidha',3012,3),(76,'Brida',3013,3),(77,'El Ghicha',3014,3),(78,'Hadj Mechri',3015,3),(79,'Sebgag',3016,3),(80,'Taouiala',3017,3),(81,'Tadjrouna',3018,3),(82,'Aflou',3019,3),(83,'El Assafia',3020,3),(84,'Oued Morra',3021,3),(85,'Oued M Zi',3022,3),(86,'El Haouaita',3023,3),(87,'Sidi Bouzid',3024,3),(88,'Oum El Bouaghi',4001,4),(89,'Ain Beida',4002,4),(90,'Ainmlila',4003,4),(91,'Behir Chergui',4004,4),(92,'El Amiria',4005,4),(93,'Sigus',4006,4),(94,'El Belala',4007,4),(95,'Ain Babouche',4008,4),(96,'Berriche',4009,4),(97,'Ouled Hamla',4010,4),(98,'Dhala',4011,4),(99,'Ain Kercha',4012,4),(100,'Hanchir Toumghani',4013,4),(101,'El Djazia',4014,4),(102,'Ain Diss',4015,4),(103,'Fkirina',4016,4),(104,'Souk Naamane',4017,4),(105,'Zorg',4018,4),(106,'El Fedjoudj Boughrar',4019,4),(107,'Ouled Zouai',4020,4),(108,'Bir Chouhada',4021,4),(109,'Ksar Sbahi',4022,4),(110,'Oued Nini',4023,4),(111,'Meskiana',4024,4),(112,'Ain Fekroune',4025,4),(113,'Rahia',4026,4),(114,'Ain Zitoun',4027,4),(115,'Ouled Gacem',4028,4),(116,'El Harmilia',4029,4),(117,'Batna',5001,5),(118,'Ghassira',5002,5),(119,'Maafa',5003,5),(120,'Merouana',5004,5),(121,'Seriana',5005,5),(122,'Menaa',5006,5),(123,'El Madher',5007,5),(124,'Tazoult',5008,5),(125,'Ngaous',5009,5),(126,'Guigba',5010,5),(127,'Inoughissen',5011,5),(128,'Ouyoun El Assafir',5012,5),(129,'Djerma',5013,5),(130,'Bitam',5014,5),(131,'Metkaouak',5015,5),(132,'Arris',5016,5),(133,'Kimmel',5017,5),(134,'Tilatou',5018,5),(135,'Ain Djasser',5019,5),(136,'Ouled Selam',5020,5),(137,'Tigherghar',5021,5),(138,'Ain Yagout',5022,5),(139,'Fesdis',5023,5),(140,'Sefiane',5024,5),(141,'Rahbat',5025,5),(142,'Tighanimine',5026,5),(143,'Lemsane',5027,5),(144,'Ksar Belezma',5028,5),(145,'Seggana',5029,5),(146,'Ichmoul',5030,5),(147,'Foum Toub',5031,5),(148,'Beni Foudhala El Hakania',5032,5),(149,'Oued El Ma',5033,5),(150,'Talkhamt',5034,5),(151,'Bouzina',5035,5),(152,'Chemora',5036,5),(153,'Oued Chaaba',5037,5),(154,'Taxlent',5038,5),(155,'Gosbat',5039,5),(156,'Ouled Aouf',5040,5),(157,'Boumagueur',5041,5),(158,'Barika',5042,5),(159,'Djezzar',5043,5),(160,'Tkout',5044,5),(161,'Ain Touta',5045,5),(162,'Hidoussa',5046,5),(163,'Teniet El Abed',5047,5),(164,'Oued Taga',5048,5),(165,'Ouled Fadel',5049,5),(166,'Timgad',5050,5),(167,'Ras El Aioun',5051,5),(168,'Chir',5052,5),(169,'Ouled Si Slimane',5053,5),(170,'Zanat El Beida',5054,5),(171,'Amdoukal',5055,5),(172,'Ouled Ammar',5056,5),(173,'El Hassi',5057,5),(174,'Lazrou',5058,5),(175,'Boumia',5059,5),(176,'Boulhilat',5060,5),(177,'Larbaa',5061,5),(178,'Bejaia',6001,6),(179,'Amizour',6002,6),(180,'Ferraoun',6003,6),(181,'Taourirt Ighil',6004,6),(182,'Chelata',6005,6),(183,'Tamokra',6006,6),(184,'Timzrit',6007,6),(185,'Souk El Thenine',6008,6),(186,'Mcisna',6009,6),(187,'Thinabdher',6010,6),(188,'Tichi',6011,6),(189,'Semaoun',6012,6),(190,'Kendira',6013,6),(191,'Tifra',6014,6),(192,'Ighram',6015,6),(193,'Amalou',6016,6),(194,'Ighil Ali',6017,6),(195,'Ifelain Ilmathen',6018,6),(196,'Toudja',6019,6),(197,'Darguina',6020,6),(198,'Sidi Ayad',6021,6),(199,'Aokas',6022,6),(200,'Beni Djellil',6023,6),(201,'Adekar',6024,6),(202,'Akbou',6025,6),(203,'Seddouk',6026,6),(204,'Tazmalt',6027,6),(205,'Ait Rizine',6028,6),(206,'Chemini',6029,6),(207,'Souk Oufella',6030,6),(208,'Taskriout',6031,6),(209,'Tibane',6032,6),(210,'Tala Hamza',6033,6),(211,'Barbacha',6034,6),(212,'Beni Ksila',6035,6),(213,'Ouzallaguen',6036,6),(214,'Bouhamza',6037,6),(215,'Beni Melikeche',6038,6),(216,'Sidi Aich',6039,6),(217,'El Kseur',6040,6),(218,'Melbou',6041,6),(219,'Akfadou',6042,6),(220,'Leflaye',6043,6),(221,'Kherrata',6044,6),(222,'Draa Kaid',6045,6),(223,'Tamridjet',6046,6),(224,'Ait Smail',6047,6),(225,'Boukhelifa',6048,6),(226,'Tizi Nberber',6049,6),(227,'Beni Maouch',6050,6),(228,'Oued Ghir',6051,6),(229,'Boudjellil',6052,6),(230,'Biskra',7001,7),(231,'Oumache',7002,7),(232,'Branis',7003,7),(233,'Chetma',7004,7),(234,'Ouled Djellal',7005,7),(235,'Ras El Miaad',7006,7),(236,'Besbes',7007,7),(237,'Sidi Khaled',7008,7),(238,'Doucen',7009,7),(239,'Ech Chaiba',7010,7),(240,'Sidi Okba',7011,7),(241,'Mchouneche',7012,7),(242,'El Haouch',7013,7),(243,'Ain Naga',7014,7),(244,'Zeribet El Oued',7015,7),(245,'El Feidh',7016,7),(246,'El Kantara',7017,7),(247,'Ain Zaatout',7018,7),(248,'El Outaya',7019,7),(249,'Djemorah',7020,7),(250,'Tolga',7021,7),(251,'Lioua',7022,7),(252,'Lichana',7023,7),(253,'Ourlal',7024,7),(254,'Mlili',7025,7),(255,'Foughala',7026,7),(256,'Bordj Ben Azzouz',7027,7),(257,'Meziraa',7028,7),(258,'Bouchagroun',7029,7),(259,'Mekhadma',7030,7),(260,'El Ghrous',7031,7),(261,'El Hadjab',7032,7),(262,'Khanguet Sidinadji',7033,7),(263,'Bechar',8001,8),(264,'Erg Ferradj',8002,8),(265,'Ouled Khoudir',8003,8),(266,'Meridja',8004,8),(267,'Timoudi',8005,8),(268,'Lahmar',8006,8),(269,'Beni Abbes',8007,8),(270,'Beni Ikhlef',8008,8),(271,'Mechraa Houari B',8009,8),(272,'Kenedsa',8010,8),(273,'Igli',8011,8),(274,'Tabalbala',8012,8),(275,'Taghit',8013,8),(276,'El Ouata',8014,8),(277,'Boukais',8015,8),(278,'Mogheul',8016,8),(279,'Abadla',8017,8),(280,'Kerzaz',8018,8),(281,'Ksabi',8019,8),(282,'Tamtert',8020,8),(283,'Beni Ounif',8021,8),(284,'Blida',9001,9),(285,'Chebli',9002,9),(286,'Bouinan',9003,9),(287,'Oued El Alleug',9004,9),(288,'Ouled Yaich',9007,9),(289,'Chrea',9008,9),(290,'El Affroun',9010,9),(291,'Chiffa',9011,9),(292,'Hammam Melouane',9012,9),(293,'Ben Khlil',9013,9),(294,'Soumaa',9014,9),(295,'Mouzaia',9016,9),(296,'Souhane',9017,9),(297,'Meftah',9018,9),(298,'Ouled Selama',9019,9),(299,'Boufarik',9020,9),(300,'Larbaa',9021,9),(301,'Oued Djer',9022,9),(302,'Beni Tamou',9023,9),(303,'Bouarfa',9024,9),(304,'Beni Mered',9025,9),(305,'Bougara',9026,9),(306,'Guerrouaou',9027,9),(307,'Ain Romana',9028,9),(308,'Djebabra',9029,9),(309,'Bouira',10001,10),(310,'El Asnam',10002,10),(311,'Guerrouma',10003,10),(312,'Souk El Khemis',10004,10),(313,'Kadiria',10005,10),(314,'Hanif',10006,10),(315,'Dirah',10007,10),(316,'Ait Laaziz',10008,10),(317,'Taghzout',10009,10),(318,'Raouraoua',10010,10),(319,'Mezdour',10011,10),(320,'Haizer',10012,10),(321,'Lakhdaria',10013,10),(322,'Maala',10014,10),(323,'El Hachimia',10015,10),(324,'Aomar',10016,10),(325,'Chorfa',10017,10),(326,'Bordj Oukhriss',10018,10),(327,'El Adjiba',10019,10),(328,'El Hakimia',10020,10),(329,'El Khebouzia',10021,10),(330,'Ahl El Ksar',10022,10),(331,'Bouderbala',10023,10),(332,'Zbarbar',10024,10),(333,'Ain El Hadjar',10025,10),(334,'Djebahia',10026,10),(335,'Aghbalou',10027,10),(336,'Taguedit',10028,10),(337,'Ain Turk',10029,10),(338,'Saharidj',10030,10),(339,'Dechmia',10031,10),(340,'Ridane',10032,10),(341,'Bechloul',10033,10),(342,'Boukram',10034,10),(343,'Ain Bessam',10035,10),(344,'Bir Ghbalou',10036,10),(345,'Mchedallah',10037,10),(346,'Sour El Ghozlane',10038,10),(347,'Maamora',10039,10),(348,'Ouled Rached',10040,10),(349,'Ain Laloui',10041,10),(350,'Hadjera Zerga',10042,10),(351,'Ath Mansour',10043,10),(352,'El Mokrani',10044,10),(353,'Oued El Berdi',10045,10),(354,'Tamanghasset',11001,11),(355,'Abalessa',11002,11),(356,'In Ghar',11003,11),(357,'In Guezzam',11004,11),(358,'Idles',11005,11),(359,'Tazouk',11006,11),(360,'Tinzaouatine',11007,11),(361,'In Salah',11008,11),(362,'In Amguel',11009,11),(363,'Foggaret Ezzaouia',11010,11),(364,'Tebessa',12001,12),(365,'Bir El Ater',12002,12),(366,'Cheria',12003,12),(367,'Stah Guentis',12004,12),(368,'El Aouinet',12005,12),(369,'Lahouidjbet',12006,12),(370,'Safsaf El Ouesra',12007,12),(371,'Hammamet',12008,12),(372,'Negrine',12009,12),(373,'Bir El Mokadem',12010,12),(374,'El Kouif',12011,12),(375,'Morsott',12012,12),(376,'El Ogla',12013,12),(377,'Bir Dheheb',12014,12),(378,'El Ogla El Malha',12015,12),(379,'Gorriguer',12016,12),(380,'Bekkaria',12017,12),(381,'Boukhadra',12018,12),(382,'Ouenza',12019,12),(383,'El Ma El Biodh',12020,12),(384,'Oum Ali',12021,12),(385,'Thlidjene',12022,12),(386,'Ain Zerga',12023,12),(387,'El Meridj',12024,12),(388,'Boulhaf Dyr',12025,12),(389,'Bedjene',12026,12),(390,'El Mazeraa',12027,12),(391,'Ferkane',12028,12),(392,'Tlemcen',13001,13),(393,'Beni Mester',13002,13),(394,'Ain Tallout',13003,13),(395,'Remchi',13004,13),(396,'El Fehoul',13005,13),(397,'Sabra',13006,13),(398,'Ghazaouet',13007,13),(399,'Souani',13008,13),(400,'Djebala',13009,13),(401,'El Gor',13010,13),(402,'Oued Chouly',13011,13),(403,'Ain Fezza',13012,13),(404,'Ouled Mimoun',13013,13),(405,'Amieur',13014,13),(406,'Ain Youcef',13015,13),(407,'Zenata',13016,13),(408,'Beni Snous',13017,13),(409,'Bab El Assa',13018,13),(410,'Dar Yaghmouracene',13019,13),(411,'Fellaoucene',13020,13),(412,'Azails',13021,13),(413,'Sebbaa Chioukh',13022,13),(414,'Terni Beni Hediel',13023,13),(415,'Bensekrane',13024,13),(416,'Ain Nehala',13025,13),(417,'Hennaya',13026,13),(418,'Maghnia',13027,13),(419,'Hammam Boughrara',13028,13),(420,'Souahlia',13029,13),(421,'Msirda Fouaga',13030,13),(422,'Ain Fetah',13031,13),(423,'El Aricha',13032,13),(424,'Souk Thlata',13033,13),(425,'Sidi Abdelli',13034,13),(426,'Sebdou',13035,13),(427,'Beni Ouarsous',13036,13),(428,'Sidi Medjahed',13037,13),(429,'Beni Boussaid',13038,13),(430,'Marsa Ben Mhidi',13039,13),(431,'Nedroma',13040,13),(432,'Sidi Djillali',13041,13),(433,'Beni Bahdel',13042,13),(434,'El Bouihi',13043,13),(435,'Honaine',13044,13),(436,'Tianet',13045,13),(437,'Ouled Riyah',13046,13),(438,'Bouhlou',13047,13),(439,'Souk El Khemis',13048,13),(440,'Ain Ghoraba',13049,13),(441,'Chetouane',13050,13),(442,'Mansourah',13051,13),(443,'Beni Semiel',13052,13),(444,'Ain Kebira',13053,13),(445,'Tiaret',14001,14),(446,'Medroussa',14002,14),(447,'Ain Bouchekif',14003,14),(448,'Sidi Ali Mellal',14004,14),(449,'Ain Zarit',14005,14),(450,'Ain Deheb',14006,14),(451,'Sidi Bakhti',14007,14),(452,'Medrissa',14008,14),(453,'Zmalet El Emir Aek',14009,14),(454,'Madna',14010,14),(455,'Sebt',14011,14),(456,'Mellakou',14012,14),(457,'Dahmouni',14013,14),(458,'Rahouia',14014,14),(459,'Mahdia',14015,14),(460,'Sougueur',14016,14),(461,'Sidi Abdelghani',14017,14),(462,'Ain El Hadid',14018,14),(463,'Ouled Djerad',14019,14),(464,'Naima',14020,14),(465,'Meghila',14021,14),(466,'Guertoufa',14022,14),(467,'Sidi Hosni',14023,14),(468,'Djillali Ben Amar',14024,14),(469,'Sebaine',14025,14),(470,'Tousnina',14026,14),(471,'Frenda',14027,14),(472,'Ain Kermes',14028,14),(473,'Ksar Chellala',14029,14),(474,'Rechaiga',14030,14),(475,'Nadorah',14031,14),(476,'Tagdemt',14032,14),(477,'Oued Lilli',14033,14),(478,'Mechraa Safa',14034,14),(479,'Hamadia',14035,14),(480,'Chehaima',14036,14),(481,'Takhemaret',14037,14),(482,'Sidi Abderrahmane',14038,14),(483,'Serghine',14039,14),(484,'Bougara',14040,14),(485,'Faidja',14041,14),(486,'Tidda',14042,14),(487,'Tizi Ouzou',15001,15),(488,'Ain El Hammam',15002,15),(489,'Akbil',15003,15),(490,'Freha',15004,15),(491,'Souamaa',15005,15),(492,'Mechtrass',15006,15),(493,'Irdjen',15007,15),(494,'Timizart',15008,15),(495,'Makouda',15009,15),(496,'Draa El Mizan',15010,15),(497,'Tizi Ghenif',15011,15),(498,'Bounouh',15012,15),(499,'Ait Chaffaa',15013,15),(500,'Frikat',15014,15),(501,'Beni Aissi',15015,15),(502,'Beni Zmenzer',15016,15),(503,'Iferhounene',15017,15),(504,'Azazga',15018,15),(505,'Iloula Oumalou',15019,15),(506,'Yakouren',15020,15),(507,'Larba Nait Irathen',15021,15),(508,'Tizi Rached',15022,15),(509,'Zekri',15023,15),(510,'Ouaguenoun',15024,15),(511,'Ain Zaouia',15025,15),(512,'Mkira',15026,15),(513,'Ait Yahia',15027,15),(514,'Ait Mahmoud',15028,15),(515,'Maatka',15029,15),(516,'Ait Boumehdi',15030,15),(517,'Abi Youcef',15031,15),(518,'Beni Douala',15032,15),(519,'Illilten',15033,15),(520,'Bouzguen',15034,15),(521,'Ait Aggouacha',15035,15),(522,'Ouadhia',15036,15),(523,'Azzefoun',15037,15),(524,'Tigzirt',15038,15),(525,'Ait Aissa Mimoun',15039,15),(526,'Boghni',15040,15),(527,'Ifigha',15041,15),(528,'Ait Oumalou',15042,15),(529,'Tirmitine',15043,15),(530,'Akerrou',15044,15),(531,'Yatafen',15045,15),(532,'Beni Ziki',15046,15),(533,'Draa Ben Khedda',15047,15),(534,'Ouacif',15048,15),(535,'Idjeur',15049,15),(536,'Mekla',15050,15),(537,'Tizi Nthlata',15051,15),(538,'Beni Yenni',15052,15),(539,'Aghrib',15053,15),(540,'Iflissen',15054,15),(541,'Boudjima',15055,15),(542,'Ait Yahia Moussa',15056,15),(543,'Souk El Thenine',15057,15),(544,'Ait Khelil',15058,15),(545,'Sidi Naamane',15059,15),(546,'Iboudraren',15060,15),(547,'Aghni Goughran',15061,15),(548,'Mizrana',15062,15),(549,'Imsouhal',15063,15),(550,'Tadmait',15064,15),(551,'Ait Bouadou',15065,15),(552,'Assi Youcef',15066,15),(553,'Ait Toudert',15067,15),(554,'Alger Centre',16001,16),(555,'Sidi Mhamed',16002,16),(556,'El Madania',16003,16),(557,'Hamma Anassers',16004,16),(558,'Bab El Oued',16005,16),(559,'Bologhine Ibn Ziri',16006,16),(560,'Casbah',16007,16),(561,'Oued Koriche',16008,16),(562,'Bir Mourad Rais',16009,16),(563,'El Biar',16010,16),(564,'Bouzareah',16011,16),(565,'Birkhadem',16012,16),(566,'El Harrach',16013,16),(567,'Baraki',16014,16),(568,'Oued Smar',16015,16),(569,'Bourouba',16016,16),(570,'Hussein Dey',16017,16),(571,'Kouba',16018,16),(572,'Bachedjerah',16019,16),(573,'Dar El Beida',16020,16),(574,'Bab Azzouar',16021,16),(575,'Ben Aknoun',16022,16),(576,'Dely Ibrahim',16023,16),(577,'Bains Romains',16024,16),(578,'Rais Hamidou',16025,16),(579,'Djasr Kasentina',16026,16),(580,'El Mouradia',16027,16),(581,'Hydra',16028,16),(582,'Mohammadia',16029,16),(583,'Bordj El Kiffan',16030,16),(584,'El Magharia',16031,16),(585,'Beni Messous',16032,16),(586,'Les Eucalyptus',16033,16),(587,'Birtouta',16034,16),(588,'Tassala El Merdja',16035,16),(589,'Ouled Chebel',16036,16),(590,'Sidi Moussa',16037,16),(591,'Ain Taya',16038,16),(592,'Bordj El Bahri',16039,16),(593,'Marsa',16040,16),(594,'Haraoua',16041,16),(595,'Rouiba',16042,16),(596,'Reghaia',16043,16),(597,'Ain Benian',16044,16),(598,'Staoueli',16045,16),(599,'Zeralda',16046,16),(600,'Mahelma',16047,16),(601,'Rahmania',16048,16),(602,'Souidania',16049,16),(603,'Cheraga',16050,16),(604,'Ouled Fayet',16051,16),(605,'El Achour',16052,16),(606,'Draria',16053,16),(607,'Douera',16054,16),(608,'Baba Hassen',16055,16),(609,'Khracia',16056,16),(610,'Saoula',16057,16),(611,'Djelfa',17001,17),(612,'Moudjebara',17002,17),(613,'El Guedid',17003,17),(614,'Hassi Bahbah',17004,17),(615,'Ain Maabed',17005,17),(616,'Sed Rahal',17006,17),(617,'Feidh El Botma',17007,17),(618,'Birine',17008,17),(619,'Bouira Lahdeb',17009,17),(620,'Zaccar',17010,17),(621,'El Khemis',17011,17),(622,'Sidi Baizid',17012,17),(623,'Mliliha',17013,17),(624,'El Idrissia',17014,17),(625,'Douis',17015,17),(626,'Hassi El Euch',17016,17),(627,'Messaad',17017,17),(628,'Guettara',17018,17),(629,'Sidi Ladjel',17019,17),(630,'Had Sahary',17020,17),(631,'Guernini',17021,17),(632,'Selmana',17022,17),(633,'Ain Chouhada',17023,17),(634,'Oum Laadham',17024,17),(635,'Dar Chouikh',17025,17),(636,'Charef',17026,17),(637,'Beni Yacoub',17027,17),(638,'Zaafrane',17028,17),(639,'Deldoul',17029,17),(640,'Ain El Ibel',17030,17),(641,'Ain Oussera',17031,17),(642,'Benhar',17032,17),(643,'Hassi Fedoul',17033,17),(644,'Amourah',17034,17),(645,'Ain Fekka',17035,17),(646,'Tadmit',17036,17),(647,'Jijel',18001,18),(648,'Erraguene',18002,18),(649,'El Aouana',18003,18),(650,'Ziamma Mansouriah',18004,18),(651,'Taher',18005,18),(652,'Emir Abdelkader',18006,18),(653,'Chekfa',18007,18),(654,'Chahna',18008,18),(655,'El Milia',18009,18),(656,'Sidi Maarouf',18010,18),(657,'Settara',18011,18),(658,'El Ancer',18012,18),(659,'Sidi Abdelaziz',18013,18),(660,'Kaous',18014,18),(661,'Ghebala',18015,18),(662,'Bouraoui Belhadef',18016,18),(663,'Djmila',18017,18),(664,'Selma Benziada',18018,18),(665,'Boussif Ouled Askeur',18019,18),(666,'El Kennar Nouchfi',18020,18),(667,'Ouled Yahia Khadrouch',18021,18),(668,'Boudria Beni Yadjis',18022,18),(669,'Kemir Oued Adjoul',18023,18),(670,'Texena',18024,18),(671,'Djemaa Beni Habibi',18025,18),(672,'Bordj Taher',18026,18),(673,'Ouled Rabah',18027,18),(674,'Ouadjana',18028,18),(675,'Setif',19001,19),(676,'Ain El Kebira',19002,19),(677,'Beni Aziz',19003,19),(678,'Ouled Sidi Ahmed',19004,19),(679,'Boutaleb',19005,19),(680,'Ain Roua',19006,19),(681,'Draa Kebila',19007,19),(682,'Bir El Arch',19008,19),(683,'Beni Chebana',19009,19),(684,'Ouled Tebben',19010,19),(685,'Hamma',19011,19),(686,'Maaouia',19012,19),(687,'Ain Legraj',19013,19),(688,'Ain Abessa',19014,19),(689,'Dehamcha',19015,19),(690,'Babor',19016,19),(691,'Guidjel',19017,19),(692,'Ain Lahdjar',19018,19),(693,'Bousselam',19019,19),(694,'El Eulma',19020,19),(695,'Djemila',19021,19),(696,'Beni Ouartilane',19022,19),(697,'Rosfa',19023,19),(698,'Ouled Addouane',19024,19),(699,'Belaa',19025,19),(700,'Ain Arnat',19026,19),(701,'Amoucha',19027,19),(702,'Ain Oulmane',19028,19),(703,'Beidha Bordj',19029,19),(704,'Bouandas',19030,19),(705,'Bazer Sakhra',19031,19),(706,'Hammam Essokhna',19032,19),(707,'Mezloug',19033,19),(708,'Bir Haddada',19034,19),(709,'Serdj El Ghoul',19035,19),(710,'Harbil',19036,19),(711,'El Ouricia',19037,19),(712,'Tizi Nbechar',19038,19),(713,'Salah Bey',19039,19),(714,'Ain Azal',19040,19),(715,'Guenzet',19041,19),(716,'Talaifacene',19042,19),(717,'Bougaa',19043,19),(718,'Beni Fouda',19044,19),(719,'Tachouda',19045,19),(720,'Beni Mouhli',19046,19),(721,'Ouled Sabor',19047,19),(722,'Guellal',19048,19),(723,'Ain Sebt',19049,19),(724,'Hammam Guergour',19050,19),(725,'Ait Naoual Mezada',19051,19),(726,'Ksar El Abtal',19052,19),(727,'Beni Hocine',19053,19),(728,'Ait Tizi',19054,19),(729,'Maouklane',19055,19),(730,'Guelta Zerka',19056,19),(731,'Oued El Barad',19057,19),(732,'Taya',19058,19),(733,'El Ouldja',19059,19),(734,'Tella',19060,19),(735,'Saida',20001,20),(736,'Doui Thabet',20002,20),(737,'Ain El Hadjar',20003,20),(738,'Ouled Khaled',20004,20),(739,'Moulay Larbi',20005,20),(740,'Youb',20006,20),(741,'Hounet',20007,20),(742,'Sidi Amar',20008,20),(743,'Sidi Boubekeur',20009,20),(744,'El Hassasna',20010,20),(745,'Maamora',20011,20),(746,'Sidi Ahmed',20012,20),(747,'Ain Sekhouna',20013,20),(748,'Ouled Brahim',20014,20),(749,'Tircine',20015,20),(750,'Ain Soltane',20016,20),(751,'Skikda',21001,21),(752,'Ain Zouit',21002,21),(753,'El Hadaik',21003,21),(754,'Azzaba',21004,21),(755,'Djendel Saadi Mohamed',21005,21),(756,'Ain Cherchar',21006,21),(757,'Bekkouche Lakhdar',21007,21),(758,'Benazouz',21008,21),(759,'Es Sebt',21009,21),(760,'Collo',21010,21),(761,'Beni Zid',21011,21),(762,'Kerkera',21012,21),(763,'Ouled Attia',21013,21),(764,'Oued Zehour',21014,21),(765,'Zitouna',21015,21),(766,'El Harrouch',21016,21),(767,'Zerdazas',21017,21),(768,'Ouled Hebaba',21018,21),(769,'Sidi Mezghiche',21019,21),(770,'Emdjez Edchich',21020,21),(771,'Beni Oulbane',21021,21),(772,'Ain Bouziane',21022,21),(773,'Ramdane Djamel',21023,21),(774,'Beni Bachir',21024,21),(775,'Salah Bouchaour',21025,21),(776,'Tamalous',21026,21),(777,'Ain Kechra',21027,21),(778,'Oum Toub',21028,21),(779,'Bein El Ouiden',21029,21),(780,'Fil Fila',21030,21),(781,'Cheraia',21031,21),(782,'Kanoua',21032,21),(783,'El Ghedir',21033,21),(784,'Bouchtata',21034,21),(785,'Ouldja Boulbalout',21035,21),(786,'Kheneg Mayoum',21036,21),(787,'Hamadi Krouma',21037,21),(788,'El Marsa',21038,21),(789,'Sidi Bel Abbes',22001,22),(790,'Tessala',22002,22),(791,'Sidi Brahim',22003,22),(792,'Mostefa Ben Brahim',22004,22),(793,'Telagh',22005,22),(794,'Mezaourou',22006,22),(795,'Boukhanafis',22007,22),(796,'Sidi Ali Boussidi',22008,22),(797,'Badredine El Mokrani',22009,22),(798,'Marhoum',22010,22),(799,'Tafissour',22011,22),(800,'Amarnas',22012,22),(801,'Tilmouni',22013,22),(802,'Sidi Lahcene',22014,22),(803,'Ain Thrid',22015,22),(804,'Makedra',22016,22),(805,'Tenira',22017,22),(806,'Moulay Slissen',22018,22),(807,'El Hacaiba',22019,22),(808,'Hassi Zehana',22020,22),(809,'Tabia',22021,22),(810,'Merine',22022,22),(811,'Ras El Ma',22023,22),(812,'Ain Tindamine',22024,22),(813,'Ain Kada',22025,22),(814,'Mcid',22026,22),(815,'Sidi Khaled',22027,22),(816,'Ain El Berd',22028,22),(817,'Sfissef',22029,22),(818,'Ain Adden',22030,22),(819,'Oued Taourira',22031,22),(820,'Dhaya',22032,22),(821,'Zerouala',22033,22),(822,'Lamtar',22034,22),(823,'Sidi Chaib',22035,22),(824,'Sidi Dahou Dezairs',22036,22),(825,'Oued Sbaa',22037,22),(826,'Boudjebaa El Bordj',22038,22),(827,'Sehala Thaoura',22039,22),(828,'Sidi Yacoub',22040,22),(829,'Sidi Hamadouche',22041,22),(830,'Belarbi',22042,22),(831,'Oued Sefioun',22043,22),(832,'Teghalimet',22044,22),(833,'Ben Badis',22045,22),(834,'Sidi Ali Benyoub',22046,22),(835,'Chetouane Belaila',22047,22),(836,'Bir El Hammam',22048,22),(837,'Taoudmout',22049,22),(838,'Redjem Demouche',22050,22),(839,'Benachiba Chelia',22051,22),(840,'Hassi Dahou',22052,22),(841,'Annaba',23001,23),(842,'Berrahel',23002,23),(843,'El Hadjar',23003,23),(844,'Eulma',23004,23),(845,'El Bouni',23005,23),(846,'Oued El Aneb',23006,23),(847,'Cheurfa',23007,23),(848,'Seraidi',23008,23),(849,'Ain Berda',23009,23),(850,'Chetaibi',23010,23),(851,'Sidi Amer',23011,23),(852,'Treat',23012,23),(853,'Guelma',24001,24),(854,'Nechmaya',24002,24),(855,'Bouati Mahmoud',24003,24),(856,'Oued Zenati',24004,24),(857,'Tamlouka',24005,24),(858,'Oued Fragha',24006,24),(859,'Ain Sandel',24007,24),(860,'Ras El Agba',24008,24),(861,'Dahouara',24009,24),(862,'Belkhir',24010,24),(863,'Ben Djarah',24011,24),(864,'Bou Hamdane',24012,24),(865,'Ain Makhlouf',24013,24),(866,'Ain Ben Beida',24014,24),(867,'Khezara',24015,24),(868,'Beni Mezline',24016,24),(869,'Bou Hachana',24017,24),(870,'Guelaat Bou Sbaa',24018,24),(871,'Hammam Maskhoutine',24019,24),(872,'El Fedjoudj',24020,24),(873,'Bordj Sabat',24021,24),(874,'Hamman Nbail',24022,24),(875,'Ain Larbi',24023,24),(876,'Medjez Amar',24024,24),(877,'Bouchegouf',24025,24),(878,'Heliopolis',24026,24),(879,'Ain Hessania',24027,24),(880,'Roknia',24028,24),(881,'Salaoua Announa',24029,24),(882,'Medjez Sfa',24030,24),(883,'Boumahra Ahmed',24031,24),(884,'Ain Reggada',24032,24),(885,'Oued Cheham',24033,24),(886,'Djeballah Khemissi',24034,24),(887,'Constantine',25001,25),(888,'Hamma Bouziane',25002,25),(889,'El Haria',25003,25),(890,'Zighoud Youcef',25004,25),(891,'Didouche Mourad',25005,25),(892,'El Khroub',25006,25),(893,'Ain Abid',25007,25),(894,'Beni Hamiden',25008,25),(895,'Ouled Rahmoune',25009,25),(896,'Ain Smara',25010,25),(897,'Mesaoud Boudjeriou',25011,25),(898,'Ibn Ziad',25012,25),(899,'Medea',26001,26),(900,'Ouzera',26002,26),(901,'Ouled Maaref',26003,26),(902,'Ain Boucif',26004,26),(903,'Aissaouia',26005,26),(904,'Ouled Deide',26006,26),(905,'El Omaria',26007,26),(906,'Derrag',26008,26),(907,'El Guelbelkebir',26009,26),(908,'Bouaiche',26010,26),(909,'Mezerena',26011,26),(910,'Ouled Brahim',26012,26),(911,'Damiat',26013,26),(912,'Sidi Ziane',26014,26),(913,'Tamesguida',26015,26),(914,'El Hamdania',26016,26),(915,'Kef Lakhdar',26017,26),(916,'Chelalet El Adhaoura',26018,26),(917,'Bouskene',26019,26),(918,'Rebaia',26020,26),(919,'Bouchrahil',26021,26),(920,'Ouled Hellal',26022,26),(921,'Tafraout',26023,26),(922,'Baata',26024,26),(923,'Boghar',26025,26),(924,'Sidi Naamane',26026,26),(925,'Ouled Bouachra',26027,26),(926,'Sidi Zahar',26028,26),(927,'Oued Harbil',26029,26),(928,'Benchicao',26030,26),(929,'Sidi Damed',26031,26),(930,'Aziz',26032,26),(931,'Souagui',26033,26),(932,'Zoubiria',26034,26),(933,'Ksar El Boukhari',26035,26),(934,'El Azizia',26036,26),(935,'Djouab',26037,26),(936,'Chahbounia',26038,26),(937,'Meghraoua',26039,26),(938,'Cheniguel',26040,26),(939,'Ain Ouksir',26041,26),(940,'Oum El Djalil',26042,26),(941,'Ouamri',26043,26),(942,'Si Mahdjoub',26044,26),(943,'Tlatet Eddoair',26045,26),(944,'Beni Slimane',26046,26),(945,'Berrouaghia',26047,26),(946,'Seghouane',26048,26),(947,'Meftaha',26049,26),(948,'Mihoub',26050,26),(949,'Boughezoul',26051,26),(950,'Tablat',26052,26),(951,'Deux Bassins',26053,26),(952,'Draa Essamar',26054,26),(953,'Sidi Errabia',26055,26),(954,'Bir Ben Laabed',26056,26),(955,'El Ouinet',26057,26),(956,'Ouled Antar',26058,26),(957,'Bouaichoune',26059,26),(958,'Hannacha',26060,26),(959,'Sedraia',26061,26),(960,'Medjebar',26062,26),(961,'Khams Djouamaa',26063,26),(962,'Saneg',26064,26),(963,'Mostaganem',27001,27),(964,'Sayada',27002,27),(965,'Fornaka',27003,27),(966,'Stidia',27004,27),(967,'Ain Nouissy',27005,27),(968,'Hassi Maameche',27006,27),(969,'Ain Tadles',27007,27),(970,'Sour',27008,27),(971,'Oued El Kheir',27009,27),(972,'Sidi Bellater',27010,27),(973,'Kheiredine ',27011,27),(974,'Sidi Ali',27012,27),(975,'Abdelmalek Ramdane',27013,27),(976,'Hadjadj',27014,27),(977,'Nekmaria',27015,27),(978,'Sidi Lakhdar',27016,27),(979,'Achaacha',27017,27),(980,'Khadra',27018,27),(981,'Bouguirat',27019,27),(982,'Sirat',27020,27),(983,'Ain Sidi Cherif',27021,27),(984,'Mesra',27022,27),(985,'Mansourah',27023,27),(986,'Souaflia',27024,27),(987,'Ouled Boughalem',27025,27),(988,'Ouled Maallah',27026,27),(989,'Mezghrane',27027,27),(990,'Ain Boudinar',27028,27),(991,'Tazgait',27029,27),(992,'Safsaf',27030,27),(993,'Touahria',27031,27),(994,'El Hassiane',27032,27),(995,'Msila',28001,28),(996,'Maadid',28002,28),(997,'Hammam Dhalaa',28003,28),(998,'Ouled Derradj',28004,28),(999,'Tarmount',28005,28),(1000,'Mtarfa',28006,28),(1001,'Khoubana',28007,28),(1002,'Mcif',28008,28),(1003,'Chellal',28009,28),(1004,'Ouled Madhi',28010,28),(1005,'Magra',28011,28),(1006,'Berhoum',28012,28),(1007,'Ain Khadra',28013,28),(1008,'Ouled Addi Guebala',28014,28),(1009,'Belaiba',28015,28),(1010,'Sidi Aissa',28016,28),(1011,'Ain El Hadjel',28017,28),(1012,'Sidi Hadjeres',28018,28),(1013,'Ouanougha',28019,28),(1014,'Bou Saada',28020,28),(1015,'Ouled Sidi Brahim',28021,28),(1016,'Sidi Ameur',28022,28),(1017,'Tamsa',28023,28),(1018,'Ben Srour',28024,28),(1019,'Ouled Slimane',28025,28),(1020,'El Houamed',28026,28),(1021,'El Hamel',28027,28),(1022,'Ouled Mansour',28028,28),(1023,'Maarif',28029,28),(1024,'Dehahna',28030,28),(1025,'Bouti Sayah',28031,28),(1026,'Khettouti Sed Djir',28032,28),(1027,'Zarzour',28033,28),(1028,'Oued Chair',28034,28),(1029,'Benzouh',28035,28),(1030,'Bir Foda',28036,28),(1031,'Ain Fares',28037,28),(1032,'Sidi Mhamed',28038,28),(1033,'Ouled Atia',28039,28),(1034,'Souamaa',28040,28),(1035,'Ain El Melh',28041,28),(1036,'Medjedel',28042,28),(1037,'Slim',28043,28),(1038,'Ain Errich',28044,28),(1039,'Beni Ilmane',28045,28),(1040,'Oultene',28046,28),(1041,'Djebel Messaad',28047,28),(1042,'Mascara',29001,29),(1043,'Bou Hanifia',29002,29),(1044,'Tizi',29003,29),(1045,'Hacine',29004,29),(1046,'Maoussa',29005,29),(1047,'Teghennif',29006,29),(1048,'El Hachem',29007,29),(1049,'Sidi Kada',29008,29),(1050,'Zelmata',29009,29),(1051,'Oued El Abtal',29010,29),(1052,'Ain Ferah',29011,29),(1053,'Ghriss',29012,29),(1054,'Froha',29013,29),(1055,'Matemore',29014,29),(1056,'Makdha',29015,29),(1057,'Sidi Boussaid',29016,29),(1058,'El Bordj',29017,29),(1059,'Ain Fekan',29018,29),(1060,'Benian',29019,29),(1061,'Khalouia',29020,29),(1062,'El Menaouer',29021,29),(1063,'Oued Taria',29022,29),(1064,'Aouf',29023,29),(1065,'Ain Fares',29024,29),(1066,'Ain Frass',29025,29),(1067,'Sig',29026,29),(1068,'Oggaz',29027,29),(1069,'Alaimia',29028,29),(1070,'El Gaada',29029,29),(1071,'Zahana',29030,29),(1072,'Mohammadia',29031,29),(1073,'Sidi Abdelmoumene',29032,29),(1074,'Ferraguig',29033,29),(1075,'El Ghomri',29034,29),(1076,'Sedjerara',29035,29),(1077,'Moctadouz',29036,29),(1078,'Bou Henni',29037,29),(1079,'Guettena',29038,29),(1080,'El Mamounia',29039,29),(1081,'El Keurt',29040,29),(1082,'Gharrous',29041,29),(1083,'Gherdjoum',29042,29),(1084,'Chorfa',29043,29),(1085,'Ras Ain Amirouche',29044,29),(1086,'Nesmot',29045,29),(1087,'Sidi Abdeldjebar',29046,29),(1088,'Sehailia',29047,29),(1089,'Ouargla',30001,30),(1090,'Ain Beida',30002,30),(1091,'Ngoussa',30003,30),(1092,'Hassi Messaoud',30004,30),(1093,'Rouissat',30005,30),(1094,'Balidat Ameur',30006,30),(1095,'Tebesbest',30007,30),(1096,'Nezla',30008,30),(1097,'Zaouia El Abidia',30009,30),(1098,'Sidi Slimane',30010,30),(1099,'Sidi Khouiled',30011,30),(1100,'Hassi Ben Abdellah',30012,30),(1101,'Touggourt',30013,30),(1102,'El Hadjira',30014,30),(1103,'Taibet',30015,30),(1104,'Tamacine',30016,30),(1105,'Benaceur',30017,30),(1106,'Mnaguer',30018,30),(1107,'Megarine',30019,30),(1108,'El Allia',30020,30),(1109,'El Borma',30021,30),(1110,'Oran',31001,31),(1111,'Gdyel',31002,31),(1112,'Bir El Djir',31003,31),(1113,'Hassi Bounif',31004,31),(1114,'Es Senia',31005,31),(1115,'Arzew',31006,31),(1116,'Bethioua',31007,31),(1117,'Marsat El Hadjadj',31008,31),(1118,'Ain Turk',31009,31),(1119,'El Ancar',31010,31),(1120,'Oued Tlelat',31011,31),(1121,'Tafraoui',31012,31),(1122,'Sidi Chami',31013,31),(1123,'Boufatis',31014,31),(1124,'Mers El Kebir',31015,31),(1125,'Bousfer',31016,31),(1126,'El Karma',31017,31),(1127,'El Braya',31018,31),(1128,'Hassi Ben Okba',31019,31),(1129,'Ben Freha',31020,31),(1130,'Hassi Mefsoukh',31021,31),(1131,'Sidi Ben Yabka',31022,31),(1132,'Messerghin',31023,31),(1133,'Boutlelis',31024,31),(1134,'Ain Kerma',31025,31),(1135,'Ain Biya',31026,31),(1136,'El Bayadh',32001,32),(1137,'Rogassa',32002,32),(1138,'Stitten',32003,32),(1139,'Brezina',32004,32),(1140,'Ghassoul',32005,32),(1141,'Boualem',32006,32),(1142,'El Abiodh Sidi Cheikh',32007,32),(1143,'Ain El Orak',32008,32),(1144,'Arbaouat',32009,32),(1145,'Bougtoub',32010,32),(1146,'El Kheither',32011,32),(1147,'Kef El Ahmar',32012,32),(1148,'Boussemghoun',32013,32),(1149,'Chellala',32014,32),(1150,'Krakda',32015,32),(1151,'El Bnoud',32016,32),(1152,'Cheguig',32017,32),(1153,'Sidi Ameur',32018,32),(1154,'El Mehara',32019,32),(1155,'Tousmouline',32020,32),(1156,'Sidi Slimane',32021,32),(1157,'Sidi Tifour',32022,32),(1158,'Illizi',33001,33),(1159,'Djanet',33002,33),(1160,'Debdeb',33003,33),(1161,'Bordj Omar Driss',33004,33),(1162,'Bordj El Haouasse',33005,33),(1163,'In Amenas',33006,33),(1164,'Bordj Bou Arreridj',34001,34),(1165,'Ras El Oued',34002,34),(1166,'Bordj Zemoura',34003,34),(1167,'Mansoura',34004,34),(1168,'El Mhir',34005,34),(1169,'Ben Daoud',34006,34),(1170,'El Achir',34007,34),(1171,'Ain Taghrout',34008,34),(1172,'Bordj Ghdir',34009,34),(1173,'Sidi Embarek',34010,34),(1174,'El Hamadia',34011,34),(1175,'Belimour',34012,34),(1176,'Medjana',34013,34),(1177,'Teniet En Nasr',34014,34),(1178,'Djaafra',34015,34),(1179,'El Main',34016,34),(1180,'Ouled Brahem',34017,34),(1181,'Ouled Dahmane',34018,34),(1182,'Hasnaoua',34019,34),(1183,'Khelil',34020,34),(1184,'Taglait',34021,34),(1185,'Ksour',34022,34),(1186,'Ouled Sidi Brahim',34023,34),(1187,'Tafreg',34024,34),(1188,'Colla',34025,34),(1189,'Tixter',34026,34),(1190,'El Ach',34027,34),(1191,'El Anseur',34028,34),(1192,'Tesmart',34029,34),(1193,'Ain Tesra',34030,34),(1194,'Bir Kasdali',34031,34),(1195,'Ghilassa',34032,34),(1196,'Rabta',34033,34),(1197,'Haraza',34034,34),(1198,'Boumerdes',35001,35),(1199,'Boudouaou',35002,35),(1200,'Afir',35004,35),(1201,'Bordj Menaiel',35005,35),(1202,'Baghlia',35006,35),(1203,'Sidi Daoud',35007,35),(1204,'Naciria',35008,35),(1205,'Djinet',35009,35),(1206,'Isser',35010,35),(1207,'Zemmouri',35011,35),(1208,'Si Mustapha',35012,35),(1209,'Tidjelabine',35013,35),(1210,'Chabet El Ameur',35014,35),(1211,'Thenia',35015,35),(1212,'Timezrit',35018,35),(1213,'Corso',35019,35),(1214,'Ouled Moussa',35020,35),(1215,'Larbatache',35021,35),(1216,'Bouzegza Keddara',35022,35),(1217,'Taourga',35025,35),(1218,'Ouled Aissa',35026,35),(1219,'Ben Choud',35027,35),(1220,'Dellys',35028,35),(1221,'Ammal',35029,35),(1222,'Beni Amrane',35030,35),(1223,'Souk El Had',35031,35),(1224,'Boudouaou El Bahri',35032,35),(1225,'Ouled Hedadj',35033,35),(1226,'Laghata',35035,35),(1227,'Hammedi',35036,35),(1228,'Khemis El Khechna',35037,35),(1229,'El Kharrouba',35038,35),(1230,'El Tarf',36001,36),(1231,'Bouhadjar',36002,36),(1232,'Ben Mhidi',36003,36),(1233,'Bougous',36004,36),(1234,'El Kala',36005,36),(1235,'Ain El Assel',36006,36),(1236,'El Aioun',36007,36),(1237,'Bouteldja',36008,36),(1238,'Souarekh',36009,36),(1239,'Berrihane',36010,36),(1240,'Lac Des Oiseaux',36011,36),(1241,'Chefia',36012,36),(1242,'Drean',36013,36),(1243,'Chihani',36014,36),(1244,'Chebaita Mokhtar',36015,36),(1245,'Besbes',36016,36),(1246,'Asfour',36017,36),(1247,'Echatt',36018,36),(1248,'Zerizer',36019,36),(1249,'Zitouna',36020,36),(1250,'Ain Kerma',36021,36),(1251,'Oued Zitoun',36022,36),(1252,'Hammam Beni Salah',36023,36),(1253,'Raml Souk',36024,36),(1254,'Tindouf',37001,37),(1255,'Oum El Assel',37002,37),(1256,'Tissemsilt',38001,38),(1257,'Bordj Bou Naama',38002,38),(1258,'Theniet El Had',38003,38),(1259,'Lazharia',38004,38),(1260,'Beni Chaib',38005,38),(1261,'Lardjem',38006,38),(1262,'Melaab',38007,38),(1263,'Sidi Lantri',38008,38),(1264,'Bordj El Emir Abdelkader',38009,38),(1265,'Layoune',38010,38),(1266,'Khemisti',38011,38),(1267,'Ouled Bessem',38012,38),(1268,'Ammari',38013,38),(1269,'Youssoufia',38014,38),(1270,'Sidi Boutouchent',38015,38),(1271,'Larbaa',38016,38),(1272,'Maasem',38017,38),(1273,'Sidi Abed',38018,38),(1274,'Tamalaht',38019,38),(1275,'Sidi Slimane',38020,38),(1276,'Boucaid',38021,38),(1277,'Beni Lahcene',38022,38),(1278,'El Oued',39001,39),(1279,'Robbah',39002,39),(1280,'Oued El Alenda',39003,39),(1281,'Bayadha',39004,39),(1282,'Nakhla',39005,39),(1283,'Guemar',39006,39),(1284,'Kouinine',39007,39),(1285,'Reguiba',39008,39),(1286,'Hamraia',39009,39),(1287,'Taghzout',39010,39),(1288,'Debila',39011,39),(1289,'Hassani Abdelkrim',39012,39),(1290,'Hassi Khelifa',39013,39),(1291,'Taleb Larbi',39014,39),(1292,'Douar El Ma',39015,39),(1293,'Sidi Aoun',39016,39),(1294,'Trifaoui',39017,39),(1295,'Magrane',39018,39),(1296,'Beni Guecha',39019,39),(1297,'Ourmas',39020,39),(1298,'Still',39021,39),(1299,'Mrara',39022,39),(1300,'Sidi Khellil',39023,39),(1301,'Tendla',39024,39),(1302,'El Ogla',39025,39),(1303,'Mih Ouansa',39026,39),(1304,'El Mghair',39027,39),(1305,'Djamaa',39028,39),(1306,'Oum Touyour',39029,39),(1307,'Sidi Amrane',39030,39),(1308,'Khenchela',40001,40),(1309,'Mtoussa',40002,40),(1310,'Kais',40003,40),(1311,'Baghai',40004,40),(1312,'El Hamma',40005,40),(1313,'Ain Touila',40006,40),(1314,'Taouzianat',40007,40),(1315,'Bouhmama',40008,40),(1316,'El Oueldja',40009,40),(1317,'Remila',40010,40),(1318,'Cherchar',40011,40),(1319,'Djellal',40012,40),(1320,'Babar',40013,40),(1321,'Tamza',40014,40),(1322,'Ensigha',40015,40),(1323,'Ouled Rechache',40016,40),(1324,'El Mahmal',40017,40),(1325,'Msara',40018,40),(1326,'Yabous',40019,40),(1327,'Khirane',40020,40),(1328,'Chelia',40021,40),(1329,'Souk Ahras',41001,41),(1330,'Sedrata',41002,41),(1331,'Hanancha',41003,41),(1332,'Mechroha',41004,41),(1333,'Ouled Driss',41005,41),(1334,'Tiffech',41006,41),(1335,'Zaarouria',41007,41),(1336,'Taoura',41008,41),(1337,'Drea',41009,41),(1338,'Haddada',41010,41),(1339,'Khedara',41011,41),(1340,'Merahna',41012,41),(1341,'Ouled Moumen',41013,41),(1342,'Bir Bouhouche',41014,41),(1343,'Mdaourouche',41015,41),(1344,'Oum El Adhaim',41016,41),(1345,'Ain Zana',41017,41),(1346,'Ain Soltane',41018,41),(1347,'Quillen',41019,41),(1348,'Sidi Fredj',41020,41),(1349,'Safel El Ouiden',41021,41),(1350,'Ragouba',41022,41),(1351,'Khemissa',41023,41),(1352,'Oued Keberit',41024,41),(1353,'Terraguelt',41025,41),(1354,'Zouabi',41026,41),(1355,'Tipaza',42001,42),(1356,'Menaceur',42002,42),(1357,'Larhat',42003,42),(1358,'Douaouda',42004,42),(1359,'Bourkika',42005,42),(1360,'Khemisti',42006,42),(1361,'Aghabal',42010,42),(1362,'Hadjout',42012,42),(1363,'Sidi Amar',42013,42),(1364,'Gouraya',42014,42),(1365,'Nodor',42015,42),(1366,'Chaiba',42016,42),(1367,'Ain Tagourait',42017,42),(1368,'Cherchel',42022,42),(1369,'Damous',42023,42),(1370,'Meurad',42024,42),(1371,'Fouka',42025,42),(1372,'Bou Ismail',42026,42),(1373,'Ahmer El Ain',42027,42),(1374,'Bou Haroun',42030,42),(1375,'Sidi Ghiles',42032,42),(1376,'Messelmoun',42033,42),(1377,'Sidi Rached',42034,42),(1378,'Kolea',42035,42),(1379,'Attatba',42036,42),(1380,'Sidi Semiane',42040,42),(1381,'Beni Milleuk',42041,42),(1382,'Hadjerat Ennous',42042,42),(1383,'Mila',43001,43),(1384,'Ferdjioua',43002,43),(1385,'Chelghoum Laid',43003,43),(1386,'Oued Athmenia',43004,43),(1387,'Ain Mellouk',43005,43),(1388,'Telerghma',43006,43),(1389,'Oued Seguen',43007,43),(1390,'Tadjenanet',43008,43),(1391,'Benyahia Abderrahmane',43009,43),(1392,'Oued Endja',43010,43),(1393,'Ahmed Rachedi',43011,43),(1394,'Ouled Khalouf',43012,43),(1395,'Tiberguent',43013,43),(1396,'Bouhatem',43014,43),(1397,'Rouached',43015,43),(1398,'Tessala Lamatai',43016,43),(1399,'Grarem Gouga',43017,43),(1400,'Sidi Merouane',43018,43),(1401,'Tassadane Haddada',43019,43),(1402,'Derradji Bousselah',43020,43),(1403,'Minar Zarza',43021,43),(1404,'Amira Arras',43022,43),(1405,'Terrai Bainen',43023,43),(1406,'Hamala',43024,43),(1407,'Ain Tine',43025,43),(1408,'El Mechira',43026,43),(1409,'Sidi Khelifa',43027,43),(1410,'Zeghaia',43028,43),(1411,'Elayadi Barbes',43029,43),(1412,'Ain Beida Harriche',43030,43),(1413,'Yahia Beniguecha',43031,43),(1414,'Chigara',43032,43),(1415,'Ain Defla',44001,44),(1416,'Miliana',44002,44),(1417,'Boumedfaa',44003,44),(1418,'Khemis Miliana',44004,44),(1419,'Hammam Righa',44005,44),(1420,'Arib',44006,44),(1421,'Djelida',44007,44),(1422,'El Amra',44008,44),(1423,'Bourached',44009,44),(1424,'El Attaf',44010,44),(1425,'El Abadia',44011,44),(1426,'Djendel',44012,44),(1427,'Oued Chorfa',44013,44),(1428,'Ain Lechiakh',44014,44),(1429,'Oued Djemaa',44015,44),(1430,'Rouina',44016,44),(1431,'Zeddine',44017,44),(1432,'El Hassania',44018,44),(1433,'Bir Ouled Khelifa',44019,44),(1434,'Ain Soltane',44020,44),(1435,'Tarik Ibn Ziad',44021,44),(1436,'Bordj Emir Khaled',44022,44),(1437,'Ain Torki',44023,44),(1438,'Sidi Lakhdar',44024,44),(1439,'Ben Allal',44025,44),(1440,'Ain Benian',44026,44),(1441,'Hoceinia',44027,44),(1442,'Barbouche',44028,44),(1443,'Djemaa Ouled Chikh',44029,44),(1444,'Mekhatria',44030,44),(1445,'Bathia',44031,44),(1446,'Tachta Zegagha',44032,44),(1447,'Ain Bouyahia',44033,44),(1448,'El Maine',44034,44),(1449,'Tiberkanine',44035,44),(1450,'Belaas',44036,44),(1451,'Naama',45001,45),(1452,'Mechria',45002,45),(1453,'Ain Sefra',45003,45),(1454,'Tiout',45004,45),(1455,'Sfissifa',45005,45),(1456,'Moghrar',45006,45),(1457,'Assela',45007,45),(1458,'Djeniane Bourzeg',45008,45),(1459,'Ain Ben Khelil',45009,45),(1460,'Makman Ben Amer',45010,45),(1461,'Kasdir',45011,45),(1462,'El Biod',45012,45),(1463,'Ain Temouchent',46001,46),(1464,'Chaabet El Ham',46002,46),(1465,'Ain Kihal',46003,46),(1466,'Hammam Bouhadjar',46004,46),(1467,'Bou Zedjar',46005,46),(1468,'Oued Berkeche',46006,46),(1469,'Aghlal',46007,46),(1470,'Terga',46008,46),(1471,'Ain El Arbaa',46009,46),(1472,'Tamzoura',46010,46),(1473,'Chentouf',46011,46),(1474,'Sidi Ben Adda',46012,46),(1475,'Aoubellil',46013,46),(1476,'El Malah',46014,46),(1477,'Sidi Boumediene',46015,46),(1478,'Oued Sabah',46016,46),(1479,'Ouled Boudjemaa',46017,46),(1480,'Ain Tolba',46018,46),(1481,'El Amria',46019,46),(1482,'Hassi El Ghella',46020,46),(1483,'Hassasna',46021,46),(1484,'Ouled Kihal',46022,46),(1485,'Beni Saf',46023,46),(1486,'Sidi Safi',46024,46),(1487,'Oulhaca El Gheraba',46025,46),(1488,'Tadmaya',46026,46),(1489,'El Emir Abdelkader',46027,46),(1490,'El Messaid',46028,46),(1491,'Ghardaia',47001,47),(1492,'El Meniaa',47002,47),(1493,'Dhayet Bendhahoua',47003,47),(1494,'Berriane',47004,47),(1495,'Metlili',47005,47),(1496,'El Guerrara',47006,47),(1497,'El Atteuf',47007,47),(1498,'Zelfana',47008,47),(1499,'Sebseb',47009,47),(1500,'Bounoura',47010,47),(1501,'Hassi Fehal',47011,47),(1502,'Hassi Gara',47012,47),(1503,'Mansoura',47013,47),(1504,'Relizane',48001,48),(1505,'Oued Rhiou',48002,48),(1506,'Belaassel Bouzegza',48003,48),(1507,'Sidi Saada',48004,48),(1508,'Ouled Aiche',48005,48),(1509,'Sidi Lazreg',48006,48),(1510,'El Hamadna',48007,48),(1511,'Sidi Mhamed Ben Ali',48008,48),(1512,'Mediouna',48009,48),(1513,'Sidi Khettab',48010,48),(1514,'Ammi Moussa',48011,48),(1515,'Zemmoura',48012,48),(1516,'Beni Dergoun',48013,48),(1517,'Djidiouia',48014,48),(1518,'El Guettar',48015,48),(1519,'Hamri',48016,48),(1520,'El Matmar',48017,48),(1521,'Sidi Mhamed Ben Aouda',48018,48),(1522,'Ain Tarek',48019,48),(1523,'Oued Essalem',48020,48),(1524,'Ouarizane',48021,48),(1525,'Mazouna',48022,48),(1526,'Kalaa',48023,48),(1527,'Ain Rahma',48024,48),(1528,'Yellel',48025,48),(1529,'Oued El Djemaa',48026,48),(1530,'Ramka',48027,48),(1531,'Mendes',48028,48),(1532,'Lahlef',48029,48),(1533,'Beni Zentis',48030,48),(1534,'Souk El Haad',48031,48),(1535,'Dar Ben Abdellah',48032,48),(1536,'El Hassi',48033,48),(1537,'Had Echkalla',48034,48),(1538,'Bendaoud',48035,48),(1539,'El Ouldja',48036,48),(1540,'Merdja Sidi Abed',48037,48),(1541,'Ouled Sidi Mihoub',48038,48);
/*!40000 ALTER TABLE `communes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communes_attributs`
--

DROP TABLE IF EXISTS `communes_attributs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `communes_attributs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `optionnel` tinyint(4) DEFAULT '1',
  `communes_attributs_types_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_communes_attributs_communes_attributs_types1_idx` (`communes_attributs_types_id`),
  CONSTRAINT `fk_communes_attributs_communes_attributs_types1` FOREIGN KEY (`communes_attributs_types_id`) REFERENCES `communes_attributs_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communes_attributs`
--

LOCK TABLES `communes_attributs` WRITE;
/*!40000 ALTER TABLE `communes_attributs` DISABLE KEYS */;
/*!40000 ALTER TABLE `communes_attributs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communes_attributs_details`
--

DROP TABLE IF EXISTS `communes_attributs_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `communes_attributs_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valeur` varchar(255) NOT NULL,
  `communes_attributs_id` int(11) NOT NULL,
  `communes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_communes_attributs_details_communes_attributs1_idx` (`communes_attributs_id`),
  KEY `fk_communes_attributs_details_communes1_idx` (`communes_id`),
  CONSTRAINT `fk_communes_attributs_details_communes1` FOREIGN KEY (`communes_id`) REFERENCES `communes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_communes_attributs_details_communes_attributs1` FOREIGN KEY (`communes_attributs_id`) REFERENCES `communes_attributs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communes_attributs_details`
--

LOCK TABLES `communes_attributs_details` WRITE;
/*!40000 ALTER TABLE `communes_attributs_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `communes_attributs_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communes_attributs_types`
--

DROP TABLE IF EXISTS `communes_attributs_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `communes_attributs_types` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communes_attributs_types`
--

LOCK TABLES `communes_attributs_types` WRITE;
/*!40000 ALTER TABLE `communes_attributs_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `communes_attributs_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communes_images`
--

DROP TABLE IF EXISTS `communes_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `communes_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `communes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_communes_images_communes1_idx` (`communes_id`),
  CONSTRAINT `fk_communes_images_communes1` FOREIGN KEY (`communes_id`) REFERENCES `communes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communes_images`
--

LOCK TABLES `communes_images` WRITE;
/*!40000 ALTER TABLE `communes_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `communes_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objets`
--

DROP TABLE IF EXISTS `objets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` longtext,
  `categories_id` int(11) NOT NULL,
  `communes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_objets_categories1_idx` (`categories_id`),
  KEY `fk_objets_communes1_idx` (`communes_id`),
  CONSTRAINT `fk_objets_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_objets_communes1` FOREIGN KEY (`communes_id`) REFERENCES `communes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objets`
--

LOCK TABLES `objets` WRITE;
/*!40000 ALTER TABLE `objets` DISABLE KEYS */;
/*!40000 ALTER TABLE `objets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objets_details`
--

DROP TABLE IF EXISTS `objets_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objets_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valeur` varchar(255) NOT NULL,
  `objets_id` int(11) NOT NULL,
  `categories_attributs_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_objets_details_objets1_idx` (`objets_id`),
  KEY `fk_objets_details_categories_attributs1_idx` (`categories_attributs_id`),
  CONSTRAINT `fk_objets_details_categories_attributs1` FOREIGN KEY (`categories_attributs_id`) REFERENCES `categories_attributs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_objets_details_objets1` FOREIGN KEY (`objets_id`) REFERENCES `objets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objets_details`
--

LOCK TABLES `objets_details` WRITE;
/*!40000 ALTER TABLE `objets_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `objets_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objets_images`
--

DROP TABLE IF EXISTS `objets_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `objets_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `objets_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_objets_details_objets1_idx` (`objets_id`),
  CONSTRAINT `fk_objets_details_objets10` FOREIGN KEY (`objets_id`) REFERENCES `objets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objets_images`
--

LOCK TABLES `objets_images` WRITE;
/*!40000 ALTER TABLE `objets_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `objets_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes`
--

DROP TABLE IF EXISTS `villes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `villes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `superficie` int(11) NOT NULL,
  `population` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`nom`),
  UNIQUE KEY `numero_UNIQUE` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes`
--

LOCK TABLES `villes` WRITE;
/*!40000 ALTER TABLE `villes` DISABLE KEYS */;
INSERT INTO `villes` VALUES (1,1,'Adrar',439700,371761),(2,2,'Chlef',4795,976269),(3,3,'Laghouat',25057,381124),(4,4,'Oum El Bouaghi',6783,586087),(5,5,'Batna',12192,1108779),(6,6,'Béjaia',3268,953953),(7,7,'Biskra',20986,685391),(8,8,'Béchar',162200,258677),(9,9,'Blida',1575,890484),(10,10,'Bouira',4439,708343),(11,11,'Tamanrasset',556185,170778),(12,12,'Tébessa',14227,634332),(13,13,'Tlemcen',9061,950431),(14,14,'Tiaret',20673,839011),(15,15,'Tizi Ouzou',3568,1226115),(16,16,'Alger',1190,2882897),(17,17,'Djelfa',66415,976037),(18,18,'Jijel',2577,650771),(19,19,'Sétif',6504,1498953),(20,20,'Saida',6764,318717),(21,21,'Skikda',4026,880251),(22,22,'Sidi Bel Abbès',9096,594098),(23,23,'Annaba',1439,621786),(24,24,'Guelma',4101,480258),(25,25,'Constantine',2187,913338),(26,26,'Médéa',8866,902678),(27,27,'Mostaganem',2175,713162),(28,28,'Msila',18718,945633),(29,29,'Mascara',5941,761881),(30,30,'Ouargla',211980,541045),(31,31,'Oran',2121,1382980),(32,32,'El Bayadh',78870,200969),(33,33,'Illizi',285000,42714),(34,34,'Bordj Bou Arreridj',4115,639653),(35,35,'Boumerdès',1356,727531),(36,36,'El Tarf',3339,407202),(37,37,'Tindouf',159000,32683),(38,38,'Tissemsilt',3152,304594),(39,39,'El Oued',54573,617691),(40,40,'Khenchela',9811,377577),(41,41,'Souk Ahras',4541,412281),(42,42,'Tipaza',1605,571619),(43,43,'Mila',9373,768669),(44,44,'Ain Defla',4891,754692),(45,45,'Naama',29950,146157),(46,46,'Ain Témouchent',2379,368309),(47,47,'Ghardaia',86105,361570),(48,48,'Relizane',4870,723355),(67,9879,'mars',2,9879);
/*!40000 ALTER TABLE `villes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes_attributs`
--

DROP TABLE IF EXISTS `villes_attributs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `villes_attributs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `optionnel` tinyint(4) DEFAULT '1',
  `villes_attributs_types_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_villes_attributs_villes_attributs_types1_idx` (`villes_attributs_types_id`),
  CONSTRAINT `fk_villes_attributs_villes_attributs_types1` FOREIGN KEY (`villes_attributs_types_id`) REFERENCES `villes_attributs_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes_attributs`
--

LOCK TABLES `villes_attributs` WRITE;
/*!40000 ALTER TABLE `villes_attributs` DISABLE KEYS */;
/*!40000 ALTER TABLE `villes_attributs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes_attributs_details`
--

DROP TABLE IF EXISTS `villes_attributs_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `villes_attributs_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valeur` varchar(255) NOT NULL,
  `villes_id` int(11) NOT NULL,
  `villes_attributs_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_villes_attributs_details_villes1_idx` (`villes_id`),
  KEY `fk_villes_attributs_details_villes_attributs1_idx` (`villes_attributs_id`),
  CONSTRAINT `fk_villes_attributs_details_villes1` FOREIGN KEY (`villes_id`) REFERENCES `villes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_villes_attributs_details_villes_attributs1` FOREIGN KEY (`villes_attributs_id`) REFERENCES `villes_attributs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes_attributs_details`
--

LOCK TABLES `villes_attributs_details` WRITE;
/*!40000 ALTER TABLE `villes_attributs_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `villes_attributs_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes_attributs_types`
--

DROP TABLE IF EXISTS `villes_attributs_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `villes_attributs_types` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes_attributs_types`
--

LOCK TABLES `villes_attributs_types` WRITE;
/*!40000 ALTER TABLE `villes_attributs_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `villes_attributs_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `villes_images`
--

DROP TABLE IF EXISTS `villes_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `villes_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `villes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_villes_images_villes1_idx` (`villes_id`),
  CONSTRAINT `fk_villes_images_villes1` FOREIGN KEY (`villes_id`) REFERENCES `villes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `villes_images`
--

LOCK TABLES `villes_images` WRITE;
/*!40000 ALTER TABLE `villes_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `villes_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-21 17:57:11
