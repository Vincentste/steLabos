<?php
	$operation_permise=[
	   "accueil"=>true,
    	"connexion" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "template_tshirt"=>"accueil.html",
        "data_recherche"=>"accueil.html",
        "rechercheParTexte"=>"accueil.html",
        "supprimerTshirt"=>"accueil.html",
        "voletAjoutTshirt"=>"accueil.html",
        "save_tshirt"=>"accueil.html"
	];

	//récupérer l'opération
	$op = (isset($_GET["op"]))?$_GET["op"]:"accueil";
	if(!isset($operation_permise[$op])){
	    $op = "connexion";
	}

    session_start();
    

	require_once __DIR__.'/c/TemplateConnexion.php';
    require_once __DIR__.'/m/connexion.php';

	switch ($op){
		case "accueil":
	
			break;
		case "connexion":
            //affiche le menu de connecion
			$Affichage = new Affichage();
			echo $Affichage->afficheConnexion();
            //control si déjà connecté
            if ($_SESSION['connecte']='oui'){
            $op = "template_tshirt";
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
            
            case "rechercheParTexte":
            $text=$_GET['lettre'];
            $resultat=requeteTshirtParNoms($text);
            echo json_encode($resultat);
            break;

            case "supprimerTshirt":
            $id=$_GET['id'];
            $requete = requteSupprimerTshirt($id);
             

            case "voletAjoutTshirt":
                $Affichage = new Affichage();
                echo $Affichage->afficheAjoutTshirt();
            break; 

            case "save_tshirt":

                $nom=$_GET['prodNom']; 
                $prix=$_GET['prodPrix'];
                $img_gd="";
                $img_pt="";
                $des=$_GET['prodDesc'];
                $crea=$_GET['prodCrea'];
                $mat=$_GET['prodMat'];
                $date_aj=$_GET['prodDate'];
                $cat=$_GET['prodCat'];

                requeteInsertTshirt($nom,$prix,$img_gd,$img_pt,$des,$crea,$mat,$date_aj,$cat);
            break;


    }
	