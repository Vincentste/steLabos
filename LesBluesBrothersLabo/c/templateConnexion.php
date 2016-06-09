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
                <p>
                    <label for="tailleS">S : </label>
                    <input type="text" name="tailleS" id="tailleS"/> <span> S </span> <span> M </span>
                </p>
                <p>
                    <label for="tailleM">M : </label>
                    <input type="text" name="tailleM" id="tailleM"/> <span> S </span> <span> M </span>
                </p>
                <p>
                    <label for="tailleL">L : </label>
                    <input type="text" name="tailleL" id="tailleL"/> <span> S </span> <span> M </span>
                </p>
                <p>
                    <label for="tailleXL">XL : </label>
                    <input type="text" name="tailleXL" id="tailleXL"/> <span> S </span> <span> M </span>
                </p>
                <input type="button" id="ajoutTaille" value="ajouter" autocomplete="off"/>
            </section>
            <div class="boutonsFormAjout">
                <input type="button" id="boutSav" value="Sauvegarder" autocomplete="off"/>
                <input type="button" id="boutAnn" value="Annuler" autocomplete="off"/>
            </div>
        </form>
        <section id="imageAjout">
            <h2>IMAGES</h2>
            <div class="voletImageAjout">
                
            </div>
        </section>';
    }

    public function afficheModifTshirt(){
        return '
        
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
            <section id="taillesAjout">
                <h2>Tailles</h2> 
               <br/>
                    <label for="tailleS">S : </label>
                    <input type="text" name="tailleS" id="tailleS"/> <span> S </span> <span> M </span>
                <br/>
               <br/>
                    <label for="tailleM">M : </label>
                    <input type="text" name="tailleM" id="tailleM"/> <span> S </span> <span> M </span>
                <br/>
               <br/>
                    <label for="tailleL">L : </label>
                    <input type="text" name="tailleL" id="tailleL"/> <span> S </span> <span> M </span>
                <br/>
               <br/>
                    <label for="tailleXL">XL : </label>
                    <input type="text" name="tailleXL" id="tailleXL"/> <span> S </span> <span> M </span>
                <br/>
                <input type="button" id="ajoutTaille" value="ajouter" autocomplete="off"/>
            </section>
            <div class="boutonsFormAjout">
                <input type="button" id="boutSav" value="Sauvegarder" autocomplete="off"/>
                <input type="button" id="boutAnn" value="Annuler" autocomplete="off"/>
            </div>
        </form>
        <section id="imageAjout">
            <h2>IMAGES</h2>
            <div class="voletImageAjout">
                
            </div>
        </section>';
    }
    
    


}
   

?>
   
