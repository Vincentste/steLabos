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

// recup les tailles 
function recupTaille(){
    $requete='SELECT tail_nom as taille FROM tailles';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}
	
function requeteTshirtParNoms($lettre){
	$requete='SELECT * FROM produits where prod_nom like :a';
	$connexion=connexion_PDO();
	//preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute([':a'=>"%".$lettre."%"]);
    //dans résultat on a l'ensemble des résultats de la requete
     return $resultat->fetchAll(PDO::FETCH_OBJ);
}

function requeteSupprimerTshirt($id){
	$requete='DELETE produits,exemplaires FROM produits INNER JOIN exemplaires where prod_id = :a and exem_fk_tee= :a';
	$connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([':a'=>$id]);
}

function requeteInsertTshirt($nom,$prix,$img_gd,$img_pt,$des,$crea,$mat,$date_aj,$cat){
	$requete='INSERT INTO produits(prod_nom,prod_prix,prod_img_gd,prod_img_pt,prod_desc,prod_fk_createur,prod_fk_matiere,prod_date,prod_fk_categorie) VALUES (:nom,:prix,:img_gd,:img_pt,:des,:crea,:mat,:date_aj,:cat)';
	$connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute(
    	[':nom'=>$nom,
    	 ':prix'=>$prix,
    	 ':img_gd'=>$img_gd,
    	 ':img_pt'=>$img_pt,
    	 ':des'=>$des,
    	 ':crea'=>$crea,
    	 ':mat'=>$mat,
    	 ':date_aj'=>$date_aj,
    	 ':cat'=>$cat
    	]);
     
    return $connexion->lastInsertId("prod_id");
}

function requeteInsertExem($id_exem,$id_taille,$stock){
    $requete='INSERT INTO exemplaires (exem_fk_tail,exem_fk_tee,exem_stock) SELECT tail_id,:id_exem,:stock FROM tailles WHERE tail_nom = :id_taille ';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute(
        [':id_exem'=>$id_exem,
         ':id_taille'=>$id_taille,
         ':stock'=>$stock
        ]);
}

  function requeteTshirtFiltres($categorie,$createur,$matiere){
     $requete='Select * from produits'
         .' JOIN categories on prod_fk_categorie = cat_id'
         .' JOIN matieres on prod_fk_matiere = mat_id'
         .' JOIN createurs on prod_fk_createur = cre_id'
         .' Where cat_nom like :a'
         .' and cre_nom like :b'
         .' and mat_nom like :c';
     $connexion=connexion_PDO();
 	//preparation requete
     $resultat=$connexion->prepare($requete);
     $resultat->execute([':a'=>$categorie,':b'=>$createur,':c'=>$matiere]);
     return $resultat->fetchAll(PDO::FETCH_OBJ);
  }

function recupere_exemplaire($id,$taille){
    $requete="select exem_stock FROM exemplaires "
            . "JOIN produits ON prod_id=exem_fk_tee "
            . "JOIN createurs on prod_fk_createur=cre_id "
            . "JOIN matieres on prod_fk_matiere=mat_id "
            . "JOIN categories on prod_fk_categorie=cat_id "
            . "JOIN tailles ON exem_fk_tail=tail_id WHERE  tail_nom=:b AND prod_id=:a";
  
    $connexion=connexion_PDO();
        //preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute([':a'=>$id,':b'=>$taille]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}

function recupere_infos_untshirt($id){
    $requete='Select * from produits'
         .' JOIN categories on prod_fk_categorie = cat_id'
         .' JOIN matieres on prod_fk_matiere = mat_id'
         .' JOIN createurs on prod_fk_createur = cre_id'
         .' Where prod_id = :a';
     $connexion=connexion_PDO();
    //preparation requete
     $resultat=$connexion->prepare($requete);
     $resultat->execute([':a'=>$id]);
     return $resultat->fetchAll(PDO::FETCH_OBJ);
    
}    
//recup les tailles d'un t-shirt
function requeteTailleTshirt($idTshirt){
    $requete='SELECT tail_id as idTaille,tail_nom as taille,exem_stock as stock FROM exemplaires LEFT OUTER JOIN tailles on tail_id = exem_fk_tail  WHERE exem_fk_tee = :idTshirt ORDER BY `exemplaires`.`exem_fk_tee` ASC ';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idTshirt"=>$idTshirt]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}

//insert une taille 
function InsertTaille($ValTaille){
    $requete='INSERT INTO tailles (tail_nom) VALUES (:ValTaille)';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":ValTaille"=>$ValTaille]);
}

//insert une catégorie 
function InsertCat($idCat){
    $requete='INSERT INTO categories (cat_nom) VALUES (:idCat)';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCat"=>$idCat]);
}

//insert un dréateur
function InsertCrea($idCrea){
    $requete='INSERT INTO createurs (cre_nom) VALUES (:idCrea)';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCrea"=>$idCrea]);
}

//insert une catégorie 
function InsertMat($idMat){
    $requete='INSERT INTO matieres (mat_nom) VALUES (:idMat)';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idMat"=>$idMat]);
}


// ajoute une taille au volet Modif 
function AjoutTailleVoletModif($idTshirt,$ValTaille){
    $Taille = recupTaille();
    $tab = [];
    for ($i=0; $i < count($Taille); $i++) { 
        array_push($tab, $Taille[$i]->taille);
    }
    //si la taille est déjà dans la DB
    if(in_array($ValTaille, $tab)){
        //insert dans exemplaire de la nouvelle taille avec stock à zéro
        $requete='INSERT INTO exemplaires (exem_fk_tail,exem_fk_tee,exem_stock) SELECT tail_id,:idTshirt,0 FROM tailles WHERE tail_nom LIKE :ValTaille ';
        $connexion=connexion_PDO();
        $resultat=$connexion->prepare($requete);
        $resultat->execute([":idTshirt"=>$idTshirt,":ValTaille"=>$ValTaille]);
    //si la taille n'existe pas dans la DB
    }else{
        //insert de la nouvelle Taille 
        InsertTaille($ValTaille);
        //insert dans exemplaire de la nouvelle taille avec stock à zéro
        $requete='INSERT INTO exemplaires (exem_fk_tail,exem_fk_tee,exem_stock) SELECT tail_id,:idTshirt,0 FROM tailles WHERE tail_nom LIKE :ValTaille ';
        $connexion=connexion_PDO();
        $resultat=$connexion->prepare($requete);
        $resultat->execute([":idTshirt"=>$idTshirt,":ValTaille"=>$ValTaille]);
    }
    return requeteTailleTshirt($idTshirt);
}

  //ajoute une taille au volet Ajout
  function AjoutTailleVoletAjout($ValTaille){
    $Taille = recupTaille();
    $tab = [];
    for ($i=0; $i < count($Taille); $i++) { 
        array_push($tab, $Taille[$i]->taille);
    }

    if(!in_array($ValTaille, $tab)){
        //insert de la nouvelle Taille 
        InsertTaille($ValTaille);
    }

    $requete='SELECT tail_id as IdTaille FROM tailles WHERE tail_nom = :ValTaille';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":ValTaille"=>$ValTaille]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}




//update (nom,prix,date,desc,crea,mat,cat) dans la DB d un t-shirt
function RequeteUpdate_Tshirt($id,$nom,$prix,$date,$desc,$crea,$mat,$cat){
    $requete='Update produits SET prod_nom = :nom ,prod_prix = :prix,prod_date = :date, prod_desc = :desc, prod_fk_createur = :crea, prod_fk_matiere = :mat, prod_fk_categorie = :cat WHERE prod_id = :id';
    $connexion=connexion_PDO();
    //preparation requete
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":id"=>$id,":nom"=>$nom,":prix"=>$prix,":date"=>$date,":desc"=>$desc,":crea"=>$crea,":mat"=>$mat,":cat"=>$cat]);

 }

//supprime le stock d'une taille d'un tshirt
function RequeteSupprimeTaille($idTaille,$idTshirt){
    $requete='DELETE  FROM exemplaires  WHERE exem_fk_tee = :idTshirt and exem_fk_tail = :idTaille';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idTaille"=>$idTaille,":idTshirt"=>$idTshirt]);
}

//update la taille d'un tshirt 
function RequeteUpdate_Taille($idTshirt,$idTaille,$valeur){
    $requete='UPDATE exemplaires JOIN tailles ON exem_fk_tail = tail_id SET exem_stock = :valeur where exem_fk_tee = :idTshirt and tail_nom = :idTaille ';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":valeur"=>$valeur,":idTaille"=>$idTaille,":idTshirt"=>$idTshirt]);
}

function nbrImg(){
    $requete='SELECT (COUNT(DISTINCT prod_img_gd) + COUNT(DISTINCT prod_img_gd)) AS nbrImgs FROM produits';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute();
    return $resultat->fetch(PDO::FETCH_OBJ);
}

function requeteSelectImg($limite){
    $requete='SELECT DISTINCT prod_img_gd,prod_img_pt FROM produits 
              WHERE prod_img_gd !="" AND prod_img_pt !="" LIMIT '.$limite.',3';

    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute();
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}

//supp une catégorie => tshirt et exemplaire lié
function DeleteCat($idCat){
    $requete='DELETE from categories where cat_id = :idCat';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCat"=>$idCat]);

}

function suppCat($idCat){
    DeleteCat($idCat);
    $requete='DELETE produits,exemplaires FROM produits INNER JOIN exemplaires where prod_fk_categorie = :idCat AND exem_fk_tee = prod_id';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCat"=>$idCat]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}

//ajoute une catégorie si elle n'existe pas 
function ajouCat($idCat){
    $cat = recupAllCategories();
    $tab = [];
    for ($i=0; $i < count($cat); $i++) { 
        array_push($tab, $cat[$i]->cat_nom);
    }
    if(!in_array($idCat, $tab)){
        //insert de la nouvelle catégorie  
        InsertCat($idCat);
        return "o";
    }else{
        return "n";
    }

}

//supp un createur => tshirt et exemplaire lié
function DeleteCrea($idCrea){
    $requete='DELETE from createurs where cre_id = :idCrea';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCrea"=>$idCrea]);
}

function suppCrea($idCrea){
    DeleteCrea($idCrea);
    $requete='DELETE produits,exemplaires FROM produits INNER JOIN exemplaires where prod_fk_createur = :idCrea AND exem_fk_tee = prod_id';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idCrea"=>$idCrea]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);

}


//ajoute un créateur si il n'existe pas 
function ajouCrea($idCrea){
    $crea = recupAllCreateurs();
    $tab = [];
    for ($i=0; $i < count($crea); $i++) { 
        array_push($tab, $crea[$i]->cre_nom);
    }
    if(!in_array($idCrea, $tab)){
        //insert de le nouveau créateur 
        InsertCrea($idCrea);
        return "o";
    }else{
        return "n";
    }

}


//supp une matiére => tshirt et exemplaire lié
function DeleteMat($idMat){
    $requete='DELETE from matieres where mat_id = :idMat';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idMat"=>$idMat]);
}

function suppMat($idMat){
    DeleteMat($idMat);
    $requete='DELETE produits,exemplaires FROM produits INNER JOIN exemplaires where prod_fk_createur = :idMat AND exem_fk_tee = prod_id';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idMat"=>$idMat]);

}


//ajoute une matiére si elle n'existe pas 
function ajouMat($idMat){
    $mat = recupAllMatieres();
    $tab = [];
    for ($i=0; $i < count($mat); $i++) { 
        array_push($tab, $mat[$i]->mat_nom);
    }
    if(!in_array($idMat, $tab)){
        //insert la nouvelle matière 
        InsertMat($idMat);
        return "o";
    }else{
        return "n";
    }

}
