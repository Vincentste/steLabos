<?php
	$operation_permise=[
	   "accueil"=>true,
    	"connexion" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "gestiontshirt"=>"gestiontshirt.html"
	];

	//récupérer l'opération
	$op = (isset($_GET["op"]))?$_GET["op"]:"accueil";
	if(!isset($operation_permise[$op])){
	    $op = "connexion";
	}

	require_once __DIR__.'/c/TemplateConnexion.php'; 
    require_once __DIR__.'/m/connexion.php';

	switch ($op){
		case "accueil":
				require_once "accueil.html";
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
                    echo('autorisé');
                    session_start();
                    $_SESSION['connecte']='oui';
                    $op='gestiontshirt';
                    include_once "gestiontshirt.html";
                    
                }else{
                    echo('refusé');   
                    
                }
            }
            
          
			break;
                
            case "gestiontshirt":
            require_once "gestiontshirt";
            break;
            
            
        
	}