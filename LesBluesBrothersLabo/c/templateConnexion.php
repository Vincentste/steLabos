<?php

class Affichage{
     
   public function afficheConnexion(){
        return '<div id="formConnexion">
         <form class="connexion"><label for="nom">Nom</label>        
            <input type="text" name="nom"id="nom" autocomplete="off" />
            </br>
            <label for="mdp">password</label>
            <input type="password" name="mdp" id="mdp" autocomplete="off"/>
            </br>
            <input type="button" class="envoi" value="envoyer" autocomplete="off"/>
         
        <form/>
        </div>';
    }
    
    public function afficheChampsRecherche(){
        return '
            <section class="content">
            <h1>Moteur de recherche</h1>
            <form><fieldset id="champHaut">  
            <input type="text" id="champTexte" name="champTexte"/>
            </fieldset>
            <fieldset id="champbas">
            <p>
            <label for="createurs">Créateurs : </label>
            <select id="selectCre" name="createurs" class=""></select>
            </p> 
            <p>
            <label for="matieres">Matières : </label>
            <select id="selectMat" name="matieres" class=""></select>
            </p>
            <p>
            <label for="categories">Catégories : </label>
            <select id="selectCat" name="categories" class=""></select>
            </p>           
            <input type="button" id="boutChampRech" value="Afficher" autocomplete="off"/>
            </p>   
            </fieldset></form>
            
            <ul id="divAjout">
                <li>
                    <a href="" alt="Ajouter un Tee-shirt">Ajouter un nouveau t-shirt</a>
                </li>
            </ul>
            </section>
            
'; 
    }
    
}
   

?>
   

   