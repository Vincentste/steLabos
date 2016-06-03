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
    
    public function afficheChampsdeRecherche(){
        return '<form><div id='champHaut'>
            <h1>Moteur de recherche</h1>
            <input type='text' id='champTexte'/>
            </div>
            <div id='champbas'>
            <p>
            <label for="createurs">Créateurs</label>
            <select id="selectCre" name="createurs" class=""></select>
            </p>    
            <p>
            <label for="matieres">Matières</label>
            <select id="selectMat" name="matieres" class=''></select>
            </p>  
            <p>
            <label for="catégories">Catégories</label>
            <select id="selectCat" name="categorie" class=''></select>
            </p>  
            <p>
            <input type="button" id='boutChampRech' value="envoyer" autocomplete="off"/>
            </p>   
            </div></form>';
        
    }
    
}
   

?>
   

   