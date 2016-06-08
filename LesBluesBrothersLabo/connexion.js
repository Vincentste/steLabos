<<<<<<< HEAD
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
        $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class=supprimer>supprimer</li>').prepend('<li data='+data[i].prod_id+' class=modif >modifier</li>').prepend('<li class=voir>voir</li>').appendTo($li);
    }
    //div qui va servir à la modification du tshirt.
    $("<div class=modifier/>").insertAfter(".tshirt");

    //supprimer un tshirt de la DB
    $('.contenu').on('click','.supprimer', function supprimerTshirt(e){

            var idTshirt =($(this).attr("data"));
            $(".choix").remove();
            //confirmation de la suppression
            $choix = $('<div class=choix/>').prepend('<p class=oui>oui</p>').prepend('<p class=non>non</p>').appendTo($(this));
                //confirmation --> oui
                $('.choix').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    //supprime le li du tshirt supprimé. 
                    $('#tshirt'+idTshirt+'').remove();
                    //confirmation que le tshirt à bien été supprimé 
                    alert ("le tshirt a bien été supprimé !");
                });
                //confirmation -->non
                $('.choix').on('click','.non', function choixNon(e){
                    $(".choix").remove(); 
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
        console.log(data);
        for (var i=0; i<data.length; i++){
            var tshirt = data[i].prod_nom;
            $li = $("<li id=tshirt"+data[i].prod_id+"/>").text(tshirt).appendTo($ul);
            $("<ul class=tshirt/>").prepend('<li data='+data[i].prod_id+' class=supprimer>supprimer</li>').prepend('<li class='+data[i].prod_id+' class=modif >modifier</li>').prepend('<li class=voir>voir</li>').appendTo($li);
        }
         $("<div class=modifier/>").insertAfter(".tshirt");
        //supprime le Tshirt clické 
         $('.contenu').on('click','.supprimer', function supprimerTshirt(e){
            var idTshirt =($(this).attr("data"));
            $(".choix").remove();
            //confirmation du delete
            $choix = $('<div class=choix/>').prepend('<p class="oui">oui</p>').prepend('<p class="non">non</p>').appendTo($(this));
                $('.choix').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    //supprime le li du Tshirt 
                    $('#tshirt'+idTshirt+'').remove();
                    alert ("le tshirt a bien été supprimé !");
                });
                $('.choix').on('click','.non', function choixNon(e){
                   $(".choix").remove(); 
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
        $("#voletAjout").empty(); 
    }    
}

function saveTshirt(){

    var prodNom = $('#prodNom').val();
    var prodPrix = $('#prodPrix').val();
    var img_gd = "vide";
    var img_pt = "vide";
    var des = $('#prodDesc').val();
    var crea = $('#prodCre').val();
    var mat = $('#prodMat').val();
    var date_aj = $('#prodDate').val();
    var cat = $('#prodCat').val();

    $("#voletAjout").load("dispatcher.php",
    "op=save_tshirt&nom="+prodNom+"&prix="+prodPrix+"&img_gd="+img_gd+"&img_pt="+img_pt+"&desc="+des+"&crea="+crea+"&mat="+mat+"&date="+date_aj+"&cat="+cat+""); 
}

function annuleTshirt(){
    
}




function modifTshirt(e){
    alert($(this).attr("data"));

    $(this).parent().next().load("dispatcher.php","op=ModifierTshirt");
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
}



    
=======
$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);
$('.contenu').on('click','#boutSav',saveTshirt);
$('.contenu').on('click','#boutAnn',annuleTshirt);
$('.contenu').on('click','#boutChampRech',rechercheParFiltres);


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

function rechercheParTexte(e){
    $("#recherche").remove();
    if($('#champTexte').val() ==""){
        $("#recherche").remove();
    } 
    $.getJSON("dispatcher.php",{"op":"rechercheParTexte","lettre":$('#champTexte').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    for (var i=0; i<data.length; i++){
        var tshirt = data[i].prod_nom;
        $li = $("<li id=tshirt"+data[i].prod_id+"/>").text(tshirt).appendTo($ul);
        $("<ul class=tshirt/>").prepend('<li id='+data[i].prod_id+' class=supprimer>supprimer</li>').prepend('<li class=modif>modifier</li>').prepend('<li class=voir>voir</li>').appendTo($li);
    }
      
    $('.contenu').on('click','.supprimer', function supprimerTshirt(e){

            var idTshirt =($(this).attr("id"));
            $(".choix").remove();
            $choix = $('<div class=choix/>').prepend('<p class=oui>oui</p>').prepend('<p class=non>non</p>').appendTo($(this));
                $('.choix').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    $('#tshirt'+idTshirt+'').remove();
                    alert ("le tshirt a bien été supprimé !");
                });
                    $('.choix').on('click','.non', function choixNon(e){
                    $(".choix").remove(); 
                });
    });
});
}
    
function rechercheParFiltres(e){
    $("#recherche").remove(); 
    $.getJSON("dispatcher.php",{"op":"rechercheParFiltre","cat":$('#selectCat').val(),"mat":$('#selectMat').val(),"cre":$('#selectCre').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
        console.log(data);
        for (var i=0; i<data.length; i++){
            var tshirt = data[i].prod_nom;
            $li = $("<li id=tshirt"+data[i].prod_id+"/>").text(tshirt).appendTo($ul);
            $("<ul class=tshirt/>").prepend('<li id='+data[i].prod_id+' class=supprimer>supprimer</li>').prepend('<li class=modif>modifier</li>').prepend('<li class=voir>voir</li>').appendTo($li);
        }
         $('.contenu').on('click','.supprimer', function supprimerTshirt(e){
            var idTshirt =($(this).attr("id"));
            $(".choix").remove();
            $choix = $('<div class=choix/>').prepend('<p class=oui>oui</p>').prepend('<p class=non>non</p>').appendTo($(this));
                $('.choix').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
                    $('#tshirt'+idTshirt+'').remove();
                    alert ("le tshirt a bien été supprimé !");
                });
                $('.choix').on('click','.non', function choixNon(e){
                   $(".choix").remove(); 
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
        $("#voletAjout").empty(); 
    }    
}

function saveTshirt(e){

    var prodNom = $('#prodNom').val();
    var prodPrix = $('#prodPrix').val();
    var img_gd = "";
    var img_pt = "";
    var des = $('#prodDesc').val();
    var crea = $('#prodCre').val();
    var mat = $('#prodMat').val();
    var date_aj = $('#prodDate').val();
    var cat = $('#prodCat').val();

    $("#voletAjout").load("dispatcher.php",
    "op=save_tshirt&nom="+prodNom+"&prix="+prodPrix+"&img_gd="+img_gd+"&img_pt="+img_pt+"&desc="+des+"&crea="+crea+"&mat="+mat+"&date="+date_aj+"&cat="+cat+""); 
}

function annuleTshirt(e){
    $('#prodNom').val(""); 
    $('#prodPrix').val(""); 
    $('#prodDesc').val("");
    $('#prodDate').val("");
}

    
>>>>>>> 044e9fac266efeb1c8b06aaeef39f50fed98d98a
});