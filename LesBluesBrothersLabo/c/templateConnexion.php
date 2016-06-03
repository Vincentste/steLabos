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
    
    public function afficheChampsRecherche(){
        return '
            <h1>Moteur de recherche</h1>
            <form><fieldset id="champHaut">  
            <input type="text" id="champTexte"/>
            </fieldset>
            <fieldset id="champbas">
            <p>
            <label for="createurs">Créateurs</label>
            <select id="selectCre" name="createurs" class=""></select>
            </p> 
            <p>
            <label for="matieres">Matières</label>
            <select id="selectMat" name="matieres" class=""></select>
            </p>
            <p>
            <label for="categories">Catégories</label>
            <select id="selectCat" name="categories" class=""></select>
            </p>           
            <input type="button" id="boutChampRech" value="envoyer" autocomplete="off"/>
            </p>   
            </fieldset></form>'; 
    }
    
}
   

?>
   

   