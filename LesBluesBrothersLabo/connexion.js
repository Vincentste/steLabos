
$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);
$('.contenu').on('click','#boutSav',saveTshirt);
$('.contenu').on('click','#boutAnn',annuleTshirt);
$('.contenu').on('click','#boutChampRech',rechercheParFiltres);
$('.contenu').on('click','.modif',modifTshirt);


function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{"op":"controleConnexion","nom":$('#nom').val(),"mdp":$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
    		$("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
    			$.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    var optionUne=$('<option/>');
                    optionUne.val('%');
                    optionUne.text('tous');
                    optionUne.appendTo('#selectCat');
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#selectCat');    
                    }
                    
                    var createurs=data['createurs'];
                    var optionDeux=$('<option/>');
                    optionDeux.val('%');
                    optionDeux.text('tous');
                    optionDeux.appendTo('#selectCre');
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#selectCre');   
                    }
                    
                   var matieres=data['matieres'];
                    var optionTrois=$('<option/>');
                    optionTrois.val('%');
                    optionTrois.text('tous');
                    optionTrois.appendTo('#selectMat');
                    for(var i=0;i < matieres.length;i++){
                        var option=$('<option/>');
                        option.text(matieres[i].mat_nom);
                        option.appendTo('#selectMat');    
                    }     
         	});	
    		});     	
         	
         }else{
         	
         }

    }); 
}


function getFormulaireConnexion($ou){
    $ou = $ou?$ou:$("body>.contenu");
    $("body>.contenu").load("dispatcher.php","op=connexion");
    
}
// barre de recherche 
function rechercheParTexte(e){
    //efface les anciens ul de recherche
    $("#recherche").remove();
    $.getJSON("dispatcher.php",{"op":"rechercheParTexte","lettre":$('#champTexte').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    //affiche tous les tshirt qui corresponde à la lettre tapée
    for (var i=0; i<data.length; i++){
        var tshirt = data[i].prod_nom;
        $li = $("<li id=tshirt"+data[i].prod_id+"/>").text(tshirt).appendTo($ul);
        // affichage de voir / supprimer / modifier
        $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class="supprimer"><i class="fa fa-trash"></i></li>').prepend('<li data='+data[i].prod_id+' class=modif ><i class="fa fa-pencil"></i></li>').prepend('<li class=voir><i class="fa fa-plus"></i></li>').appendTo($li);
    }
    //form qui va servir à la modification du tshirt.
    $("<form class='modifier'/>").insertAfter(".tshirt");

    //supprimer un tshirt de la DB
    $('.contenu').on('click','.supprimer', function supprimerTshirt(e){

            var idTshirt =($(this).attr("data"));
            //confirmation de la suppression
                var modal = $('#myModalSupp');
                    modal.css('display' ,"block");
                //confirmation --> oui
                $('.modal-body').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    //supprime le li du tshirt supprimé. 
                    $('#tshirt'+idTshirt+'').remove();
                    //confirmation que le tshirt à bien été supprimé 
                    $(".modalSupp").fadeOut();
                    var modal = $('#myModal');
                    modal.fadeIn();
                    modal.fadeOut(3000);
                    
                });
                //confirmation -->non
                $('.modal-body').on('click','.non', function choixNon(e){
                    $(".modalSupp").fadeOut(); 
                });
    });
    });
}
//recherche les noms des tshirt ds la DB
function rechercheParFiltres(e){
    $("#recherche").remove(); 
    $.getJSON("dispatcher.php",{"op":"rechercheParFiltre","cat":$('#selectCat').val(),"mat":$('#selectMat').val(),"cre":$('#selectCre').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    //affiche les tshirt
        for (var i=0; i<data.length; i++){
            var tshirt = data[i].prod_nom;
            $li = $("<li id=tshirt"+data[i].prod_id+"/>").text(tshirt).appendTo($ul);
            $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class="supprimer"><i class="fa fa-trash"></i></li>').prepend('<li data='+data[i].prod_id+' class=modif ><i class="fa fa-pencil"></i></li>').prepend('<li class=voir><i class="fa fa-plus"></i></li>').appendTo($li);
        }
         $("<form class='modifier'/>").insertAfter(".tshirt");
        //supprime le Tshirt clické 
         $('.contenu').on('click','.supprimer', function supprimerTshirt(e){
            var idTshirt =($(this).attr("data"));
            //confirmation de la suppression
                var modal = $('#myModalSupp');
                    modal.css('display' ,"block");
                //confirmation --> oui
                $('.modal-body').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    //supprime le li du tshirt supprimé. 
                    $('#tshirt'+idTshirt+'').remove();
                    //confirmation que le tshirt à bien été supprimé 
                    $(".modalSupp").fadeOut();
                    var modal = $('#myModal');
                    modal.fadeIn();
                    modal.fadeOut(3000);
                    
                });
                //confirmation -->non
                $('.modal-body').on('click','.non', function choixNon(e){
                    $(".modalSupp").fadeOut(); 
                });
    });
    });
}

function voletAjoutTshirt(e){
    //Ajoute ou enlève la class au clique sur le bouton ajout tshirt
    $("#voletAjout").toggleClass("open");

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("#voletAjout").hasClass("open")){
        
        $("#voletAjout").load("dispatcher.php","op=voletAjoutTshirt"); 
        
        $.getJSON("dispatcher.php","op=data_recherche",function(data){

                        var categories=data['categories'];
                        for(var i=0;i < categories.length;i++){
                            var option=$('<option value="'+categories[i].cat_id+'"/>');
                            option.text(categories[i].cat_nom);
                            option.appendTo('#prodCatAjout');    
                        }
                        
                        var createurs=data['createurs'];
                        for(var i=0;i < createurs.length;i++){
                            var option=$('<option value="'+createurs[i].cre_id+'"/>');
                            option.text(createurs[i].cre_nom);
                            option.appendTo('#prodCreAjout');   
                        }
                        
                       var matieres=data['matieres'];
                        for(var i=0;i < matieres.length;i++){
                            var option=$('<option value="'+matieres[i].mat_id+'"/>');
                            option.text(matieres[i].mat_nom);
                            option.appendTo('#prodMatAjout');    
                        }     
        });

    }else{
        $("#voletAjout").empty(); 
    }    
}

function saveTshirt(){

    var prodNom = $('#prodNomAjout').val();
    var prodPrix = $('#prodPrixAjout').val();
    var img_gd = "vide";
    var img_pt = "vide";
    var des = $('#prodDescAjout').val();
    var crea = $('#prodCreAjout').val();
    var mat = $('#prodMatAjout').val();
    var date_aj = $('#prodDateAjout').val();
    var cat = $('#prodCatAjout').val();
    var tailleS = $('#tailleS').val();
    var tailleM = $('#tailleM').val();
    var tailleL = $('#tailleL').val();
    var tailleXL = $('#tailleXL').val();

    $("#voletAjout").load("dispatcher.php",
    "op=save_tshirt&nom="+prodNom+"&prix="+prodPrix+"&img_gd="+img_gd+"&img_pt="+img_pt+"&desc="+des+"&crea="+crea+"&mat="+mat+"&date="+date_aj+"&cat="+cat+"&tailleS="+tailleS+"&tailleM"+tailleM+"&tailleL="+tailleL+"&tailleXL="+tailleXL+""); 
}

function annuleTshirt(){
    $('#prodNomAjout').val(""); 
    $('#prodPrixAjout').val(""); 
    $('#prodDescAjout').val("");
    $('#prodDateAjout').val("");
}
    





function modifTshirt(){

    //Ajoute ou enlève la class au clique sur le bouton modif tshirt
    $("form.modifier").toggleClass("open");

    //Ouvrire ou fermer le volet en fonction de la class "open"
    if($("form.modifier").hasClass("open")){
   
        //recup de l'id du tshirt à modifier
        var idTshirt = $(this).attr("data");

        $(this).parent().next().load("dispatcher.php","op=afficheModifierTshirt");
        //afficher les données ds les champs 
        $.getJSON("dispatcher.php",{"op":"ModifierTshirt","id":idTshirt},function(data){

           //recup des données du tshirt à modifier
           var nom = data[0].prod_nom;
           var prix = data[0].prod_prix;
           var date = data[0].prod_date;
           var desc = data[0].prod_desc;
           //insertion ds les champs 
           $("input#prodNom").val(nom);
           $("input#prodPrix").val(prix);
           $("input#prodDate").val(date);
           $("textarea#prodDesc").val(desc);
        });
       
        $.getJSON("dispatcher.php","op=data_recherche",function(data){

                        var categories=data['categories'];
                        for(var i=0;i < categories.length;i++){
                            var option=$('<option value="'+categories[i].cat_id+'"/>');
                            option.text(categories[i].cat_nom);
                            option.appendTo('#prodCat');    
                        }
                        
                        var createurs=data['createurs'];
                        for(var i=0;i < createurs.length;i++){
                            var option=$('<option value="'+createurs[i].cre_id+'"/>');
                            option.text(createurs[i].cre_nom);
                            option.appendTo('#prodCre');   
                        }
                        
                       var matieres=data['matieres'];
                        for(var i=0;i < matieres.length;i++){
                            var option=$('<option value="'+matieres[i].mat_id+'"/>');
                            option.text(matieres[i].mat_nom);
                            option.appendTo('#prodMat');    
                        }     
        });





    
        
    }else{
        $("form.modifier").children().remove(); 
    }    


}

});