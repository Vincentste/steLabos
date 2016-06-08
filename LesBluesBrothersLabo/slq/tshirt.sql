-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 03 Juin 2016 à 08:13
-- Version du serveur :  5.6.22-log
-- Version de PHP :  5.6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tshirt`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateurs`
--

CREATE TABLE `administrateurs` (
  `admin_id` int(11) NOT NULL,
  `admin_login` varchar(32) NOT NULL,
  `admin_pwd` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `administrateurs`
--

INSERT INTO `administrateurs` (`admin_id`, `admin_login`, `admin_pwd`) VALUES
(1, 'LesBluesBrothers', 'LesBluesBrothers');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(11) NOT NULL,
  `cat_nom` varchar(40) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_nom`) VALUES
(1, 'illustré'),
(2, 'slogan'),
(3, 'féminin');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `cli_id` int(11) NOT NULL,
  `cli_nom` varchar(45) NOT NULL,
  `cli_prenom` varchar(45) DEFAULT NULL,
  `cli_adresse` varchar(100) NOT NULL,
  `cli_cp` varchar(45) DEFAULT NULL,
  `cli_localite` varchar(45) DEFAULT NULL,
  `cli_tel` varchar(45) NOT NULL,
  `cli_email` varchar(45) NOT NULL,
  `cli_numero` varchar(8) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `com_id` int(11) NOT NULL,
  `com_fk_client` int(11) NOT NULL,
  `com_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `createurs`
--

CREATE TABLE `createurs` (
  `cre_id` int(11) NOT NULL,
  `cre_nom` varchar(50) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `createurs`
--

INSERT INTO `createurs` (`cre_id`, `cre_nom`) VALUES
(1, '[DAVMVP]'),
(2, '[...Ma...]'),
(3, 'Zzzhhaaa'),
(4, 'zouzou'),
(5, 'zoodiak'),
(6, 'zazou'),
(7, 'Zaza_Zaza'),
(8, 'Zaad'),
(9, 'yoyo'),
(10, 'youfie'),
(11, 'yota'),
(12, 'Yobogs'),
(13, 'yamool'),
(14, 'yaha'),
(15, 'xxl147'),
(16, 'ximin'),
(17, 'xaxa'),
(18, 'xavier'),
(19, 'Xavier'),
(20, 'woltjef'),
(21, 'Wist'),
(22, 'Willy'),
(23, 'wasegr'),
(24, 'wanted'),
(25, 'vloupi'),
(26, 'Vitalic'),
(27, 'viou'),
(28, 'vinzo'),
(29, 'vintz'),
(30, 'vinnie'),
(31, 'Vince T.'),
(32, 'Vince'),
(33, 'Vieuxpapy'),
(34, 'Vanif'),
(35, 'vandetta'),
(36, 'ultra\''),
(37, 'ugisidi'),
(38, 'Twiggy'),
(39, 'tutur'),
(40, 'Tudo86'),
(41, 'tritonage'),
(42, 'TrakN\'art'),
(43, 'touxi3'),
(44, 'touffout'),
(45, 'touchtoi'),
(46, 'tony63600'),
(47, 'tony'),
(48, 'tony'),
(49, 'tonin59'),
(50, 'Tiziana'),
(51, 'tixic'),
(52, 'titoun'),
(53, 'titine'),
(54, 'tite chino'),
(55, 'titam14'),
(56, 'Tique'),
(57, 'tine'),
(58, 'Tiboat8h'),
(59, 'Thibo'),
(60, 'the_ouf'),
(61, 'thebyt'),
(62, 'than'),
(63, 'test'),
(64, 'temet'),
(65, 'tema'),
(66, 'tef');

-- --------------------------------------------------------

--
-- Structure de la table `details_commandes`
--

CREATE TABLE `details_commandes` (
  `det_id` int(11) NOT NULL,
  `det_fk_exemplaire` int(11) NOT NULL,
  `det_fk_commande` int(11) NOT NULL,
  `det_quantite` int(11) NOT NULL,
  `det_prix` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='commandes de tee-shirt\n';

-- --------------------------------------------------------

--
-- Structure de la table `exemplaires`
--

CREATE TABLE `exemplaires` (
  `exem_id` int(11) NOT NULL,
  `exem_fk_tee` int(11) NOT NULL,
  `exem_fk_tail` int(11) NOT NULL,
  `exem_stock` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `exemplaires`
--

INSERT INTO `exemplaires` (`exem_id`, `exem_fk_tee`, `exem_fk_tail`, `exem_stock`) VALUES
(1, 1, 1, 30),
(2, 2, 1, 20),
(3, 4, 1, 7),
(4, 6, 1, 27),
(5, 7, 1, 11),
(6, 8, 1, 27),
(7, 9, 1, 1),
(8, 10, 1, 24),
(9, 11, 1, 15),
(10, 14, 1, 5),
(11, 15, 1, 30),
(12, 16, 1, 35),
(13, 19, 1, 36),
(14, 22, 1, 23),
(15, 24, 1, 9),
(16, 1, 2, 23),
(17, 2, 2, 0),
(18, 3, 2, 37),
(19, 4, 2, 9),
(20, 5, 2, 35),
(21, 6, 2, 0),
(22, 7, 2, 31),
(23, 8, 2, 16),
(24, 9, 2, 35),
(25, 10, 2, 28),
(26, 11, 2, 34),
(27, 12, 2, 37),
(28, 13, 2, 33),
(29, 14, 2, 6),
(30, 15, 2, 27),
(31, 16, 2, 20),
(32, 17, 2, 18),
(33, 18, 2, 32),
(34, 19, 2, 4),
(35, 20, 2, 22),
(36, 21, 2, 1),
(37, 22, 2, 38),
(38, 23, 2, 39),
(39, 24, 2, 28),
(40, 1, 3, 26),
(41, 2, 3, 0),
(42, 3, 3, 0),
(43, 4, 3, 22),
(44, 5, 3, 39),
(45, 6, 3, 27),
(46, 7, 3, 20),
(47, 8, 3, 19),
(48, 9, 3, 34),
(49, 10, 3, 13),
(50, 11, 3, 13),
(51, 12, 3, 26),
(52, 13, 3, 0),
(53, 14, 3, 35),
(54, 15, 3, 0),
(55, 16, 3, 35),
(56, 17, 3, 31),
(57, 18, 3, 1),
(58, 19, 3, 11),
(59, 20, 3, 4),
(60, 21, 3, 34),
(61, 22, 3, 8),
(62, 23, 3, 0),
(63, 24, 3, 24),
(64, 1, 4, 2),
(65, 2, 4, 36),
(66, 3, 4, 26),
(67, 4, 4, 19),
(68, 5, 4, 20),
(69, 6, 4, 0),
(70, 7, 4, 0),
(71, 11, 4, 0),
(72, 12, 4, 0),
(73, 13, 4, 38),
(74, 14, 4, 5),
(75, 16, 4, 11),
(76, 17, 4, 0),
(77, 18, 4, 29),
(78, 20, 4, 17),
(79, 23, 4, 0);

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `mat_id` int(11) NOT NULL,
  `mat_nom` varchar(30) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `matieres`
--

INSERT INTO `matieres` (`mat_id`, `mat_nom`) VALUES
(1, 'coton'),
(2, 'polyester');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `prod_id` int(11) NOT NULL,
  `prod_nom` varchar(30) NOT NULL DEFAULT '',
  `prod_prix` float NOT NULL DEFAULT '0',
  `prod_img_gd` varchar(30) NOT NULL DEFAULT '',
  `prod_img_pt` varchar(30) NOT NULL DEFAULT '',
  `prod_desc` longtext,
  `prod_fk_createur` int(11) DEFAULT '0',
  `prod_fk_matiere` int(11) DEFAULT '0',
  `prod_date` date NOT NULL DEFAULT '0000-00-00',
  `prod_fk_categorie` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `produits`
--

INSERT INTO `produits` (`prod_id`, `prod_nom`, `prod_prix`, `prod_img_gd`, `prod_img_pt`, `prod_desc`, `prod_fk_createur`, `prod_fk_matiere`, `prod_date`, `prod_fk_categorie`) VALUES
(1, 'Au loup', 16, 'mannequin_oloup.jpg', 'tee_oloup2.jpg', 'Tee-shirt Au Loup exclusif\r\nInscription : "Qui a tué le chaperon rouge ?"\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Rouge\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 2, 1, '2008-11-25', 1),
(2, 'Way of life', 16, 'wayoflife-petit.jpg', 'WayOfLife.jpg', 'Tee-shirt "Way Of Life" exclusif en Série Limitée à 500 exemplaires\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Navy\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 5, 1, '2009-12-08', 1),
(3, 'Ptit biscuit', 19, 'mannequin_ptit-biscuit.jpg', 'tee_ptitbiscuit2.jpg', 'Tee-shirt Manches longues "Ptit Biscuit"\r\nSes caractéristiques sont les suivantes :\r\nModèle B&C 190 exact LS\r\nCouleur Sable\r\nPetit col simple couture\r\nCoupe légèrement ajustée\r\nBande de propreté d\'épaule à épaule\r\nOurlet manches sans bord côte', 7, 2, '2009-02-19', 1),
(4, 'Dim Sum vs Tofu', 19, 'mannequin_dimsum.jpg', 'tee_dimsum2.jpg', 'Tee-shirt Manches longues "Dim Sum vs Tofu"\r\nSes caractéristiques sont les suivantes :\r\nModèle Gildan Ultra-T LS\r\nCouleur Bleu clair\r\n207 gr./m²\r\nBande de propreté d\'épaule à épaule\r\nEncolure surpiquée sans couture\r\nDoubles piqûres aux manches et à la taille\r\nManches avec bord côte\r\nMaille serrée', 2, 1, '2009-01-28', 1),
(5, 'Noentiendo', 16, 'mannequin-noentiendo-homme.jpg', 'noentiendo.jpg', 'Tee-shirt "Noentiendo" exclusif\r\nExplication : No entiendo veut dire je n\'entends pas en espagnol ! Vu son âge, on lui pardonne ;)\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Noire\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 8, 2, '2009-11-10', 1),
(6, 'Traverse la rivière', 11, 'mannequin_traverse.jpg', 'tee_traverse2.jpg', 'Tee-shirt "Traverse la rivière" exclusif\r\nInscription : "Traverse la rivière avant d\'insulter le crocodile"\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Bleu Royal\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 13, 1, '2009-06-04', 2),
(7, 'Love Puzzle', 16, 'mannequin-puzzle.jpg', 'tee_puzzle5.jpg', 'Tee-shirt "Love Puzzle" exclusif\r\nModèle féminin\r\nSes caractéristiques sont les suivantes :\r\nModèle B&C Taste Woman\r\nTee-shirt femme manches courtes, côtes 1x1\r\nEncolure ronde, avec biais en côtes\r\nCoupe cintrén (avec coutures latérales)\r\nDouble piqûre aux manches et au bas du tee-shirt', 12, 1, '2009-06-05', 3),
(8, 'Les hommes à la poubelle', 16, 'mannequin_alapoubelle.jpg', 'tee_alapoubelle_feminin.jpg', 'Tee-shirt "Les hommes à la poubelle" exclusif en vente uniquement sur Koalala\r\nSérie limitée à 500 exemplaires\r\nModèle féminin - coupe ajustée\r\nSes caractéristiques sont les suivantes :\r\n220 gr/m² (haute qualité)\r\nCoupe ajustée très féminine\r\nInterlock doux et stretchy\r\nManches avec finitions\r\nCoutures au bord façonné', 20, 1, '2009-07-31', 3),
(9, 'Listen to your heart', 16, 'mannequin_listen_feminin.jpg', 'tee_listen_feminin.jpg', 'Tee-shirt "Listen to your heart" exclusif en vente uniquement sur Koalala\r\nSérie limitée à 500 exemplaires\r\nModèle féminin - coupe ajustée\r\nSes caractéristiques sont les suivantes :\r\nCouleur : blanc Modèle Mantis M1 220 gr/m² (haute qualité)\r\nCoupe ajustée très féminine\r\nInterlock doux et stretchy\r\nManches avec finitions\r\nCoutures au bord façonné', 30, 2, '2009-07-31', 3),
(10, 'Au loup', 16, 'mannequin-oloup-feminin.jpg', 'tee_oloup_feminin.jpg', 'Tee-shirt "Au Loup" exclusif en vente uniquement sur Koalala\r\nSérie limitée à 500 exemplaires (modèles hommes et femmes)\r\nModèle féminin - coupe ajustée\r\nInscription : "Qui a tué le chaperon rouge ?"\r\nSes caractéristiques sont les suivantes :\r\nCouleur : rouge Modèle Mantis M1 220 gr/m² (haute qualité)\r\nCoupe ajustée très féminine\r\nInterlock doux et stretchy\r\nManches avec finitions\r\nCoutures au bord façonné', 2, 1, '2009-07-31', 3),
(11, 'L\'intelligence a un visage', 11, 'mannequin-lintelligence.jpg', 'lintelligence.jpg', 'Tee-shirt "L\'intelligence a un visage" exclusif\r\nInscription :\r\nL\'intelligence a un visage*\r\n*voir ci-dessus\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Bleu Navy\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 40, 2, '2009-11-10', 2),
(12, 'Faudrait voir...', 11, 'mannequin-faudrait-homme.jpg', 'faudrait_voir.jpg', 'Tee-shirt "Faudrait voir avec ma collègue" exclusif\r\nInscription : Faudrait voir avec ma collègue\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur light graphite (gris)\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce\r\npour une meilleure tenue', 4, 1, '2009-11-10', 2),
(13, 'Mao', 16, 'mannequin-mao-homme.jpg', 'Mao.jpg', 'Tee-shirt "Mao" exclusif en Série Limitée à 500 exemplaires\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Olive\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 11, 2, '2010-02-20', 1),
(14, 'Saute mouton', 16, 'mannequin-saute-mouton.jpg', 'saute-mouton.jpg', 'Tee-shirt "Saute-Mouton" exclusif en Série Limitée à 500 exemplaires\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Light Graphite\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 8, 2, '2010-02-20', 1),
(15, 'Movie Wear', 16, 'mannequin-moviewear-homme.jpg', 'MovieWear.jpg', 'Tee-shirt "Movie Wear" exclusif en Série Limitée à 500 exemplaires\r\nSes caractéristiques sont les suivantes :\r\nModèle Super Premium de Fruit Of The Loom\r\nCouleur Olive\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 33, 1, '2010-02-20', 1),
(16, 'Cadavre exquis', 19, 'man_cadavre_exquis.jpg', 'cadavre_exquis.jpg', 'Tee-shirt Cadavre exquis exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur crème\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 25, 2, '2010-03-19', 1),
(17, 'L\'homme et ses démons', 20, 'man_homme_demon.jpg', 'homme_demon.jpg', 'Tee-shirt L\'homme et ses démons exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur crème\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 34, 2, '2010-03-19', 1),
(18, 'Magique l\'arbre', 18, 'man_magique_arbre.jpg', 'magique_arbre.jpg', 'Tee-shirt Magique l\'arbre exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur blanc\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 4, 1, '2010-03-19', 1),
(19, 'Moneyvice', 16, 'man_money_vice.jpg', 'money_vice.jpg', 'Tee-shirt Moneyvice exclusif (féminin)\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur noir\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 18, 1, '2009-12-12', 3),
(20, 'Petits voyous', 21, 'man_petits_voyous.jpg', 'petit_voyous.jpg', 'Tee-shirt Petits voyous exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur armée\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 45, 2, '2010-03-19', 1),
(21, 'PMPR', 9, 'man_PMPR.jpg', 'PMPR.jpg', 'Tee-shirt PMPR exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur rouge\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 1, 1, '2010-03-19', 1),
(22, 'Positive attitude', 9, 'man_positive_attitude.jpg', 'positive_attitude.jpg', 'Tee-shirt Positive attitude exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur argent clair\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 5, 1, '2010-03-19', 1),
(23, 'Red Ant', 21, 'man_red_ant.jpg', 'red_ant.jpg', 'Tee-shirt Red Ant exclusif\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur blanc\r\n205 gr./m²\r\nBande d\'épaule à épaule\r\nCol en une seule pièce pour une meilleure tenue', 43, 2, '2010-03-19', 1),
(24, 'Zen miniature', 15, 'man_zen_miniature.jpg', 'zen_miniature.jpg', 'Tee-shirt Zen miniature exclusif (féminin)\r\nSes caractéristiques sont les suivantes :\r\nModèle American Apparel\r\nCouleur noir\r\n205 gr./m²\r\najustée avec col-v.', 5, 2, '2010-03-19', 3);

-- --------------------------------------------------------

--
-- Structure de la table `tailles`
--

CREATE TABLE `tailles` (
  `tail_id` int(11) NOT NULL,
  `tail_nom` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `tailles`
--

INSERT INTO `tailles` (`tail_id`, `tail_nom`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `unique` (`admin_login`,`admin_pwd`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`cli_id`),
  ADD UNIQUE KEY `cli_numero_UNIQUE` (`cli_numero`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`com_id`);

--
-- Index pour la table `createurs`
--
ALTER TABLE `createurs`
  ADD PRIMARY KEY (`cre_id`);

--
-- Index pour la table `details_commandes`
--
ALTER TABLE `details_commandes`
  ADD PRIMARY KEY (`det_id`);

--
-- Index pour la table `exemplaires`
--
ALTER TABLE `exemplaires`
  ADD PRIMARY KEY (`exem_id`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`mat_id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`prod_id`);

--
-- Index pour la table `tailles`
--
ALTER TABLE `tailles`
  ADD PRIMARY KEY (`tail_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `createurs`
--
ALTER TABLE `createurs`
  MODIFY `cre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT pour la table `details_commandes`
--
ALTER TABLE `details_commandes`
  MODIFY `det_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `exemplaires`
--
ALTER TABLE `exemplaires`
  MODIFY `exem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `mat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `tailles`
--
ALTER TABLE `tailles`
  MODIFY `tail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
