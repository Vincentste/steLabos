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
            
            <div id="divAjout"> 
                <div id="buttonAjout"> Ajouter un nouveau t-shirt </div>
                <div id="voletAjout"></div>
            </div>
            </section>'; 
    }

    public function afficheAjoutTshirt(){
        return '
        <form>
            <p>
                <label for="prodNom">Nom : </label>
                <input type="text" name="prodNom" id="prodNom" />
            </p>
            <p>
                <label for="prodPrix">Prix : </label>
                <input type="text" name="prodPrix" id="prodPrix" />
            </p>
            <p>
                <label for="prodDate">Date : </label>
                <input type="date" name="prodDate" id="prodDate" />
            </p>
            <p>
                <label for="prodDesc">Description : </label>
                <textarea name="prodDesc" id="prodDesc"></textarea>
            </p>

            <p>
                <label for="prodCre">Créateurs : </label>
                <select id="prodCre" name="prodCre"></select>
            </p> 
            <p>
                <label for="prodMat">Matières : </label>
                <select id="prodMat" name="prodMat"></select>
            </p>
            <p>
                <label for="prodCat">Catégories : </label>
                <select id="prodCat" name="prodCat"></select>
            </p>
            <p>
                <input type="button" id="boutSav" value="Sauvegarder" autocomplete="off"/>
                <input type="button" id="boutAnn" value="Annuler" autocomplete="off"/>
            </p>
        </form>';
    }
    
}
   

?>
   

   