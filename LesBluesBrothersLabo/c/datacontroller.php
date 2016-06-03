<?php
header("Content-type:text/json;charset=utf8");
include_once('connexion.php');
$check= isset($_GET["check"])?$_GET["check"]:"connexion";
switch($check){
    case "connexion":
        $nom = isset($_GET['nom'])?$_GET['nom']:"";
        $mdp = isset($_GET['mdp'])?$_GET['mdp']:"";
        
        if($nom!="" && $mdp!=""){
            $resultat=requeteConnexion($nom,$mdp);
            echo json_encode($resultat); 
        }else{
            echo json_encode(["status"=>"echec","cause"=>"ni nom ni prénom fournis"]);
        }
        break;
}
?>