<?php
function connexion_PDO() {
		static $connexion;
		if (!isset ($connexion)) {
			$utilisateur ="root";
			$motdepasse="mysql";
			$serveur= "mysql:host=localhost;dbname=boutique t-shirt";
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