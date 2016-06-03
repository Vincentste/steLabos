<?php

class Affichage{
     
   public function afficheConnexion($message){
        return '<form class="connexion"><label for="nom">Nom</label>        
            <input type="text" name="nom"id="nom" autocomplete="off" />
            </br>
            <label for="mdp">password</label>
            <input type="password" name="mdp" id="mdp" autocomplete="off"/>
            </br>
            <input type="button" class="envoi" value="envoyer" autocomplete="off"/>
            <label>'.$message.'</label>
        <form/>';
    }
    
}
   

?>
   

   