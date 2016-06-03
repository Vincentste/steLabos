<?php
	$operation_permise=[
	"accueil"=>true,
    	"connexion" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "gestiontshirt"=>"gestiontshirt.html",
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
			echo $Affichage->afficheConnexion($message);
			break;
		case "controleConnexion":

            $nom = isset($_GET['nom'])?$_GET['nom']:"";
            $mdp = isset($_GET['mdp'])?$_GET['mdp']:"";

            if($nom!="" && $mdp!=""){
            	
                $resultat=requeteConnexion($nom,$mdp);
                echo(count($resultat));
               /*
               *///admin refusé
                if((count($resultat)) == 0){
                    echo('pasauto');
                }else{
                    echo('autorise');
                    session_start();
                    $_SESSION['connecte']='oui';
                    $operation='gestiontshirt';
                    echo($operation);
                    
                }
            }
            
          
			break;
        case "gestiontshirt":
            require_once "gestiontshirt";
            
            
        
	}