<?php
function connexion_PDO() {
		static $connexion;
		if (!isset ($connexion)) {
			$utilisateur = "labo";
			$motdepasse = "labo";
			$serveur= "mysql:host=localhost;dbname=tshirt";
			$connexion = new PDO ($serveur,$utilisateur,$motdepasse);
		 	$connexion->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete="SET NAMES utf8";
			$resultat= $connexion->exec($requete);
 	  	}
 	  	return ($connexion);
 	}


function requeteConnexion($nom,$mdp){
	$req = "SELECT admin_id 
	FROM administrateurs
	WHERE admin_login = :login AND admin_pwd = :mdp";
	$connexion = connexion_PDO();
	$res = $connexion->prepare($req);
	$res->execute([":login"=>$nom,
				   ":mdp"=>$mdp]);
    //renvoi vrai si !=0,faux sinon
	return $res->fetch(PDO::FETCH_OBJ)!=null;
}

function recupAllCreateurs(){
	$requete="SELECT * FROM createurs";
	$connexion=connexion_PDO();
	//preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute();
    //dans résultat on a l'ensemble des résultats de la requete
     return $resultat->fetchAll(PDO::FETCH_OBJ);
}

function recupAllMatieres(){
	$requete="SELECT * FROM matieres";
	$connexion=connexion_PDO();
	//preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute();
    //dans résultat on a l'ensemble des résultats de la requete
     return $resultat->fetchAll(PDO::FETCH_OBJ);
}

function recupAllCategories(){
	$requete="SELECT * FROM categories";
	$connexion=connexion_PDO();
	//preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute();
    //dans résultat on a l'ensemble des résultats de la requete
     return $resultat->fetchAll(PDO::FETCH_OBJ);
}
	
