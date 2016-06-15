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
	$requete='DELETE produits,exemplaires FROM produits where prod_id = :a';
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
    $requete='INSERT INTO exemplaires(exem_fk_tee,exem_fk_tail,exem_stock) VALUES (:id_exem,:id_taille,:stock)';
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
    $requete='SELECT tail_id as idTaille,tail_nom as taille,exem_stock as stock FROM exemplaires LEFT OUTER JOIN tailles on tail_id = exem_fk_tail  WHERE exem_fk_tee = :idTshirt  ';
    $connexion=connexion_PDO();
    $resultat=$connexion->prepare($requete);
    $resultat->execute([":idTshirt"=>$idTshirt]);
    return $resultat->fetchAll(PDO::FETCH_OBJ);
}

function AjoutTailleVoletModif($idTshirt,$ValTaille){
    $Taille = requeteTailleTshirt($idTshirt);
    $tab=[];
    foreach ($Taille as $keys => $value) {
        $tab = $Taille->$value;
    }
    return $tab;
    
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
    $requete='UPDATE exemplaires SET exem_stock = :valeur WHERE exem_fk_tail= :idTaille AND exem_fk_tee = :idTshirt';
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

