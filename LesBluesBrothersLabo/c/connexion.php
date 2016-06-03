<?php
function connexion_PDO() {
		static $connexion;
		if (!isset ($connexion)) {
			$utilisateur ="labo";
			$motdepasse="labo";
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
function requeteTshirtParNoms($lettre){
        // Recherche selon l'input search
            $requete = "SELECT prod_id AS id, "
                    . "prod_nom AS nom, "
                    . "prod_prix AS prix, "
                    . "prod_img_gd AS imgDetails, "
                    . "prod_img_pt AS imgListe, "
                    . "prod_desc AS description, "
                    . "cre_nom AS createur, "
                    . "mat_nom AS matiere, "
                    . "prod_date AS date, "
                    . "cat_nom AS categorie "
                    . "FROM produits "
                    . "JOIN createurs ON prod_fk_createur = cre_id "
                    . "JOIN matieres ON prod_fk_matiere = mat_id "
                    . "JOIN categories ON prod_fk_categorie = cat_id "
                ."WHERE prod_nom LIKE :a "
                ."order by prod_nom";
            $connexion=connexion_PDO();
            $resultat=$connexion->prepare($requete);
            $resultat->execute([":a"=>"%".$lettre."%"]);
        return $resultat->fetchAll(PDO::FETCH_OBJ);
           
         
    }
