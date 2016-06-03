<?php
	class DBConnexion{
		private static $instance = null;
		private $pdo = null;

		private function __construct(){
			$utilisateur = "root";
			$motdepasse = "mysql";
			$serveur = "mysql:host=localhost;dbname=tshirt";
			$this->pdo = new PDO ($serveur,$utilisateur,$motdepasse);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete= "SET NAMES utf8";
			$resultat = $this->pdo->exec($requete);
		}

		public static function getInstance(){
			//Instancier une nouvelle connexion si j'en ai pas déjà une
			if(self::$instance==null){
				self::$instance = new DBConnexion();
			}

			//Retourner la connexion pdo
			return self::$instance->pdo;
		}
	}