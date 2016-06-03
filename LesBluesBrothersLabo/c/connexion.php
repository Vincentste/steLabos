<?php
function connexion_PDO() {
		static $connexion;
		if (!isset ($connexion)) {
			$utilisateur ="root";
			$motdepasse="mysql";
			$serveur= "mysql:host=localhost;dbname=tshirt";
			$connexion = new PDO ($serveur,$utilisateur,$motdepasse);
		 	$connexion->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete="SET NAMES utf8";
			$resultat= $connexion->exec($requete);
 	  	}
 	  	return ($connexion);
 	}
    
function requeteConnexion($nom,$mdp){
        $requete="select nom, prenom from stagiaires where nom like :a limit 5";
        $connexion=connexion_PDO();
        //preparation requete
        $resultat=$connexion->prepare($requete);
        $resultat->execute(["a"=>"%".$nom."%"]);
        //dans résultat on a l'ensemble des résultats de la requete
       return $resultat->fetchAll(PDO::FETCH_OBJ);
        
    }

