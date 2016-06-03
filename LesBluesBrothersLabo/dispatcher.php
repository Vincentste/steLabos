<?php
	$operation_permise=[
	   "accueil"=>true,
    	"connexion" => "accueil.html",
        "controleConnexion"=>"accueil.html",
    	"affichageAccueil" => "accueil.html",
        "template_tshirt"=>"accueil.html"
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
				require_once " ";
			break;
		case "connexion":
			$Affichage = new Affichage();

            if(isset($_GET['msg'])){
                $message = "Vous n'êtes pas autorisé à vous connecter"; 
            }else{
                $message = ""; 
            }
            

			echo $Affichage->afficheConnexion($message);
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
            
            
        
	}