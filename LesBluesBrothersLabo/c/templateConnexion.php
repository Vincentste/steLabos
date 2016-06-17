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

    public function afficheMenu(){
          return'<nav id="menu">
                <ul>
                    <li id="T-shirt">T-shirt</li>
                    <li id="Catégories">Catégories</li>
                    <li id="Créateurs">Créateurs</li>
                    <li id="Matières">Matières</li>
                </ul>
            </nav>';
    }


    
    public function afficheChampsRecherche(){
        return '
            <section class="content">
            <form><fieldset id="champHaut"> 
            <label class=moteur>Moteur de recherche</label> 
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
            <section id="imgPrew">
                <figure>
                    <img src="images/no.jpg" alt="image liste preview" />
                    <figcaption>Image liste</figcaption>
                </figure>
                <figure>
                     <img src="images/no.jpg" alt="image détails preview"/>
                     <figcaption>Image détails</figcaption>
                </figure>
            </section>
            <section id="infosAjout">  
                    <p>
                        <label for="prodNomAjout">Nom : </label>
                        <input type="text" name="prodNomAjout" id="prodNomAjout"/>
                    </p>
                    <p>
                        <label for="prodPrixAjout">Prix : </label>
                        <input type="text" name="prodPrixAjout" id="prodPrixAjout" />
                    </p>
                    <p>
                        <label for="prodDateAjout">Date : </label>
                        <input type="date" name="prodDateAjout" id="prodDateAjout" />
                    </p>
                    <p>
                        <label for="prodDescAjout">Description : </label>
                        <textarea name="prodDescAjout" id="prodDescAjout"></textarea>
                    </p>

                    <p>
                        <label for="prodCreAjout">Créateurs : </label>
                        <select id="prodCreAjout" name="prodCreAjout"></select>
                    </p> 
                    <p>
                        <label for="prodMatAjout">Matières : </label>
                        <select id="prodMatAjout" name="prodMatAjout"></select>
                    </p>
                    <p>
                        <label for="prodCatAjout">Catégories : </label>
                        <select id="prodCatAjout" name="prodCatAjout"></select>
                    </p>
                
            </section>
            <section id="taillesAjout">
                <h2>Tailles</h2> 
                <input type="button" id="ajoutTaille" value="ajouter" autocomplete="off"/>
            </section>
            <div class="boutonsFormAjout">
                <input type="button" id="boutSav" value="Sauvegarder" autocomplete="off"/>
                <input type="button" id="boutAnn" value="Annuler" autocomplete="off"/>
            </div>
        </form>
        <section id="imageAjout">
            <h2>IMAGES</h2>
            <div id="voletImageAjout">
                
            </div>
        </section>';
    }

    public function afficheModifTshirt(){
        return '
        
             <section id="imgPrew">
                <figure>
                    <img  id="imglist" src="" alt="image liste preview" />
                    <figcaption>Image liste</figcaption>
                </figure>
                <figure>
                     <img id="imgprew" src="" alt="image détails preview"/>
                     <figcaption>Image détails</figcaption>
                </figure>
            </section>
            <section id="infosAjout">  
                 <br/>
                        <label for="prodNom">Nom : </label>
                        <input type="text" name="prodNom" id="prodNom"/>
                    <br/>
                   <br/>
                        <label for="prodPrix">Prix : </label>
                        <input type="text" name="prodPrix" id="prodPrix" />
                    <br/>
                   <br/>
                        <label for="prodDate">Date : </label>
                        <input type="date" name="prodDate" id="prodDate" />
                    <br/>
                   <br/>
                        <label for="prodDesc">Description : </label>
                        <textarea name="prodDesc" id="prodDesc"></textarea>
                    <br/>

                   <br/>
                        <label for="prodCre">Créateurs : </label>
                        <select id="prodCre" name="prodCre"></select>
                    <br/> 
                   <br/>
                        <label for="prodMat">Matières : </label>
                        <select id="prodMat" name="prodMat"></select>
                    <br/>
                   <br/>
                        <label for="prodCat">Catégories : </label>
                        <select id="prodCat" name="prodCat"></select>
                    <br/>
                
            </section>
            <section id="taillesModif">
                <h2>Tailles</h2> 
                <input type="button" id="ajoutTailleModif" value="ajouter" autocomplete="off"/>
            </section>
            <div class="boutonsFormModifier">
                <input type="button" id="boutMod" value="Sauvegarder" autocomplete="off"/>
                <input type="button" id="boutAnnMod" value="Annuler" autocomplete="off"/>
            </div>
        ';
    }
    
    


}
   

?>
   
