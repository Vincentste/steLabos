

<?php
	$operation_permise=[
	    "accueil"=>true,
        "connexion" => "accueil.html",
        "getSession" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "template_tshirt"=>"accueil.html",
        "data_recherche"=>"accueil.html",
        "rechercheParTexte"=>"accueil.html",
        "supprimerTshirt"=>"accueil.html",
        "supprimerTaille"=>"accueil.html",
        "ModifierTshirt"=>"accueil.html",
        "tailleTshirt"=>"accueil.html",
        "UpdateTshirt"=>"accueil.html",
        "UpdateTaille"=>"accueil.html",
        "AjoutTaille"=>"accueil.html",
        "AjoutTailleAjout"=>"accueil.html",
        "afficheModifierTshirt"=>"accueil.html",
        "voletAjoutTshirt"=>"accueil.html",
        "recherche_image"=>"accueil.html",
        "save_tshirt"=>"accueil.html",
        "suppCat"=>"accueil.html",
        "rechercheParFiltre"=>"accueil.html"
	];

    session_start();

	//récupérer l'opération
	$op = (isset($_GET["op"]))?$_GET["op"]:"accueil";
	if(!isset($operation_permise[$op])){
	    $op = "connexion";
	}



	require_once __DIR__.'/c/TemplateConnexion.php';
    require_once __DIR__.'/m/connexion.php';

	switch ($op){
		case "accueil":
	
			break;
		case "connexion":
            //affiche le menu de connecion
			$Affichage = new Affichage();
			echo $Affichage->afficheConnexion();
		
        case "getSession":
        if(isset($_SESSION['connecte'])){
            if($_SESSION['connecte'] == 'oui'){
                 echo('{"authorisation":"oui"}');
            }
        }
        break;
        
        case "controleConnexion":

            $nom = isset($_GET['nom'])?$_GET['nom']:"";
            $mdp = isset($_GET['mdp'])?$_GET['mdp']:"";

            if($nom!="" && $mdp!=""){
            	
                $resultat=requeteConnexion($nom,$mdp);

                if($resultat){
                    echo('{"authorisation":"oui"}');
                    
                    $_SESSION['connecte']='oui';
              
                }else{
                    echo('{"authorisation":"non"}');
                   
                }
            }
			break;   
            
            case "template_tshirt":
            $Affichage = new Affichage();
            echo $Affichage->afficheMenu();
            echo $Affichage->afficheChampsRecherche();
            break;
            
            case "data_recherche":
            $tabCat = recupAllCategories();
            $tabMat = recupAllMatieres();
            $tabCrea = recupAllCreateurs();
            $tabTaille = recupTaille();
            $tab = ["categories"=>$tabCat,
                "matieres"=>$tabMat,
                "createurs"=>$tabCrea,
                "taille"=>$tabTaille];
            echo json_encode($tab);
            break;
            
            //recherche les correspondances avec la/les lettre(s) du moteur de recherche
            case "rechercheParTexte":
            $text=$_GET['lettre'];
            $resultat=requeteTshirtParNoms($text);
            echo json_encode($resultat);
            break;
            
            case"rechercheParFiltre":
            $categorie=$_GET['cat'];
            $matiere=$_GET['mat'];
            $createur=$_GET['cre'];
            $resultatFiltre=requeteTshirtFiltres($categorie,$createur,$matiere);
            echo json_encode($resultatFiltre);
            break;
 
            //supprime un tshirt ds la DB(produits + exemplaire)
            case "supprimerTshirt":
            $id=$_GET['id'];
            requeteSupprimerTshirt($id);
            break;

            case "voletAjoutTshirt":
                $Affichage = new Affichage();
                echo $Affichage->afficheAjoutTshirt();
            break; 

            case "recherche_image":
                $limite = ($_GET['pg']-1)*2;
                $nbrImg = nbrImg();
                $images=requeteSelectImg($limite);

                $tabImg = ["nbrImg"=>$nbrImg,"images"=>$images];
                echo json_encode($tabImg);
            break;

            case "save_tshirt":

                $nom= $_GET['nom']; 
                $prix= $_GET['prix'];
                $img_gd="";
                $img_pt="";
                $des= $_GET['desc'];
                $crea= $_GET['crea'];
                $mat= $_GET['mat'];
                $date_aj= $_GET['date'];
                $cat= $_GET['cat'];
                $StockTaille = $_GET['taille'];

                 //Insérer le produit et récupérer l'id de celui-ci
                $id_exem = requeteInsertTshirt($nom,$prix,$img_gd,$img_pt,$des,$crea,$mat,$date_aj,$cat);
                
                //Si le produit à bien été ajouté, insérer les exemplaires
                if($id_exem > 0){
                    //Boucler sur toutes les tailles
                    foreach($StockTaille as $idtaille=>$stock){
                        requeteInsertExem($id_exem,$idtaille,$stock);
                    }                    
               }
               
            break;

            //affiche les infos à modifier pour un tshirt 
            case "afficheModifierTshirt":
                $Affichage = new Affichage();
                echo $Affichage->afficheModifTshirt();
            break;

            //recup les info pour le volet modifié
            case "ModifierTshirt":
                $id=$_GET['id'];
                $requete = recupere_infos_untshirt($id);
                echo json_encode($requete);
            break;

            //recup. des tailles d'un tshirt
            case"tailleTshirt":
                $idTshirt = $_GET['idTshirt'];
                $requete = requeteTailleTshirt($idTshirt);
                echo json_encode($requete);
            break;
           
            //update le tshirt ds la DB
            case "UpdateTshirt":
                $idTshirt= $_GET['id'];
                $nom = $_GET['prodNom'];
                $prix = $_GET['prodPrix'];
                $date = $_GET['prodDate'];
                $desc = $_GET['prodDesc'];
                $crea = $_GET['prodCre'];
                $mat = $_GET['prodMat'];
                $cat = $_GET['prodCat'];
                $StockTaille = $_GET['StockTaille'];
                
                foreach($StockTaille as $taille => $stock){
                  RequeteUpdate_Taille($idTshirt,$taille,$stock);
                }
               RequeteUpdate_Tshirt($idTshirt,$nom,$prix,$date,$desc,$crea,$mat,$cat);
            break;

             // supprime la taille d'un tshirt 
            case "supprimerTaille":
                $idTshirt = $_GET['idTshirt'];
                $idTaille = $_GET['idTaille'];
                RequeteSupprimeTaille($idTaille,$idTshirt);
            break;

            // ajoute une taille ds le volet Modifier
            case "AjoutTaille":
                $idTshirt = $_GET['idTshirt'];
                $ValTaille = $_GET['ValTaille'];
                $requete = AjoutTailleVoletModif($idTshirt,$ValTaille);
            break;

            //ajoute une taille ds le volet Ajout 
            case "AjoutTailleAjout":
                $ValTaille = $_GET['ValTaille'];
                $requete = AjoutTailleVoletAjout($ValTaille);
                echo json_encode($requete);
            break;
            
            //Suprime une catégorie => t-shirt et stock lié
            case "suppCat":
            $idCat = $_GET['idCat'];
            $requete = suppCat($idCat);
            echo json_encode($requete);
            break; 


    }
