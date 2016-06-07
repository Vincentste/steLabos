$(function(){
    
getFormulaireConnexion();
$('.contenu').on("click",".envoi",valideMotDePasse);
$('.contenu').on('keyup','#champTexte',rechercheParTexte);
$('.contenu').on('click','#buttonAjout',voletAjoutTshirt);
$('.contenu').on('click','#boutSav',saveTshirt);
$('.contenu').on('click','#boutAnn',annuleTshirt);


function valideMotDePasse(e){
     $.getJSON("dispatcher.php",{"op":"controleConnexion","nom":$('#nom').val(),"mdp":$('#mdp').val()},function(data){
        
         if(data.authorisation == "oui"){
    		$("body>.contenu").load("dispatcher.php","op=template_tshirt",function(){
    			$.getJSON("dispatcher.php","op=data_recherche",function(data){

                    var categories=data['categories'];
                    for(var i=0;i < categories.length;i++){
                        var option=$('<option/>');
                        option.text(categories[i].cat_nom);
                        option.appendTo('#selectCat');    
                    }
                    
                    var createurs=data['createurs'];
                    for(var i=0;i < createurs.length;i++){
                        var option=$('<option/>');
                        option.text(createurs[i].cre_nom);
                        option.appendTo('#selectCre');   
                    }
                    
                   var matieres=data['matieres'];
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
    $.getJSON("dispatcher.php",{"op":"rechercheParTexte","lettre":$('#champTexte').val()},function(data){
    $ul = $("<ul id='recherche'/>").insertAfter("#divAjout");
    for (var i=0; i<data.length; i++){
        var tshirt = data[i].prod_nom;
        $li = $("<li id=tshirt"+i+"/>").text(tshirt).appendTo($ul);
        $("<ul class=tshirt/>").prepend('<li id='+data[i].prod_id+' class=supprimer>supprimer</li>').prepend('<li class=modif>modifier</li>').prepend('<li class=voir>voir</li>').appendTo($li);
    }
      
    $('.contenu').on('click','.supprimer', function supprimerTshirt(e){
            var idTshirt =($(this).attr("id"));
            $(".choix").remove();
            $choix = $('<div class=choix/>').prepend('<p class=oui>oui</p>').prepend('<p class=non>non</p>').appendTo($(this));
                $('.choix').on('click','.oui', function choixOui(e){
                    $.getJSON("dispatcher.php",{"op":"supprimerTshirt","id":idTshirt});
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
                            var option=$('<option/>');
                            option.text(categories[i].cat_nom);
                            option.appendTo('#prodCat');    
                        }
                        
                        var createurs=data['createurs'];
                        for(var i=0;i < createurs.length;i++){
                            var option=$('<option/>');
                            option.text(createurs[i].cre_nom);
                            option.appendTo('#prodCre');   
                        }
                        
                       var matieres=data['matieres'];
                        for(var i=0;i < matieres.length;i++){
                            var option=$('<option/>');
                            option.text(matieres[i].mat_nom);
                            option.appendTo('#prodMat');    
                        }     
        });

    }else{
        $("#voletAjout").empty(); 
    }    
}

function saveTshirt(){
    alert("On sauvegarde !")
}

function annuleTshirt(){
    alert("On annule !")
}

    
});