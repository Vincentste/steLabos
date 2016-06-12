

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
        "ModifierTshirt"=>"accueil.html",
        "UpdateTshirt"=>"accueil.html",
        "afficheModifierTshirt"=>"accueil.html",
        "voletAjoutTshirt"=>"accueil.html",
        "recherche_image"=>"accueil.html",
        "save_tshirt"=>"accueil.html",
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
            echo $Affichage->afficheChampsRecherche();
            break;
            
            case "data_recherche":
            $tabCat = recupAllCategories();
            $tabMat = recupAllMatieres();
            $tabCrea = recupAllCreateurs();
            $tab = ["categories"=>$tabCat,
                "matieres"=>$tabMat,
                "createurs"=>$tabCrea];
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
            $resultat=requeteSelectImg();
            echo json_encode($resultat);
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

                $qtTailleS= $_GET['tailleS'];
                $qtTailleM= $_GET['tailleM'];
                $qtTailleL= $_GET['tailleL'];
                $qtTailleXL= $_GET['tailleXL'];

                $tabExem = ["1"=>$qtTailleS,"2"=>$qtTailleM,"3"=>$qtTailleL,"4"=>$qtTailleXL];

                //Insérer le produit et récupérer l'id de celui-ci
                $id_exem = requeteInsertTshirt($nom,$prix,$img_gd,$img_pt,$des,$crea,$mat,$date_aj,$cat);
                
                //Si le produit à bien été ajouté, insérer les exemplaires
                if($id_exem > 0){
                   
                    //Boucler sur toutes les tailles
                    foreach ($tabExem as $id_taille => $stock) {
                        requeteInsertExem($id_exem,$id_taille,$stock);
                    }                    
                }

            break;

            //affiche les info a modifier pour un tshirt 
            case "afficheModifierTshirt":
                $Affichage = new Affichage();
                echo $Affichage->afficheModifTshirt();
            break;

            //recup des info pour le volet modifié
            case "ModifierTshirt":
                $id=$_GET['id'];
                $requete = recupere_infos_untshirt($id);
                echo json_encode($requete);
            break;

            //update le tshirt ds la DB
            case "UpdateTshirt":

                $id= $_GET['id'];
                $nom = $_GET['prodNom'];
                $prix = $_GET['prodPrix'];
                $date = $_GET['prodDate'];
                $desc = $_GET['prodDesc'];
                $crea = $_GET['prodCre'];
                $mat = $_GET['prodMat'];
                $cat = $_GET['prodCat'];

                RequeteUpdate_Tshirt($id,$nom,$prix,$date,$desc,$crea,$mat,$cat);
            break;
    }
