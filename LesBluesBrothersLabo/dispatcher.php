<?php
<<<<<<< HEAD
	$operation_permise=[
	   "accueil"=>true,
    	"connexion" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "template_tshirt"=>"accueil.html",
        "data_recherche"=>"accueil.html",
        "rechercheParTexte"=>"accueil.html",
        "voletAjoutTshirt"=>"accueil.html"
	];
=======
$operation_permise=[
"accueil"=>true,
"connexion" => "accueil.html",
"controleConnexion"=>"accueil.html",
"affichageAccueil" => "accueil.html",
"template_tshirt"=>"acueil.html",
"data_recherche"=>"accueil.html",
"rechercheParTexte"=>"accueil.html",
];

require_once __DIR__.'/c/TemplateConnexion.php';
require_once __DIR__.'/m/connexion.php';
  session_start();
<<<<<<< HEAD
  $_SESSION['connecte']= " ";
>>>>>>> origin/master
=======
  
>>>>>>> origin/master

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
                    session_start();
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
            
            case "rechercheParTexte";
            $text=$_GET['chaine'];
            echo($text);
            $resultat=requeteTshirtParNoms($text);
            echo json_encode($resultat);
           /* echo('{"chaine":"text"}');*/
            break; 

            case "voletAjoutTshirt";
                $Affichage = new Affichage();
                echo $Affichage->afficheAjoutTshirt();
            break; 
    }
	