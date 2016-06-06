<?php
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
  $_SESSION['connecte']= " ";

	//récupérer l'opération
$op = (isset($_GET["op"]))?$_GET["op"]:"accueil";
if(!isset($operation_permise[$op])){
   $op = "connexion";
}

if($op == "connexion"){
            //control si déjà connecté
    if( $_SESSION['connecte'] =='oui'){
         $op = "template_tshirt";
    }
}

switch ($op){
    case "accueil":
	   //affiche le menu de connecion

    break;
    
    case "connexion":
        $Affichage = new Affichage();
        echo $Affichage->afficheConnexion();
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
        $tab = ["categories"=>$tabCat,"matieres"=>$tabMat,"createurs"=>$tabCrea];
        echo json_encode($tab);
    break;

    case "rechercheParTexte":
    $lettre = $_GET['lettre']; 
    $resultat= requeteTshirtParNoms($lettre);
    echo json_encode($resultat);
    /* echo('{"chaine":"text"}');*/
    break;    
    }
